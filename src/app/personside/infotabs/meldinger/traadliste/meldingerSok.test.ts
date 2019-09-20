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
        getMockSøketråd('Aut velit quae ut illo tempore explicabo. Eos et nihil qui autem cum voluptate.'),
        getMockSøketråd('Et qui ullam inventore praesentium explicabo.')
    ];
    const treff = sokEtterMeldinger(traader, 'illo');
    expect(treff).toHaveLength(1);

    const treff2 = sokEtterMeldinger(traader, 'explicabo');
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
