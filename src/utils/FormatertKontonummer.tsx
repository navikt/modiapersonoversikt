import type { JSX } from 'react';
import styled from 'styled-components';

const Kontonummer = styled.span`
    span:not(:last-child):after {
        content: '.';
    }
`;

function kontoNummerTilArray(kontonummer: string): Array<string> {
    if (kontonummer.length === 11) {
        return [kontonummer.substr(0, 4), kontonummer.substr(4, 2), kontonummer.substr(6, 5)];
    }
    return [kontonummer];
}

export function FormatertKontonummer(props: { kontonummer: string }): JSX.Element {
    return (
        <Kontonummer>
            {kontoNummerTilArray(props.kontonummer).map((delString, index) => (
                <span key={index}>{delString}</span>
            ))}
        </Kontonummer>
    );
}

export function formatertKontonummerString(kontonummer: string): string {
    return kontoNummerTilArray(kontonummer).reduce((acc, current) => `${acc}.${current}`);
}
