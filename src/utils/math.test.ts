import { roundToNearest100 } from './math';

test('runder av til nærmeste 100', () => {
    const numbers = [49, 51, 149.99999, 150.00001];

    const roundedNumbers = numbers.map(n => roundToNearest100(n));

    const expected = [0, 100, 100, 200];

    expect(roundedNumbers).toEqual(expected);
});
