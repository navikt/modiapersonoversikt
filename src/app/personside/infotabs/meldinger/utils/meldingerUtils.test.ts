import { Meldingstype } from '../../../../../models/meldinger/meldinger';
import {
    erKommunaleTjenester,
    erMeldingFraBruker,
    erMeldingFraNav,
    erMeldingSpørsmål,
    erMeldingVarsel,
    erPlukkbar,
    erSamtalereferat,
    kanLeggesTilbake
} from './meldingerUtils';
import { Temagruppe, temagruppeTekst } from '../../../../../models/Temagrupper';

describe('Temagrupper', () => {
    const pensjon = Temagruppe.Pensjon;
    const uføretrygd = Temagruppe.Uføretrygd;
    const arbeid = Temagruppe.Arbeid;
    const økonomiskSosial = Temagruppe.ØkonomiskSosial;

    it('gir at pensjon er samtalereferat', () => {
        expect(erSamtalereferat(pensjon)).toBe(true);
    });

    it('git at uføretrygd ikke er samtalereferat', function() {
        expect(erSamtalereferat(uføretrygd)).toBe(false);
    });

    it('gir at arbeid kan legges tilbake', function() {
        expect(kanLeggesTilbake(arbeid)).toBe(true);
    });

    it('gir at pensjon kan ikke legges tilbake', function() {
        expect(kanLeggesTilbake(pensjon)).toBe(false);
    });

    it('gir at arbeid er plukkbar', function() {
        expect(erPlukkbar(arbeid)).toBe(true);
    });

    it('gir at pensjon ikke er plukkbar', function() {
        expect(erPlukkbar(pensjon)).toBe(false);
    });

    it('gir at økonomiskSosial er kommunale tjenester', function() {
        expect(erKommunaleTjenester(økonomiskSosial)).toBe(true);
    });

    it('gir at pensjon ikke er kommunale tjenester', function() {
        expect(erKommunaleTjenester(pensjon)).toBe(false);
    });
});

describe('Meldingstyper', () => {
    const spørsmålSkriftlig = Meldingstype.SPORSMAL_SKRIFTLIG;
    const svarSkriftlig = Meldingstype.SVAR_SKRIFTLIG;
    const dokumentvarsel = Meldingstype.DOKUMENT_VARSEL;

    it('gir at spørsmål skriftlig er fra bruker', function() {
        expect(erMeldingFraBruker(spørsmålSkriftlig)).toBe(true);
    });

    it('gir at svar skriftlig er fra NAV', function() {
        expect(erMeldingFraNav(svarSkriftlig)).toBe(true);
    });

    it('gir at dokumentvarsel er et varsel', function() {
        expect(erMeldingVarsel(dokumentvarsel)).toBe(true);
    });

    it('gir at spørsmål skriftlig er et spørsmål', function() {
        expect(erMeldingSpørsmål(spørsmålSkriftlig)).toBe(true);
    });
});
describe('Dokumentvarsler', () => {
    const tomTemaGruppeNull = null;
    const tomTemaGruppeEmpty = '';
    const tomTemagruppeTNull = Temagruppe.Null;

    it('Gir temagruppe Arbeid ved temagruppe ARB', function() {
        expect(temagruppeTekst(Temagruppe.Arbeid)).toBe('Arbeid');
    });
    it('Gir tom temagruppe på dokumentvarsler med null', function() {
        expect(temagruppeTekst(<Temagruppe>(<unknown>tomTemaGruppeNull))).toBe('');
    });
    it('Gir tom temagruppe på dokumentvarsler med emtpy', function() {
        expect(temagruppeTekst(<Temagruppe>tomTemaGruppeEmpty)).toBe('');
    });
    it('Gir tom temagruppe på dokumentvarsler temagryppe.Null', function() {
        expect(temagruppeTekst(<Temagruppe>tomTemagruppeTNull)).toBe('');
    });
});
