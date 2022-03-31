import { LestStatus, Melding, Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import { erMeldingFraBruker, erMeldingFraNav, erUbesvartHenvendelseFraBruker } from './meldingerUtils';
import { Temagruppe, temagruppeTekst } from '../../../../../models/temagrupper';

describe('Meldingstyper', () => {
    const sporsmalSkriflig = Meldingstype.SPORSMAL_SKRIFTLIG;
    const svarSkriftlig = Meldingstype.SVAR_SKRIFTLIG;

    it('gir at spørsmål skriftlig er fra bruker', function () {
        expect(erMeldingFraBruker(sporsmalSkriflig)).toBe(true);
    });

    it('gir at svar skriftlig er fra NAV', function () {
        expect(erMeldingFraNav(svarSkriftlig)).toBe(true);
    });
});
describe('Dokumentvarsler', () => {
    const tomTemaGruppeNull = null;
    const tomTemaGruppeEmpty = '';
    const tomTemagruppeSlettet = Temagruppe.InnholdSlettet;

    it('Gir temagruppe Arbeid ved temagruppe ARB', function () {
        expect(temagruppeTekst(Temagruppe.Arbeid)).toBe('Arbeid');
    });
    it('Gir Ingen temagruppe for temagruppe null', function () {
        expect(temagruppeTekst(<Temagruppe>(<unknown>tomTemaGruppeNull))).toBe('Ingen temagruppe');
    });
    it('Gir riktig temagruppe på dokumentvarsler med emtpy (da dette tolkes som slettet melding)', function () {
        expect(temagruppeTekst(<Temagruppe>tomTemaGruppeEmpty)).toBe('Innhold slettet');
    });
    it('Gir riktig temagruppe på dokumentvarsler temagruppe.Slettet', function () {
        expect(temagruppeTekst(<Temagruppe>tomTemagruppeSlettet)).toBe('Innhold slettet');
    });
});

describe('erUbesvartHenvendelseFraBruker', () => {
    const baseMelding: Melding = {
        fritekst: '',
        id: '1234',
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
