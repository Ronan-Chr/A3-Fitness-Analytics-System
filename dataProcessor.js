require('dotenv').config();
const { workoutCalculator } = require('./workoutReader');
const { healthMetricCounter } = require('./healthReader');

async function processFiles() {
    try {
        const userName = process.env.USER_NAME;
        const weeklyGoal = parseFloat(process.env.WEEKLY_GOAL);

        console.log('Processing data for:', userName);

        console.log('📁 Reading workout data...');
        const workoutData = await workoutCalculator('./data/workouts.csv');

        console.log('📁 Reading health data...');
        const healthEntries = await healthMetricCounter('./data/health-metrics.json');

        if (workoutData == null || healthEntries == null) {
            console.error('Failed to process data');
            return;
        }

        console.log('\n=== SUMMARY ===');
        console.log('Workouts found:', workoutData.totalWorkouts);
        console.log('Total workout minutes:', workoutData.totalMinutes);
        console.log('Health entries found:', healthEntries);
        console.log('Weekly goal:', weeklyGoal, 'minutes');

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