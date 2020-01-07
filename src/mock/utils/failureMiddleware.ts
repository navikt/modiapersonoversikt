import { HandlerArgument, Middleware, ResponseData } from 'yet-another-fetch-mock';

const failures: ResponseData[] = [
    {
        status: 500,
        statusText: 'Internal server error'
    },
    {
        status: 403,
        statusText: 'Forbidden'
    }
];

export function failurerateMiddleware(probabilityOfFailure: number): Middleware {
    return (request: HandlerArgument, response: ResponseData) => {
        return new Promise<ResponseData>(resolve => {
            const rnd = Math.random();
            if (rnd < probabilityOfFailure) {
                resolve(failures[Math.floor(Math.random() * failures.length)]);
            } else {
                resolve(response);
            }
        });
    };
}
