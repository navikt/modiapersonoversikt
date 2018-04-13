import { HandlerArgument, ResponseUtils } from 'yet-another-fetch-mock';
import FakerStatic = Faker.FakerStatic;

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

export function vektetSjanse(faker: FakerStatic, vekt: Number) {
    const tilfeldigTall = faker.random.number({
        max: 1,
        min: 0,
        precision: 1E-8
    });
    return tilfeldigTall <= vekt;
}
