Original name: AI-powered route optimization with weather, traffic, and fuel considerations-route_optimization.js
Drive ID: 1978B8VajdW6aAs7C2Z6GkvIBFOJo_7F9
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-05T23:44:26.000Z

// netlify/functions/route-optimize.js
// AI-powered route optimization with weather, traffic, and fuel considerations

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
        const { origin, destination, vehicleType, preferences } = JSON.parse(event.body);

        // Google Maps Directions API
        const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;
        
        if (!googleMapsKey) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    demo: true,
                    message: 'Configure GOOGLE_MAPS_API_KEY for live routing',
                    route: { distance: '450 miles', duration: '7 hours 30 min' }
                })
            };
        }

        // Get multiple route alternatives
        const routesResponse = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?` +
            `origin=${encodeURIComponent(origin)}&` +
            `destination=${encodeURIComponent(destination)}&` +
            `alternatives=true&` +
            `mode=driving&` +
            `key=${googleMapsKey}`
        );
        const routesData = await routesResponse.json();

        if (routesData.status !== 'OK') {
            throw new Error('Route calculation failed');
        }

        // Analyze each route
        const routeAnalysis = await Promise.all(
            routesData.routes.map(async (route, index) => {
                const polyline = route.overview_polyline.points;
                const legs = route.legs[0];

                // Get weather conditions along route
                const weatherData = await getRouteWeather(route.legs);

                // Calculate fuel cost
                const distance = legs.distance.value / 1609.34; // meters to miles
                const fuelCost = calculateFuelCost(distance, vehicleType);

                // Get toll information
                const tolls = await getTollCost(route);

                // Calculate risk score
                const riskScore = calculateRiskScore(weatherData, route);

                return {
                    routeId: `ROUTE_${index + 1}`,
                    distance: legs.distance.text,
                    duration: legs.duration.text,
                    distanceMiles: distance.toFixed(1),
                    durationMinutes: legs.duration.value / 60,
                    fuelCost: fuelCost,
                    tollCost: tolls.total,
                    totalCost: fuelCost + tolls.total,
                    weather: weatherData,
                    riskScore: riskScore,
                    recommendation: riskScore < 3 ? 'RECOMMENDED' : 'CAUTION',
                    steps: legs.steps.length,
                    polyline: polyline
                };
            })
        );

        // Sort by best route (considering cost, time, and risk)
        const sortedRoutes = routeAnalysis.sort((a, b) => {
            const scoreA = a.riskScore * 100 + a.totalCost + (a.durationMinutes * 0.5);
            const scoreB = b.riskScore * 100 + b.totalCost + (b.durationMinutes * 0.5);
            return scoreA - scoreB;
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                origin: origin,
                destination: destination,
                routesFound: sortedRoutes.length,
                routes: sortedRoutes,
                bestRoute: sortedRoutes[0],
                calculatedAt: new Date().toISOString()
            })
        };

    } catch (error) {
        console.error('Route Optimization Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Route optimization failed' })
        };
    }
};

async function getRouteWeather(legs) {
    // Sample waypoints along route for weather check
    const waypoints = legs[0].steps.filter((_, i) => i % 10 === 0);
    
    const hazards = [];
    let avgTemp = 0;
    
    // In production, check weather at each waypoint
    // For now, return sample data
    return {
        hazards: [],
        avgTemperature: 68,
        conditions: 'Clear',
        alerts: []
    };
}

function calculateFuelCost(miles, vehicleType) {
    const mpg = {
        'semi': 6.5,
        'van': 15,
        'box_truck': 10,
        'car': 30
    };
    
    const vehicleMpg = mpg[vehicleType] || 10;
    const fuelPricePerGallon = 3.89; // National average
    const gallons = miles / vehicleMpg;
    
    return Math.round(gallons * fuelPricePerGallon * 100) / 100;
}

async function getTollCost(route) {
    // TollGuru API integration could go here
    // For now, estimate based on route
    return {
        total: 0,
        tolls: []
    };
}

function calculateRiskScore(weather, route) {
    let score = 0;
    
    if (weather.hazards.includes('SNOW')) score += 3;
    if (weather.hazards.includes('HEAVY_RAIN')) score += 2;
    if (weather.hazards.includes('HIGH_WINDS')) score += 2;
    if (weather.hazards.includes('FOG')) score += 1;
    if (weather.alerts.length > 0) score += 1;
    
    return score;
}