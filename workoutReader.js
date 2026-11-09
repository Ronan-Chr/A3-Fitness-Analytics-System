const fs = require('fs');
const csv = require('csv-parser');

function readWorkoutData(filepath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filepath)
            .on('error', (error) => reject(error))
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', reject);
    });
}

async function workoutCalculator(filepath) {
    try {
        const workouts = await readWorkoutData(filepath);
        const totalWorkouts = workouts.length;
        let totalMinutes = 0;
        for (let i = 0; i < workouts.length; i++) {
            totalMinutes += parseFloat(workouts[i].duration);
        }
        console.log('Total workouts:', totalWorkouts);
        console.log('Total minutes:', totalMinutes);
        return { totalWorkouts, totalMinutes };
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('File not found:', error.message);
        } else {
            console.error('An error occurred:', error.message);
        }
        return null;
    }
}

workoutCalculator('./data/workouts.csv').then(result => {
    console.log('Result:', result);
}).catch(error => {
    console.error('Error:', error);
});

module.exports = { workoutCalculator, readWorkoutData };