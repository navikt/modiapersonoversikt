// Fisher-Yates shuffle med Durstenfeld swap.
export function shuffle<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    for (let i = 0; i < array.length; i++) {
        const randomChoiceIndex = randInRange(i, array.length - 1);
        [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
    }
    return array;
}

function randInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}