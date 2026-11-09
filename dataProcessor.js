require('dotenv').config();
const { workoutCalculator } = require('./workoutReader.js');
const { healthMetricCounter } = require('./healthReader.js');

// Process workout and health data files and generate a summary
async function processFiles() {
    try {
        const userName = process.env.USER_NAME;
        const weeklyGoal = parseFloat(process.env.WEEKLY_GOAL);

        // Display the user's name and weekly goal
        console.log('Processing data for:', userName);

        // Read workout data
        console.log('📁 Reading workout data...');
        const workoutData = await workoutCalculator('./data/workouts.csv');

        // Read health data
        console.log('📁 Reading health data...');
        const healthEntries = await healthMetricCounter('./data/health-metrics.json');

        // Check if data was successfully read
        if (workoutData == null || healthEntries == null) {
            console.error('Failed to process data');
            return;
        }
        
        // Display the summary
        console.log('\n=== SUMMARY ===');
        console.log('Workouts found:', workoutData.totalWorkouts);
        console.log('Total workout minutes:', workoutData.totalMinutes);
        console.log('Health entries found:', healthEntries);
        console.log('Weekly goal:', weeklyGoal, 'minutes');

        // Check if the weekly goal was met
        if (workoutData.totalMinutes >= weeklyGoal) {
            console.log(`🎉 Congratulations ${userName}! You have exceeded your weekly goal!`);
        } else {
            console.log(`Dont quit ${userName}! You missed your weekly goal!`);
        }
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

processFiles();