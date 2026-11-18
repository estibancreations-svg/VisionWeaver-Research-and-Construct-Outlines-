Original name: Integrates with Allstate and Progressive APIs for real-time insurance monitoring-insurance_status_func.js
Drive ID: 1MOhiduScI-RP7DEu9z-Tf0Xcjkv-5v-r
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-06T00:09:13.000Z

// netlify/functions/insurance-status.js
// Integrates with Allstate and Progressive APIs for real-time insurance monitoring

exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        // Extract user token from Authorization header
        const authHeader = event.headers.authorization;
        if (!authHeader) {
            return { 
                statusCode: 401, 
                headers, 
                body: JSON.stringify({ error: 'No authorization token' }) 
            };
        }

        // In production, verify JWT token here
        const token = authHeader.replace('Bearer ', '');

        // Allstate API Integration
        // API Keys should be stored in Netlify Environment Variables
        const allstateApiKey = process.env.ALLSTATE_API_KEY;
        const progressiveApiKey = process.env.PROGRESSIVE_API_KEY;

        let allstateStatus = 'Configuration Needed';
        let progressiveStatus = 'Configuration Needed';
        let telemetryData = {};

        // Allstate Telematics API Call
        if (allstateApiKey) {
            try {
                const allstateResponse = await fetch('https://api.allstate.com/v1/telematics/status', {
                    headers: {
                        'Authorization': `Bearer ${allstateApiKey}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (allstateResponse.ok) {
                    const allstateData = await allstateResponse.json();
                    allstateStatus = `✅ Active - Score: ${allstateData.drivingScore || 'N/A'}`;
                    telemetryData.allstate = allstateData;
                }
            } catch (err) {
                console.error('Allstate API error:', err);
                allstateStatus = '⚠️ Connection Error';
            }
        }

        // Progressive Snapshot API Call
        if (progressiveApiKey) {
            try {
                const progressiveResponse = await fetch('https://api.progressive.com/snapshot/v2/status', {
                    headers: {
                        'X-API-Key': progressiveApiKey,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (progressiveResponse.ok) {
                    const progressiveData = await progressiveResponse.json();
                    progressiveStatus = `✅ Active - Discount: ${progressiveData.discount || '0%'}`;
                    telemetryData.progressive = progressiveData;
                }
            } catch (err) {
                console.error('Progressive API error:', err);
                progressiveStatus = '⚠️ Connection Error';
            }
        }

        // Return aggregated insurance data
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                allstate: allstateStatus,
                progressive: progressiveStatus,
                telemetry: telemetryData,
                timestamp: new Date().toISOString(),
                message: 'Insurance status retrieved successfully'
            })
        };

    } catch (error) {
        console.error('Insurance status error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to retrieve insurance status',
                allstate: '❌ Error',
                progressive: '❌ Error'
            })
        };
    }
};