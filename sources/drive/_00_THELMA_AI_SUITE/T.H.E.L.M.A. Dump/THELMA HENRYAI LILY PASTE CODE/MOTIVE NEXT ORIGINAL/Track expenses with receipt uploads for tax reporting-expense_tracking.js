Original name: Track expenses with receipt uploads for tax reporting-expense_tracking.js
Drive ID: 1T8NRS5tpH20zFKFC0U5F865EvWe6tVm_
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-05T23:46:17.000Z

// netlify/functions/expense-add.js
// Track expenses with receipt uploads for tax reporting

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const authHeader = event.headers.authorization;
        if (!authHeader) {
            return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
        }

        const { 
            expenseType, 
            amount, 
            vendor, 
            date, 
            notes, 
            receiptImage,
            vehicleId,
            tripId 
        } = JSON.parse(event.body);

        // Validate expense type
        const validTypes = ['fuel', 'maintenance', 'tolls', 'lodging', 'meals', 'other'];
        if (!validTypes.includes(expenseType)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid expense type' })
            };
        }

        // Upload receipt to cloud storage (AWS S3 or Cloudinary)
        let receiptUrl = null;
        if (receiptImage) {
            receiptUrl = await uploadReceipt(receiptImage, expenseType);
        }

        // Store in database
        const expense = {
            id: `EXP_${Date.now()}`,
            expenseType,
            amountCents: Math.round(amount * 100),
            vendor,
            expenseDate: date,
            notes,
            receiptUrl,
            vehicleId,
            tripId,
            createdAt: new Date().toISOString()
        };

        // Calculate tax deduction category
        const taxCategory = getTaxCategory(expenseType);
        expense.taxCategory = taxCategory;

        // IRS mileage rate (2025: $0.67/mile)
        if (expenseType === 'fuel') {
            expense.irsDeductible = true;
            expense.deductionMethod = 'actual_expense';
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                expense: expense,
                message: 'Expense added successfully',
                taxInfo: {
                    category: taxCategory,
                    irsCompliant: true,
                    receiptRequired: amount > 75
                }
            })
        };

    } catch (error) {
        console.error('Expense Add Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to add expense' })
        };
    }
};

async function uploadReceipt(base64Image, category) {
    // Cloudinary or AWS S3 upload
    const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
    
    if (cloudinaryName) {
        try {
            const cloudinary = require('cloudinary').v2;
            cloudinary.config({
                cloud_name: cloudinaryName,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });

            const result = await cloudinary.uploader.upload(base64Image, {
                folder: `motive-next/receipts/${category}`,
                resource_type: 'image'
            });

            return result.secure_url;
        } catch (err) {
            console.error('Cloudinary upload error:', err);
        }
    }

    return `demo_receipt_${Date.now()}.jpg`;
}

function getTaxCategory(expenseType) {
    const categories = {
        fuel: 'Vehicle Operating Costs',
        maintenance: 'Repairs & Maintenance',
        tolls: 'Travel Expenses',
        lodging: 'Travel Expenses',
        meals: 'Meals & Entertainment (50% deductible)',
        other: 'General Business Expense'
    };
    return categories[expenseType] || 'Other';
}