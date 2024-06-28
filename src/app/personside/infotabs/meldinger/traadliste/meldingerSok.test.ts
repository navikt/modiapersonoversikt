import { Meldingstype, Saksbehandler, Traad } from '../../../../../models/meldinger/meldinger';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';
import { saksbehandlerTekst, useSokEtterMeldinger } from '../utils/meldingerUtils';
import { renderHook } from '@testing-library/react';
import { Temagruppe } from '../../../../../models/temagrupper';

function getMockSoketraad(
    fritekst: string,
    tittel?: { meldingtype: Meldingstype; temagruppe: Temagruppe },
    saksbehandler?: Saksbehandler
): Traad {
    const mockMelding = statiskTraadMock.meldinger[0];
    return {
        ...statiskTraadMock,
        meldinger: [
            {
                ...mockMelding,
                fritekst: fritekst,
                meldingstype: (tittel && tittel.meldingtype) || mockMelding.meldingstype,
                temagruppe: (tittel && tittel.temagruppe) || mockMelding.temagruppe,
                skrevetAvTekst: saksbehandler ? saksbehandlerTekst(saksbehandler) : mockMelding.skrevetAvTekst
            }
        ]
    };
}

test('Sjekke søk i meldinger basert på fritekst', () => {
    const traader: Traad[] = [
        getMockSoketraad('Dette er en tekst for å sjekke om fritekstsøk fungerer.'),
        getMockSoketraad('Her er en annen tråd med en annen tekst')
    ];

    const renderer = renderHook(() => useSokEtterMeldinger(traader, 'sjekke'));
    const treff = renderer.result.current;
    expect(treff).toHaveLength(1);

    const renderer2 = renderHook(() => useSokEtterMeldinger(traader, 'tekst'));
    const treff2 = renderer2.result.current;
    expect(treff2).toHaveLength(2);
});

test('Sjekke søk i meldinger basert på tittel', () => {
    const traader: Traad[] = [
        getMockSoketraad('', { meldingtype: Meldingstype.SVAR_SKRIFTLIG, temagruppe: Temagruppe.Arbeid }),
        getMockSoketraad('', { meldingtype: Meldingstype.SVAR_SKRIFTLIG, temagruppe: Temagruppe.AndreSosiale })
    ];
    const renderer = renderHook(() => useSokEtterMeldinger(traader, 'Arbeid'));
    const treff = renderer.result.current;
    expect(treff).toHaveLength(1);
});

test('Sjekke søk i meldinger basert på saksbehandler', () => {
    const traader: Traad[] = [
        getMockSoketraad('', undefined, { fornavn: 'Henriette', etternavn: 'Hansen', ident: '' }),
        getMockSoketraad('', undefined, { fornavn: 'Jørgen', etternavn: 'Braathen', ident: '' })
    ];

    const renderer = renderHook(() => useSokEtterMeldinger(traader, 'Jørgen'));
    const treff = renderer.result.current;
    expect(treff).toHaveLength(1);
});
