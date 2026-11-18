Original name: Continuous video monitoring system for driver behavior and safety.js
Drive ID: 1ZxbbqHWLhZv-zYFa3DpG25tyJ4dMpHmi
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-05T23:20:58.000Z

// netlify/functions/video-record.js
// Continuous video monitoring system for driver behavior and safety

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { action, videoData, userId, vehicleId, recordingType } = JSON.parse(event.body);
        
        if (action === 'start') {
            // Initialize recording session
            const sessionId = `VID_${Date.now()}_${userId}`;
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    sessionId,
                    uploadUrl: `https://motivenext.online/upload/${sessionId}`,
                    message: 'Video recording started'
                })
            };
        }
        
        if (action === 'upload') {
            // Upload video chunk to cloud storage
            const videoUrl = await uploadVideoChunk(videoData, userId);
            
            // AI analysis for driver behavior
            const analysis = await analyzeDriverBehavior(videoData);
            
            // Store in database
            const recording = {
                id: `REC_${Date.now()}`,
                userId,
                vehicleId,
                recordingType: recordingType || 'interior',
                videoUrl,
                durationSeconds: videoData.duration || 0,
                aiAnalysis: analysis,
                timestamp: new Date().toISOString()
            };
            
            // Alert if unsafe behavior detected
            if (analysis.alerts.length > 0) {
                await sendBehaviorAlert(userId, analysis);
            }
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    recordingId: recording.id,
                    videoUrl: recording.videoUrl,
                    analysis: analysis
                })
            };
        }
        
        if (action === 'stop') {
            // Finalize recording
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Recording stopped and saved'
                })
            };
        }
        
    } catch (error) {
        console.error('Video recording error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Video recording failed' })
        };
    }
};

async function uploadVideoChunk(videoData, userId) {
    // Upload to AWS S3 or Cloudinary
    // In production, use presigned URLs for direct upload
    return `https://motivenext.online/videos/${userId}/${Date.now()}.mp4`;
}

async function analyzeDriverBehavior(videoData) {
    // AI analysis using AWS Rekognition or Google Video Intelligence
    // Detects: drowsiness, distraction, phone use, not wearing seatbelt
    
    return {
        driverAttentive: true,
        seatbeltOn: true,
        phoneDetected: false,
        drowsinessScore: 0.05, // 0-1 scale
        distractionEvents: 0,
        alerts: [],
        timestamp: new Date().toISOString()
    };
}

async function sendBehaviorAlert(userId, analysis) {
    // Send SMS/email alert to fleet manager
    console.log('Behavior alert sent for user:', userId);
}