import { LestStatus, type Melding, Meldingstype, type Traad } from '../../../../../models/meldinger/meldinger';
import { Temagruppe, temagruppeTekst } from '../../../../../models/temagrupper';
import { erMeldingFraBruker, erMeldingFraNav, erUbesvartHenvendelseFraBruker } from './meldingerUtils';

describe('Meldingstyper', () => {
    const sporsmalSkriflig = Meldingstype.SPORSMAL_SKRIFTLIG;
    const svarSkriftlig = Meldingstype.SVAR_SKRIFTLIG;

    it('gir at spørsmål skriftlig er fra bruker', () => {
        expect(erMeldingFraBruker(sporsmalSkriflig)).toBe(true);
    });

    it('gir at svar skriftlig er fra NAV', () => {
        expect(erMeldingFraNav(svarSkriftlig)).toBe(true);
    });
});
describe('Dokumentvarsler', () => {
    const tomTemaGruppeNull = null;
    const tomTemaGruppeEmpty = '';
    const tomTemagruppeSlettet = Temagruppe.InnholdSlettet;

    it('Gir temagruppe Arbeid ved temagruppe ARB', () => {
        expect(temagruppeTekst(Temagruppe.Arbeid)).toBe('Arbeid');
    });
    it('Gir Ingen temagruppe for temagruppe null', () => {
        expect(temagruppeTekst(<Temagruppe>(<unknown>tomTemaGruppeNull))).toBe('Ingen temagruppe');
    });
    it('Gir riktig temagruppe på dokumentvarsler med emtpy (da dette tolkes som slettet melding)', () => {
        expect(temagruppeTekst(<Temagruppe>tomTemaGruppeEmpty)).toBe('Innhold slettet');
    });
    it('Gir riktig temagruppe på dokumentvarsler temagruppe.Slettet', () => {
        expect(temagruppeTekst(<Temagruppe>tomTemagruppeSlettet)).toBe('Innhold slettet');
    });
});

describe('erUbesvartHenvendelseFraBruker', () => {
    const baseMelding: Melding = {
        fritekst: '',
        id: '1234',
        meldingsId: '12345',
        meldingstype: Meldingstype.SPORSMAL_SKRIFTLIG,
        opprettetDato: '',
        sendtTilSladding: false,
        skrevetAvTekst: '',
        status: LestStatus.Lest,
        temagruppe: Temagruppe.Arbeid
    };

    it('Tråder som er initiert av bruker skal regnes som ubesvarte', () => {
        const traad: Traad = { traadId: '', meldinger: [baseMelding], journalposter: [] };
        expect(erUbesvartHenvendelseFraBruker(traad)).toBe(true);
    });

    it('Tråder med mer enn en melding skal ikke regnes som ubesvarte', () => {
        const traad: Traad = { traadId: '', meldinger: [baseMelding, baseMelding], journalposter: [] };
        expect(erUbesvartHenvendelseFraBruker(traad)).toBe(false);
    });

    it('Tråder som ikke er initiert av bruker skal ikke regnes som ubesvarte', () => {
        const traad: Traad = {
            traadId: '',
            meldinger: [{ ...baseMelding, meldingstype: Meldingstype.SPORSMAL_MODIA_UTGAAENDE }],
            journalposter: []
        };
        expect(erUbesvartHenvendelseFraBruker(traad)).toBe(false);
    });

    it('Tråder som er avsluttet skal ikke regnes som ubesvarte', () => {
        const traad: Traad = {
            traadId: '',
            meldinger: [{ ...baseMelding, avsluttetDato: '2022-01-01T12:00:00.000z' }],
            journalposter: []
        };
        expect(erUbesvartHenvendelseFraBruker(traad)).toBe(false);
    });
});
