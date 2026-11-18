Original name: Predictive maintenance alerts based on vehicle data and mileage maintenance_alerts.js
Drive ID: 1SDvqK2ahtAFcc2QOcLUm2SllZNTM2GTh
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-05T23:43:40.000Z

// netlify/functions/maintenance-predict.js
// Predictive maintenance alerts based on vehicle data and mileage

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
        const { vehicleId, currentOdometer } = event.httpMethod === 'GET'
            ? event.queryStringParameters
            : JSON.parse(event.body);

        // Fetch vehicle maintenance history from database
        const vehicleData = await getVehicleData(vehicleId);
        const maintenanceHistory = await getMaintenanceHistory(vehicleId);

        // Calculate maintenance intervals
        const maintenanceSchedule = {
            oilChange: {
                interval: 10000, // miles
                lastService: vehicleData.lastOilChange || 0,
                nextDue: (vehicleData.lastOilChange || 0) + 10000,
                dueIn: ((vehicleData.lastOilChange || 0) + 10000) - currentOdometer,
                status: 'OK'
            },
            tireRotation: {
                interval: 7500,
                lastService: vehicleData.lastTireRotation || 0,
                nextDue: (vehicleData.lastTireRotation || 0) + 7500,
                dueIn: ((vehicleData.lastTireRotation || 0) + 7500) - currentOdometer,
                status: 'OK'
            },
            brakeInspection: {
                interval: 25000,
                lastService: vehicleData.lastBrakeCheck || 0,
                nextDue: (vehicleData.lastBrakeCheck || 0) + 25000,
                dueIn: ((vehicleData.lastBrakeCheck || 0) + 25000) - currentOdometer,
                status: 'OK'
            },
            airFilter: {
                interval: 15000,
                lastService: vehicleData.lastAirFilter || 0,
                nextDue: (vehicleData.lastAirFilter || 0) + 15000,
                dueIn: ((vehicleData.lastAirFilter || 0) + 15000) - currentOdometer,
                status: 'OK'
            },
            transmission: {
                interval: 50000,
                lastService: vehicleData.lastTransmission || 0,
                nextDue: (vehicleData.lastTransmission || 0) + 50000,
                dueIn: ((vehicleData.lastTransmission || 0) + 50000) - currentOdometer,
                status: 'OK'
            },
            inspection: {
                interval: 'annual',
                lastService: vehicleData.lastInspection,
                nextDue: getNextAnnualDate(vehicleData.lastInspection),
                dueInDays: getDaysUntil(getNextAnnualDate(vehicleData.lastInspection)),
                status: 'OK'
            }
        };

        // Set status based on proximity to due date
        const alerts = [];
        Object.keys(maintenanceSchedule).forEach(item => {
            const service = maintenanceSchedule[item];
            
            if (item === 'inspection') {
                if (service.dueInDays < 0) {
                    service.status = 'OVERDUE';
                    alerts.push({ type: item, severity: 'CRITICAL', message: 'Annual inspection overdue' });
                } else if (service.dueInDays < 30) {
                    service.status = 'DUE_SOON';
                    alerts.push({ type: item, severity: 'WARNING', message: `Inspection due in ${service.dueInDays} days` });
                }
            } else {
                if (service.dueIn < 0) {
                    service.status = 'OVERDUE';
                    alerts.push({ type: item, severity: 'CRITICAL', message: `${item} is overdue by ${Math.abs(service.dueIn)} miles` });
                } else if (service.dueIn < 500) {
                    service.status = 'DUE_SOON';
                    alerts.push({ type: item, severity: 'WARNING', message: `${item} due in ${service.dueIn} miles` });
                }
            }
        });

        // Predictive analysis based on driving patterns
        const predictions = analyzeDrivingPatterns(maintenanceHistory, currentOdometer);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                vehicleId: vehicleId,
                currentOdometer: currentOdometer,
                maintenanceSchedule: maintenanceSchedule,
                alerts: alerts,
                predictions: predictions,
                nextServiceRecommended: alerts.length > 0 ? alerts[0].type : null,
                estimatedCost: calculateMaintenanceCost(alerts),
                checkedAt: new Date().toISOString()
            })
        };

    } catch (error) {
        console.error('Maintenance Prediction Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Maintenance prediction failed' })
        };
    }
};

async function getVehicleData(vehicleId) {
    // In production, fetch from database
    return {
        lastOilChange: 145000,
        lastTireRotation: 142000,
        lastBrakeCheck: 130000,
        lastAirFilter: 140000,
        lastTransmission: 120000,
        lastInspection: '2024-08-15'
    };
}

async function getMaintenanceHistory(vehicleId) {
    // Fetch maintenance records
    return [];
}

function getNextAnnualDate(lastInspectionDate) {
    const last = new Date(lastInspectionDate);
    const next = new Date(last);
    next.setFullYear(next.getFullYear() + 1);
    return next.toISOString().split('T')[0];
}

function getDaysUntil(dateString) {
    const target = new Date(dateString);
    const now = new Date();
    const diff = target - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function analyzeDrivingPatterns(history, currentOdometer) {
    return {
        avgMilesPerMonth: 3500,
        heavyUse: currentOdometer > 100000,
        recommendations: [
            'Consider synthetic oil for extended intervals',
            'Monitor tire pressure weekly for fuel efficiency',
            'Schedule preventive maintenance during downtime'
        ]
    };
}

function calculateMaintenanceCost(alerts) {
    const costs = {
        oilChange: 85,
        tireRotation: 50,
        brakeInspection: 150,
        airFilter: 45,
        transmission: 300,
        inspection: 75
    };
    
    return alerts.reduce((total, alert) => total + (costs[alert.type] || 0), 0);
}