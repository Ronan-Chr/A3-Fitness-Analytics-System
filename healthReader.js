const fs = require('fs/promises');

async function healthMetricCounter(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const healthData = JSON.parse(data);
        const totalEntries = healthData.metrics.length;
        console.log('Total entries:', totalEntries);
        return totalEntries;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Check Path:', error);
        } else if (error.name === 'SyntaxError') {
            console.log('Invalid JSON - Checks the formating')
        } else {
            console.log('Unknown Error:', error.message);
        }
        return null;
    }
}

healthMetricCounter('./data/health-metrics.json');

module.exports = { healthMetricCounter };