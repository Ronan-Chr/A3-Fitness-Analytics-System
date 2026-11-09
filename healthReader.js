const fs = require('fs/promises');

// Function to count the total number of health metric entries in a JSON file
async function healthMetricCounter(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const healthData = JSON.parse(data);
        const totalEntries = healthData.metrics.length;
        // Log the total number of health metric entries
        console.log('Total health entries:', totalEntries);
        return totalEntries;
    } catch (error) {
        // Handle different types of errors
        if (error.code === 'ENOENT') {
            console.error('File not found - check the path:', error.message);
        } else if (error.name === 'SyntaxError') {
            console.log('Invalid JSON - Checks the formating:', error.message);
        } else {
            console.log('Unknown Error:', error.message);
        }
        return null;
    }
}
// TEST PRINTS
// healthMetricCounter('./data/health-metrics.json');

module.exports = { healthMetricCounter };