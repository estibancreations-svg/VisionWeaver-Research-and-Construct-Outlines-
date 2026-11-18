Original name: International Fuel Tax Agreement (IFTA) quarterly reporting-ifta_reporting.js
Drive ID: 1i_ADRTVOGggSxz7HfbugvlmAleOYhU5j
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-05T23:45:03.000Z

// netlify/functions/ifta-report.js
// International Fuel Tax Agreement (IFTA) quarterly reporting

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const authHeader = event.headers.authorization;
        if (!authHeader) {
            return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
        }

        const { quarter, year, userId } = event.httpMethod === 'GET'
            ? event.queryStringParameters
            : JSON.parse(event.body);

        // Calculate quarter date range
        const quarterDates = getQuarterDates(quarter, year);

        // Fetch all trips in quarter from database
        // In production, query Supabase for user's trips
        const trips = await fetchTripsForQuarter(userId, quarterDates);

        // Calculate mileage by jurisdiction (state/province)
        const mileageByJurisdiction = {};
        const fuelByJurisdiction = {};

        trips.forEach(trip => {
            // Parse route and allocate mileage to each state
            trip.jurisdictions.forEach(jurisdiction => {
                if (!mileageByJurisdiction[jurisdiction.state]) {
                    mileageByJurisdiction[jurisdiction.state] = 0;
                    fuelByJurisdiction[jurisdiction.state] = 0;
                }
                mileageByJurisdiction[jurisdiction.state] += jurisdiction.miles;
                fuelByJurisdiction[jurisdiction.state] += jurisdiction.gallons;
            });
        });

        // Calculate tax owed by jurisdiction
        const taxByJurisdiction = {};
        const taxRates = await getCurrentTaxRates(); // IRS/state tax rates

        Object.keys(mileageByJurisdiction).forEach(state => {
            const miles = mileageByJurisdiction[state];
            const gallons = fuelByJurisdiction[state];
            const taxRate = taxRates[state] || 0.24; // Default federal rate
            
            // MPG calculation
            const mpg = miles / gallons;
            const taxableGallons = miles / mpg;
            const taxOwed = taxableGallons * taxRate;

            taxByJurisdiction[state] = {
                miles: miles,
                gallons: gallons,
                mpg: mpg.toFixed(2),
                taxRate: taxRate,
                taxOwed: taxOwed.toFixed(2)
            };
        });

        // Generate IFTA report
        const iftaReport = {
            reportId: `IFTA_${quarter}_${year}_${Date.now()}`,
            userId: userId,
            quarter: quarter,
            year: year,
            dateRange: quarterDates,
            totalMiles: Object.values(mileageByJurisdiction).reduce((a, b) => a + b, 0),
            totalGallons: Object.values(fuelByJurisdiction).reduce((a, b) => a + b, 0),
            jurisdictions: taxByJurisdiction,
            totalTaxOwed: Object.values(taxByJurisdiction)
                .reduce((sum, j) => sum + parseFloat(j.taxOwed), 0)
                .toFixed(2),
            generatedAt: new Date().toISOString(),
            dueDate: getQuarterDueDate(quarter, year)
        };

        // Generate PDF (optional - requires pdf generation library)
        const pdfUrl = await generateIFTAPdf(iftaReport);
        iftaReport.pdfUrl = pdfUrl;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                report: iftaReport,
                message: 'IFTA report generated successfully'
            })
        };

    } catch (error) {
        console.error('IFTA Report Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'IFTA report generation failed' })
        };
    }
};

function getQuarterDates(quarter, year) {
    const quarters = {
        1: { start: `${year}-01-01`, end: `${year}-03-31` },
        2: { start: `${year}-04-01`, end: `${year}-06-30` },
        3: { start: `${year}-07-01`, end: `${year}-09-30` },
        4: { start: `${year}-10-01`, end: `${year}-12-31` }
    };
    return quarters[quarter];
}

function getQuarterDueDate(quarter, year) {
    const dueDates = {
        1: `${year}-04-30`,
        2: `${year}-07-31`,
        3: `${year}-10-31`,
        4: `${parseInt(year) + 1}-01-31`
    };
    return dueDates[quarter];
}

async function fetchTripsForQuarter(userId, dateRange) {
    // In production, query database for trips in date range
    // Demo data for now
    return [
        {
            id: 'TRIP_1',
            jurisdictions: [
                { state: 'CA', miles: 450, gallons: 75 },
                { state: 'NV', miles: 200, gallons: 33 },
                { state: 'AZ', miles: 350, gallons: 58 }
            ]
        }
    ];
}

async function getCurrentTaxRates() {
    // Current IFTA tax rates by jurisdiction (2025)
    return {
        'AL': 0.29, 'AK': 0.0895, 'AZ': 0.19, 'AR': 0.245,
        'CA': 0.539, 'CO': 0.22, 'CT': 0.434, 'DE': 0.23,
        'FL': 0.199, 'GA': 0.298, 'HI': 0.16, 'ID': 0.33,
        'IL': 0.466, 'IN': 0.54, 'IA': 0.31, 'KS': 0.26,
        'KY': 0.286, 'LA': 0.20, 'ME': 0.317, 'MD': 0.359,
        'MA': 0.24, 'MI': 0.273, 'MN': 0.286, 'MS': 0.18,
        'MO': 0.17, 'MT': 0.3275, 'NE': 0.282, 'NV': 0.27,
        'NH': 0.235, 'NJ': 0.414, 'NM': 0.188, 'NY': 0.451,
        'NC': 0.381, 'ND': 0.23, 'OH': 0.385, 'OK': 0.20,
        'OR': 0.38, 'PA': 0.581, 'RI': 0.35, 'SC': 0.26,
        'SD': 0.30, 'TN': 0.27, 'TX': 0.20, 'UT': 0.3655,
        'VT': 0.33, 'VA': 0.262, 'WA': 0.494, 'WV': 0.357,
        'WI': 0.329, 'WY': 0.24
    };
}

async function generateIFTAPdf(report) {
    // PDF generation would happen here using a library like PDFKit
    return `https://motivenext.online/ifta/${report.reportId}.pdf`;
}