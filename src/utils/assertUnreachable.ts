export function assertUnreachable(x: never): never {
    throw new Error('Dette er en ugyldig forgrening, sjekk at alle gyldige muligheter er tatt hånd om.');
}
