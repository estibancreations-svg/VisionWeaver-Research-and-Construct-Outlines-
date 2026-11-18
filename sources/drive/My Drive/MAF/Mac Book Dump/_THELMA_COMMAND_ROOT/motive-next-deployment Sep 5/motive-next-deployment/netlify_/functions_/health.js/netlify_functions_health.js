Original name: netlify:functions:health.js
Drive ID: 13pPfYvjbQegm_9cOUs-5p4cp1mYQxF64
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/motive-next-deployment Sep 5/motive-next-deployment/netlify:/functions:/health.js/
Modified: 2025-09-06T02:32:16.000Z

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            status: 'healthy',
            owner: 'Steven Henry',
            domain: 'motivenext.online',
            madeIn: 'USA 🇺🇸'
        })
    };
};