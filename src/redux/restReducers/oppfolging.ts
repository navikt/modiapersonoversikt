import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { apiBaseUri } from '../../api/config';
import { formaterTilISO8601Date } from '../../utils/stringFormatting';
import { AppState } from '../reducers';
import { DetaljertOppfolging } from '../../models/oppfolging';

function getDetaljertOppfolgingFetchUri(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;
    const periode = state.oppfolging.valgtPeriode;
    const uri = `${apiBaseUri}/oppfolging/${fodselsnummer}/ytelserogkontrakter${lagQueryParametre(
        periode.fra,
        periode.til
    )}`;
    return uri;
}

function lagQueryParametre(startDato: Date, sluttDato: Date): string {
    return `?startDato=${formaterTilISO8601Date(startDato)}&sluttDato=${formaterTilISO8601Date(sluttDato)}`;
}

export function getOppfolgingFetchUriu(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/oppfolging/${fodselsnummer}`;
}

export default createRestResourceReducerAndActions<DetaljertOppfolging>('oppfolging', getDetaljertOppfolgingFetchUri);
