export const ENDASH = '\u2013';

export function removeWhitespace(input: string) {
    return input.replace(/ /g, '');
}

export function erTomStreng(input: string) {
    return removeWhitespace(input).length === 0;
}

export function erIkkeTomStreng(input: string) {
    return !erTomStreng(input);
}

export function erTall(input: string) {
    return !isNaN(Number(input));
}

export function sorterAlfabetisk(a: string, b: string) {
    return a > b ? 1 : -1;
}

export function removePrefix(base: string, ...prefixes: string[]): string {
    return prefixes.reduce((current, prefix) => {
        if (current.startsWith(prefix)) {
            return current.slice(prefix.length);
        }
        return current;
    }, base);
}
