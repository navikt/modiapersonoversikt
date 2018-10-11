import * as React from 'react';
import { formaterDato } from '../../../utils/dateUtils';
import EtikettGrå from '../../../components/EtikettGrå';
import { endretAvTekst } from '../../../utils/endretAvUtil';
import { Endringsinfo } from '../../../models/personadresse';

export interface InputState {
    input: string;
    feilmelding: string | null;
}

export function getSkjemafeil(state: InputState) {
    if (state.feilmelding) {
        return {
            feilmelding: state.feilmelding
        };
    } else {
        return undefined;
    }
}

const ENTER_KEY_PRESS = 13;

export function ignoreEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === ENTER_KEY_PRESS) {
        event.preventDefault();
    }
}

export function endretAvInfoVisning(endringsinfo?: Endringsinfo) {
    return endringsinfo && endretAvVisning(endringsinfo.sistEndret, endringsinfo.sistEndretAv) || null;
}

export function endretAvVisning(sistEndret: string, sistEndretAv: string) {
    const formattertdato = formaterDato(sistEndret);
    const endretAv = endretAvTekst(sistEndretAv);
    return (
        <EtikettGrå>
            Endret {formattertdato} {endretAv}
        </EtikettGrå>
    );
}
