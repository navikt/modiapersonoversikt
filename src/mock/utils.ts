import { HandlerArgument, ResponseUtils } from 'yet-another-fetch-mock';

export function withDelayedResponse(
    delay: number,
    skalGjøresUtenFeil: boolean,
    genererMockData: (args: HandlerArgument) => object) {
    return ResponseUtils.delayed(
        delay,
        (args: HandlerArgument) => lagPromise(skalGjøresUtenFeil, genererMockData(args)));
}

function lagPromise(skalGjøresUtenFeil: boolean, data: object) {
    return new Promise((resolve, reject) => {
        if (skalGjøresUtenFeil) {
            resolve(ResponseUtils.jsonPromise(data));
        } else {
            reject(`Endepunkt er konfigurert opp til å feile`);
        }
    });
}

export function mockGeneratorMedFødselsnummer(fn: (fødselsnummer: string) => object) {
    return (args: HandlerArgument) => fn(args.pathParams.fodselsnummer);
}