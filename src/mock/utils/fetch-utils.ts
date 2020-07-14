import { MockHandler, MockRequest } from 'yet-another-fetch-mock';

export function withDelayedResponse(
    delay: number,
    statusCode: (args: MockRequest) => number,
    genererMockData: (args: MockRequest) => any
): MockHandler {
    return (req, res, ctx) => res(ctx.delay(delay), ctx.status(statusCode(req)), ctx.json(genererMockData(req)));
}

export function mockGeneratorMedFødselsnummer(fn: (fødselsnummer: string) => object | object[] | undefined) {
    return (args: MockRequest) => fn(args.pathParams.fodselsnummer);
}

export function mockGeneratorMedEnhetId(fn: (enhetId: string) => object | object[] | undefined) {
    return (args: MockRequest) => fn(args.pathParams.enhetId);
}
