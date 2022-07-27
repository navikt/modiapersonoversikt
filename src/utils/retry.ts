export function retry<T>(max: number = 3, block: () => T): T {
    let count = 0;
    let error: unknown | undefined = undefined;

    while (count < max) {
        try {
            return block();
        } catch (e: unknown) {
            error = e;
        }
        count++;
    }
    throw error;
}

export async function retryAsync<T>(max: number = 3, block: () => Promise<T>): Promise<T> {
    let count = 0;
    let error: unknown | undefined = undefined;

    while (count < max) {
        try {
            return await block();
        } catch (e: unknown) {
            error = e;
        }

        count++;
    }
    throw error;
}
