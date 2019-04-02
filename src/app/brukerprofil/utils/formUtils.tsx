import * as React from 'react';
import { formaterDato } from '../../../utils/stringFormatting';
import EtikettGrå from '../../../components/EtikettGrå';
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

export function visEndringsinfo(endringsinfo?: Endringsinfo) {
    return (endringsinfo && endretAvVisning(endringsinfo.sistEndret, endringsinfo.sistEndretAv)) || null;
}

export function endretAvVisning(sistEndret: string, sistEndretAv: string) {
    const formattertdato = formaterDato(sistEndret);
    return (
        <EtikettGrå>
            Endret {formattertdato} {sistEndretAv}
        </EtikettGrå>
    );
}
