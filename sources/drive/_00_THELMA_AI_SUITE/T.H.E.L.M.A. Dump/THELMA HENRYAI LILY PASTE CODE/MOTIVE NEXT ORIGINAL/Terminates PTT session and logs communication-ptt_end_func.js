Original name: Terminates PTT session and logs communication-ptt_end_func.js
Drive ID: 1k78nGLRJfyj5HSM4812dEmEP0FrDJCfF
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-05T23:47:06.000Z

// netlify/functions/ptt-end.js
// Terminates PTT session and logs communication

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
        const { userId, sessionId } = JSON.parse(event.body);

        // End Twilio call if active
        const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

        if (twilioAccountSid && twilioAuthToken && sessionId) {
            const twilio = require('twilio')(twilioAccountSid, twilioAuthToken);
            
            try {
                // Complete the call
                await twilio.calls(sessionId).update({ status: 'completed' });
                
                // Retrieve call details for logging
                const call = await twilio.calls(sessionId).fetch();
                
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        sessionId: sessionId,
                        duration: call.duration,
                        status: 'Ended',
                        timestamp: new Date().toISOString()
                    })
                };
            } catch (err) {
                console.error('Twilio end call error:', err);
            }
        }

        // Demo mode response
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                sessionId: sessionId || `PTT_END_${Date.now()}`,
                status: 'Ended (Demo Mode)',
                message: 'PTT session terminated',
                timestamp: new Date().toISOString()
            })
        };

    } catch (error) {
        console.error('PTT End Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to end PTT session' })
        };
    }
};