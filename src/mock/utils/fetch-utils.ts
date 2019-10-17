import { HandlerArgument, JSONValue, ResponseData, ResponseUtils } from 'yet-another-fetch-mock';

export function withDelayedResponse(
    delay: number,
    statusCode: (args: HandlerArgument) => number,
    genererMockData: (args: HandlerArgument) => object | object[] | undefined
) {
    return ResponseUtils.delayed(delay, (args: HandlerArgument) => lagPromise(statusCode(args), genererMockData(args)));
}

function lagPromise(statusCode: number, data: object | object[] | undefined): Promise<ResponseData> {
    return new Promise(resolve => {
        if (statusCode >= 200 && statusCode < 300) {
            resolve(ResponseUtils.jsonPromise(data as JSONValue));
        } else {
            resolve({ status: statusCode });
        }
    });
}

export function mockGeneratorMedFødselsnummer(fn: (fødselsnummer: string) => object | object[] | undefined) {
    return (args: HandlerArgument) => fn(args.pathParams.fodselsnummer);
}

export function mockGeneratorMedEnhetId(fn: (enhetId: string) => object | object[] | undefined) {
    return (args: HandlerArgument) => fn(args.pathParams.enhetId);
}
