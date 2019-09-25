import { Meldingstype, Saksbehandler, Temagruppe, Traad } from '../../../../../models/meldinger/meldinger';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';
import { sokEtterMeldinger } from './TraadListe';

function getMockSøketråd(
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
                skrevetAv: saksbehandler || mockMelding.skrevetAv
            }
        ]
    };
}

test('Sjekke søk i meldinger basert på fritekst', () => {
    const traader: Traad[] = [
        getMockSøketråd('Dette er en tekst for å sjekke om fritekstsøk fungerer.'),
        getMockSøketråd('Her er en annen tråd med en annen tekst')
    ];
    const treff = sokEtterMeldinger(traader, 'sjekke');
    expect(treff).toHaveLength(1);

    const treff2 = sokEtterMeldinger(traader, 'tekst');
    expect(treff2).toHaveLength(2);
});

test('Sjekke søk i meldinger basert på tittel', () => {
    const traader: Traad[] = [
        getMockSøketråd('', { meldingtype: Meldingstype.DOKUMENT_VARSEL, temagruppe: Temagruppe.Arbeid }),
        getMockSøketråd('', { meldingtype: Meldingstype.DOKUMENT_VARSEL, temagruppe: Temagruppe.AndreSosiale })
    ];
    const treff = sokEtterMeldinger(traader, 'Arbeid');
    expect(treff).toHaveLength(1);
});

test('Sjekke søk i meldinger basert på saksbehandler', () => {
    const traader: Traad[] = [
        getMockSøketråd('', undefined, { fornavn: 'Henriette', etternavn: 'Hansen', ident: '' }),
        getMockSøketråd('', undefined, { fornavn: 'Jørgen', etternavn: 'Braathen', ident: '' })
    ];
    const treff = sokEtterMeldinger(traader, 'Jørgen');
    expect(treff).toHaveLength(1);
});
