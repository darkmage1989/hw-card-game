const { it, describe } = require('@jest/globals');
const { shuffle } = require('./units');

// моя ненависть к jest бесконечна

describe('Не пропадают ли значения', () => {
    it('god help me', () => {
        const numbers = [1, 2, 3, 4, 5];
        shuffle(numbers);
        expect(numbers).toHaveLength(5);
        expect(numbers).not.toHaveLength(3);
    });
    it('для закрепления', () => {
        const numbers = [1, 2, 3, 4, 5];
        shuffle(numbers);
        expect(numbers).not.toHaveLength(3);
    });
});
