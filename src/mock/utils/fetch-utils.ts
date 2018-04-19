import { HandlerArgument, JSONValue, ResponseData, ResponseUtils } from 'yet-another-fetch-mock';

export function withDelayedResponse(
    delay: number,
    statusCode: (args: HandlerArgument) => number,
    genererMockData: (args: HandlerArgument) => object | object[]) {
    return ResponseUtils.delayed(
        delay,
        (args: HandlerArgument) => lagPromise(statusCode(args), genererMockData(args)));
}

function lagPromise(statusCode: number, data: object | object[]): Promise<ResponseData> {
    return new Promise((resolve) => {
        if (statusCode >= 200 && statusCode < 300) {
            resolve(ResponseUtils.jsonPromise(data as JSONValue));
        } else {
            resolve({status: statusCode});
        }
    });
}

export function mockGeneratorMedFødselsnummer(fn: (fødselsnummer: string) => object | object[]) {
    return (args: HandlerArgument) => fn(args.pathParams.fodselsnummer);
}
