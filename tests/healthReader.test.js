const path = require('path');
const fs = require('fs/promises');
const { healthMetricCounter } = require('../healthReader');

const TEST_FILE = path.join(__dirname, 'test-health.json');
const testData = {
    user: 'testUser',
    metrics: [
        { date: '2024-01-01', type: 'sleep', duration: '8' },
        { date: '2024-01-01', type: 'nutrition', calories: '2100' },
        { date: '2024-01-02', type: 'sleep', duration: '6' }
    ]
};

beforeAll(async () => {
    await fs.writeFile(TEST_FILE, JSON.stringify(testData));
});

afterAll(async () => {
    try {
        await fs.unlink(TEST_FILE);
    } catch (error) {
        console.error('Failed to delete test file:', error);
    }
});

describe('healthMetricCounter', () => {
    test('read valid JSON file', async () => {
        const result = await healthMetricCounter(TEST_FILE);
        expect(result).not.toBeNull();
    });

    test('returns the number of health entries', async () => {
        const result = await healthMetricCounter(TEST_FILE);
        expect(typeof result).toBe('number');
        expect(result).toBe(3);
    });

    test('returns null when the file is missing', async () => {
        const result = await healthMetricCounter('missing.json');
        expect(result).toBeNull();
    });
});