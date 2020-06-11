import { Handler, HandlerRequest } from 'yet-another-fetch-mock';

export function withDelayedResponse(
    delay: number,
    statusCode: (args: HandlerRequest) => number,
    genererMockData: (args: HandlerRequest) => object | object[] | undefined
): Handler {
    return (req, res, ctx) => res(ctx.delay(delay), ctx.status(statusCode(req)), ctx.json(genererMockData(req)));
}

export function mockGeneratorMedFødselsnummer(fn: (fødselsnummer: string) => object | object[] | undefined) {
    return (args: HandlerRequest) => fn(args.pathParams.fodselsnummer);
}

export function mockGeneratorMedEnhetId(fn: (enhetId: string) => object | object[] | undefined) {
    return (args: HandlerRequest) => fn(args.pathParams.enhetId);
}
