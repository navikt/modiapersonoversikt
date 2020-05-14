import { AppState } from '../reducers';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';

export type TilgangDTO = HarTilgang | HarIkkeTilgang;
interface HarTilgang {
    harTilgang: true;
}
export interface HarIkkeTilgang {
    harTilgang: false;
    ikkeTilgangArsak: IkkeTilgangArsak;
}

export enum IkkeTilgangArsak {
    Kode6 = 'FP1_KODE6',
    Kode7 = 'FP2_KODE7',
    EgenAnsatt = 'FP3_EGEN_ANSATT',
    Geografi = 'FP4_GEOGRAFISK',
    AdRoller = 'AD_ROLLE',
    Ukjent = 'UNKNOWN'
}

export function getTilgangskontrollUrl(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    if (fnr) {
        return `/modiapersonoversikt-api/rest/tilgang/${fnr}`;
    }
    return `/modiapersonoversikt-api/rest/tilgang`;
}

export default createRestResourceReducerAndActions<TilgangDTO>('tilgangskontroll', getTilgangskontrollUrl);
