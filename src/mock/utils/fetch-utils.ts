import { MockHandler, MockRequest } from 'yet-another-fetch-mock';

export function withDelayedResponse(
    delay: number,
    statusCode: (args: MockRequest) => number,
    genererMockData: (args: MockRequest) => any
): MockHandler {
    return (req, res, ctx) => res(ctx.delay(delay), ctx.status(statusCode(req)), ctx.json(genererMockData(req)));
}

export function verify(isInvalid: (req: MockRequest) => string | undefined, handler: MockHandler): MockHandler {
    return (req, res, ctx) => {
        const invalid = isInvalid(req);
        if (invalid) {
            return res(ctx.status(500), ctx.statusText(invalid));
        } else {
            return handler(req, res, ctx);
        }
    };
}

export function mockGeneratorMedFødselsnummer(fn: (fødselsnummer: string) => object | object[] | undefined) {
    return (args: MockRequest) => fn(args.pathParams.fodselsnummer);
}

export function mockGeneratorMedEnhetId(fn: (enhetId: string) => object | object[] | undefined) {
    return (args: MockRequest) => fn(args.pathParams.enhetId);
}
