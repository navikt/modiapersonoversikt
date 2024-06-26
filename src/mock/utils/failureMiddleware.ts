import { Middleware, ResponseData } from 'yet-another-fetch-mock';
import { MockRequest } from 'yet-another-fetch-mock/dist/types/types';

const failures: ResponseData[] = [
    {
        status: 500,
        statusText: 'Internal server error'
    },
    {
        status: 403,
        statusText: 'Forbidden'
    },
    {
        status: 404,
        statusText: 'Not found'
    }
];

export function failurerateMiddleware(probabilityOfFailure: number): Middleware {
    return (request: MockRequest, response: ResponseData) => {
        return new Promise<ResponseData>((resolve) => {
            const rnd = Math.random();
            if (rnd < probabilityOfFailure) {
                const randomFailure = failures[Math.floor(Math.random() * failures.length)];
                resolve(randomFailure);
            } else {
                resolve(response);
            }
        });
    };
}
