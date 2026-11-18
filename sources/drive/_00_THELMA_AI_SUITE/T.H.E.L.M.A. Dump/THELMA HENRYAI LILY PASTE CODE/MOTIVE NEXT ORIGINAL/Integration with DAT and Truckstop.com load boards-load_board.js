Original name: Integration with DAT and Truckstop.com load boards-load_board.js
Drive ID: 1M53A8c8GnYa7kHGTc4w2Nagf2YtIR59U
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-05T23:45:46.000Z

// netlify/functions/load-board-search.js
// Integration with DAT and Truckstop.com load boards

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

        const params = event.httpMethod === 'GET' 
            ? event.queryStringParameters 
            : JSON.parse(event.body);

        const { origin, destination, equipmentType, radius, minRate } = params;

        // DAT Load Board API Integration
        const datApiKey = process.env.DAT_API_KEY;
        let datLoads = [];

        if (datApiKey) {
            try {
                const datResponse = await fetch('https://api.dat.com/v2/loads/search', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${datApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        origin: { city: origin },
                        destination: { city: destination },
                        equipment: equipmentType || 'V', // Van by default
                        radius: radius || 100,
                        searchType: 'PARTIAL'
                    })
                });

                if (datResponse.ok) {
                    const data = await datResponse.json();
                    datLoads = data.loads || [];
                }
            } catch (err) {
                console.error('DAT API error:', err);
            }
        }

        // Truckstop.com API Integration
        const truckstopApiKey = process.env.TRUCKSTOP_API_KEY;
        let truckstopLoads = [];

        if (truckstopApiKey) {
            try {
                const tsResponse = await fetch('https://api.truckstop.com/loadboard/search', {
                    method: 'POST',
                    headers: {
                        'X-API-Key': truckstopApiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        originCity: origin,
                        destCity: destination,
                        equipmentType: equipmentType || 'Van',
                        searchRadius: radius || 100
                    })
                });

                if (tsResponse.ok) {
                    const data = await tsResponse.json();
                    truckstopLoads = data.results || [];
                }
            } catch (err) {
                console.error('Truckstop API error:', err);
            }
        }

        // Combine and sort results
        const allLoads = [
            ...datLoads.map(l => ({ ...l, source: 'DAT' })),
            ...truckstopLoads.map(l => ({ ...l, source: 'Truckstop' }))
        ];

        // Filter by minimum rate
        const filteredLoads = minRate 
            ? allLoads.filter(load => load.ratePerMile >= minRate)
            : allLoads;

        // Sort by rate (highest first)
        const sortedLoads = filteredLoads.sort((a, b) => 
            (b.ratePerMile || 0) - (a.ratePerMile || 0)
        );

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                count: sortedLoads.length,
                loads: sortedLoads,
                searchParams: params,
                sources: {
                    dat: datLoads.length,
                    truckstop: truckstopLoads.length
                },
                timestamp: new Date().toISOString()
            })
        };

    } catch (error) {
        console.error('Load Board Search Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Load board search failed' })
        };
    }
};