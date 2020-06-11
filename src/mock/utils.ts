import { Handler } from 'yet-another-fetch-mock';

export function delayed(ms: number, handler: Handler): Handler {
    return async (req, res, ctx) => {
        await new Promise(resolve => setTimeout(resolve, ms));
        return handler(req, res, ctx);
    };
}
