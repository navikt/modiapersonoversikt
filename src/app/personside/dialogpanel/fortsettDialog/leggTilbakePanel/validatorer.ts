import { LeggTilbakeState, LeggTilbakeÅrsak } from './LeggTilbakepanel';

export class LeggTilbakeValidator {
    public static aarsak(state: LeggTilbakeState) {
        return state.årsak !== undefined;
    }
    public static tekst(state: LeggTilbakeState) {
        return state.tekst.length < 2000 && state.tekst.length > 0;
    }
    public static tema(state: LeggTilbakeState) {
        return state.tema !== undefined;
    }
    public static erGyldigInnhabilRequest(state: LeggTilbakeState) {
        return state.årsak === LeggTilbakeÅrsak.Innhabil;
    }
    public static erGyldigAnnenAarsakRequest(state: LeggTilbakeState) {
        return state.årsak === LeggTilbakeÅrsak.AnnenÅrsak && this.tekst(state);
    }
    public static erGyldigFeilTemaRequest(state: LeggTilbakeState) {
        return state.årsak === LeggTilbakeÅrsak.FeilTemagruppe && this.tema(state);
    }
}
