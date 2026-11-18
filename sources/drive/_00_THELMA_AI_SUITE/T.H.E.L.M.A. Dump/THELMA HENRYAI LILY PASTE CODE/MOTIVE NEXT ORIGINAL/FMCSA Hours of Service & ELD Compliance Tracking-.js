Original name: FMCSA Hours of Service & ELD Compliance Tracking-.js
Drive ID: 1QXHbPdebEtgPWV9gcRZKCRucdt7DnroC
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-06T00:08:03.000Z

// netlify/functions/hos-update.js
// FMCSA Hours of Service & ELD Compliance Tracking

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

        if (event.httpMethod === 'POST') {
            const { timestamp, status, location } = JSON.parse(event.body);

            // Calculate HOS based on FMCSA regulations
            // 11-hour driving limit, 14-hour on-duty limit, 70-hour/8-day cycle
            
            // In production, store in database (Supabase/PostgreSQL)
            const hosData = {
                driveTime: '8:45',      // Hours driven today
                onDutyTime: '10:30',    // Hours on duty today
                cycleTime: '52:15',     // Hours in current 8-day cycle
                remainingDrive: '2:15', // Remaining drive time
                remainingOnDuty: '3:30',// Remaining on-duty time
                violations: [],         // Any HOS violations
                eldCompliant: true,
                lastUpdate: timestamp,
                status: status || 'driving',
                location: location
            };

            // Check for violations
            const driveMinutes = parseTimeToMinutes(hosData.driveTime);
            const onDutyMinutes = parseTimeToMinutes(hosData.onDutyTime);
            const cycleMinutes = parseTimeToMinutes(hosData.cycleTime);

            if (driveMinutes > 660) { // 11 hours
                hosData.violations.push('Exceeded 11-hour drive limit');
            }
            if (onDutyMinutes > 840) { // 14 hours
                hosData.violations.push('Exceeded 14-hour on-duty limit');
            }
            if (cycleMinutes > 4200) { // 70 hours
                hosData.violations.push('Exceeded 70-hour/8-day cycle');
            }

            // Send notifications if violations detected
            if (hosData.violations.length > 0) {
                await sendHOSViolationAlert(hosData);
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(hosData)
            };
        }

        // GET request - retrieve current HOS status
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                driveTime: '8:45',
                onDutyTime: '10:30',
                cycleTime: '52:15',
                eldCompliant: true,
                violations: []
            })
        };

    } catch (error) {
        console.error('HOS Update Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to update HOS data' })
        };
    }
};

function parseTimeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 60) + minutes;
}

async function sendHOSViolationAlert(hosData) {
    // Send email/SMS alerts for HOS violations
    // Integration with SendGrid/Twilio
    console.log('HOS Violation Alert:', hosData.violations);
}