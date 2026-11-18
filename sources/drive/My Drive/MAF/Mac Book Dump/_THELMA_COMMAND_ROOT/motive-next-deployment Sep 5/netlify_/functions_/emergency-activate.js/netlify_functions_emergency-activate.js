Original name: netlify:functions:emergency-activate.js
Drive ID: 1o2daRZ8e-dK_Wxa7TEBLoLQ0_lxRRwmr
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/motive-next-deployment Sep 5/netlify:/functions:/emergency-activate.js/
Modified: 2025-09-06T02:58:17.000Z

exports.handler = async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' } };
    }
    
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method not allowed' };
    }

    const { location } = JSON.parse(event.body);
    
    return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
            success: true,
            emergency: {
                emergencyId: `EMG_${Date.now()}`,
                location: location,
                responseStatus: 'active',
                estimatedResponseTime: '12 minutes'
            }
        })
    };
};