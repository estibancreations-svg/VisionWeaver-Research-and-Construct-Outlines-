Original name: monitor.js
Drive ID: 1YMASCakziIl3LEMBbuFMK2B8KO2OZMac
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/motive_next_deployment_bundle Nov 4/netlify/functions/shared/
Modified: 2025-11-05T03:08:42.000Z

const axios = require('axios');

function sendMetric(name, value) {
  return axios.post('https://api.datadoghq.com/api/v1/series', {
    series: [{
      metric: name,
      points: [[Date.now() / 1000, value]],
      type: 'gauge',
      tags: ['env:production']
    }]
  }, {
    headers: {
      'DD-API-KEY': process.env.DATADOG_API_KEY,
      'Content-Type': 'application/json'
    }
  });
}

module.exports = { sendMetric };
