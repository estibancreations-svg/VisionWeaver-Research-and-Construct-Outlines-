Original name: netlify:functions:health.js
Drive ID: 1qQMZ0k9aXOdTkomPpP7KSBbSVDisfScY
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/motive-next-deployment Sep 5/netlify:/functions:/health.js/
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