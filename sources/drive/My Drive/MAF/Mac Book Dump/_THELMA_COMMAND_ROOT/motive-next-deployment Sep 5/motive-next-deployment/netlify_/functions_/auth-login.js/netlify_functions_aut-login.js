Original name: netlify:functions:aut-login.js
Drive ID: 1KXSk06MJioE0HF3dieiXzQebtpDZJR3a
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/motive-next-deployment Sep 5/motive-next-deployment/netlify:/functions:/auth-login.js/
Modified: 2025-09-06T02:33:59.000Z

exports.handler = async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' } };
    }
    
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method not allowed' };
    }

    const { email, userType } = JSON.parse(event.body);
    
    return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
            success: true,
            user: { email, role: userType, name: email.split('@')[0] },
            message: 'Login successful'
        })
    };
};