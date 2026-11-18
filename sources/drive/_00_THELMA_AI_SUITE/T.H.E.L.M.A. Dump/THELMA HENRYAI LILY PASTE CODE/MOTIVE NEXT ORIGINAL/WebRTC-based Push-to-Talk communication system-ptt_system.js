Original name: WebRTC-based Push-to-Talk communication system-ptt_system.js
Drive ID: 1ghaCSFYFMTqq3wfRfEinLqRTh4x03x-O
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-06T00:08:34.000Z

// netlify/functions/ptt-start.js
// WebRTC-based Push-to-Talk communication system

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
        const { contact, userId } = JSON.parse(event.body);

        // Contact directory with programmable endpoints
        const contactDirectory = {
            'dispatch': {
                email: 'dispatch@motivenext.online',
                phone: process.env.DISPATCH_PHONE || '+1-800-MOTIVE1',
                sipEndpoint: 'sip:dispatch@motivenext.online',
                priority: 'high'
            },
            'emergency': {
                email: 'emergency@motivenext.online',
                phone: '911',
                sipEndpoint: 'sip:emergency@motivenext.online',
                priority: 'critical',
                autoRecord: true
            },
            'fleet': {
                email: 'fleet@motivenext.online',
                phone: process.env.FLEET_MANAGER_PHONE,
                sipEndpoint: 'sip:fleet@motivenext.online',
                priority: 'normal'
            }
        };

        const selectedContact = contactDirectory[contact] || contactDirectory['dispatch'];

        // Initialize WebRTC signaling
        // In production, use Twilio Voice API or similar
        const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

        if (twilioAccountSid && twilioAuthToken) {
            // Twilio Voice integration for production PTT
            const twilio = require('twilio')(twilioAccountSid, twilioAuthToken);
            
            // Create voice call session
            const call = await twilio.calls.create({
                to: selectedContact.phone,
                from: process.env.TWILIO_PHONE_NUMBER,
                url: `${process.env.URL}/.netlify/functions/ptt-twiml`,
                statusCallback: `${process.env.URL}/.netlify/functions/ptt-callback`,
                statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
                record: selectedContact.autoRecord || false
            });

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    sessionId: call.sid,
                    contact: contact,
                    status: 'PTT Active',
                    recipient: selectedContact.email,
                    timestamp: new Date().toISOString()
                })
            };
        }

        // Demo mode response when Twilio not configured
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                sessionId: `PTT_${Date.now()}_${userId}`,
                contact: contact,
                status: 'PTT Active (Demo Mode)',
                recipient: selectedContact.email,
                phone: selectedContact.phone,
                message: 'Configure Twilio credentials for live PTT',
                timestamp: new Date().toISOString()
            })
        };

    } catch (error) {
        console.error('PTT Start Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to initiate PTT session',
                details: error.message
            })
        };
    }
};