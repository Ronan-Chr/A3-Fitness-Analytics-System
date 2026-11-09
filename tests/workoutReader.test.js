const path = require('path');
const fs = require('fs');
const { readWorkoutData, workoutCalculator } = require('../workoutReader');

const TEST_CSV_FILE = path.join(__dirname, 'test-workouts.csv');
const testCsvData = `date,exercise,duration,calories
2024-01-01,Running,30,300
2024-01-02,Cycling,45,400
2024-01-03,Yoga,60,200`;

beforeAll(() => {
    fs.writeFileSync(TEST_CSV_FILE, testCsvData);
});

afterAll(() => {
    try {
        fs.unlinkSync(TEST_CSV_FILE);
    } catch (error) {
        console.error('Failed to delete test file:', error);
    }
});

describe('workoutCalculator', () => {
    test('reads a valid CSV file', async () => {
        const result = await workoutCalculator(TEST_CSV_FILE);
        expect(result).not.toBeNull();
        expect(result.totalWorkouts).toBe(3);
        expect(result.totalMinutes).toBe(135);
    });

    test('returns null when the file is missing', async () => {
        const result = await workoutCalculator('missing.csv');
        expect(result).toBeNull();
    });
});

// Test readWorkoutData function
describe('readWorkoutData', () => {
    test('returns the correct data structure', async () => {
        const data = await readWorkoutData(TEST_CSV_FILE);
        expect(Array.isArray(data)).toBe(true);
        expect(data).toHaveLength(3);
        expect(data[0]).toHaveProperty('date');
        expect(data[0]).toHaveProperty('exercise');
        expect(data[0]).toHaveProperty('duration');
        expect(data[0]).toHaveProperty('calories');
    });
});
