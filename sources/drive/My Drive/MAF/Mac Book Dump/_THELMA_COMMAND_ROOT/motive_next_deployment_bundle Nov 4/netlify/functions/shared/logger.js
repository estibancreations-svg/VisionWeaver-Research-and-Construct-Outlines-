Original name: logger.js
Drive ID: 1SbeGq-n9-nk4n9i4-X73aSYJ4ZSPQnB7
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/motive_next_deployment_bundle Nov 4/netlify/functions/shared/
Modified: 2025-11-05T03:08:42.000Z

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

module.exports = logger;
