Original name: VIN verification using NHTSA API and vehicle history services-vin_verification.js
Drive ID: 1r4hdvKOgpknqIhFkhZ7iI6U2FGsJn0zw
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-06T00:07:32.000Z

// netlify/functions/vin-verify.js
// VIN verification using NHTSA API and vehicle history services

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
        const { vin } = JSON.parse(event.body);

        // Validate VIN format (17 characters)
        if (!vin || vin.length !== 17) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid VIN format. Must be 17 characters.' })
            };
        }

        // NHTSA VIN Decoder API (Free, Government API)
        const nhtsaResponse = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
        );
        const nhtsaData = await nhtsaResponse.json();

        // Extract vehicle information
        const vehicleData = {};
        nhtsaData.Results.forEach(item => {
            if (item.Value) {
                vehicleData[item.Variable] = item.Value;
            }
        });

        // Carfax/AutoCheck integration (requires API key)
        let historyData = { available: false };
        const carfaxApiKey = process.env.CARFAX_API_KEY;
        
        if (carfaxApiKey) {
            try {
                const carfaxResponse = await fetch(
                    `https://api.carfax.com/v1/vehicle/${vin}`,
                    { headers: { 'Authorization': `Bearer ${carfaxApiKey}` } }
                );
                if (carfaxResponse.ok) {
                    historyData = await carfaxResponse.json();
                    historyData.available = true;
                }
            } catch (err) {
                console.error('Carfax API error:', err);
            }
        }

        // Compile verification response
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                vin: vin,
                verified: true,
                vehicle: {
                    make: vehicleData['Make'] || 'Unknown',
                    model: vehicleData['Model'] || 'Unknown',
                    year: vehicleData['Model Year'] || 'Unknown',
                    type: vehicleData['Vehicle Type'] || 'Unknown',
                    bodyClass: vehicleData['Body Class'] || 'Unknown',
                    manufacturer: vehicleData['Manufacturer Name'] || 'Unknown',
                    plantCountry: vehicleData['Plant Country'] || 'Unknown',
                    engineCylinders: vehicleData['Engine Number of Cylinders'] || 'N/A',
                    fuelType: vehicleData['Fuel Type - Primary'] || 'N/A'
                },
                history: historyData,
                timestamp: new Date().toISOString(),
                dataSource: 'NHTSA VPIC Database'
            })
        };

    } catch (error) {
        console.error('VIN Verification Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'VIN verification failed',
                details: error.message
            })
        };
    }
};