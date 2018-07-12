import * as React from 'react';
import NavDatovelger from 'nav-datovelger';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { formaterTilISO8601Date } from '../../utils/dateUtils';

interface Props {
    dato: Date;
    id: string;
    onChange: (dato: Date) => void;
    feil?: SkjemaelementFeil;
    children: string;
}

function Feilmelding({feil}: { feil: SkjemaelementFeil | undefined}) {
    if (!feil) {
        return null;
    }
    return (
        <div role={'alert'}>
            <div className={'skjemaelement__feilmelding'}>{feil.feilmelding}</div>
        </div>
    );
}

export function tilPeriode(gyldigTil: Date) {
    return {
        fra: formaterTilISO8601Date(new Date()),
        til: formaterTilISO8601Date(gyldigTil)
    };
}

export default function Datovelger({dato, id, onChange, feil, children}: Props) {
    return (
        <>
            <label htmlFor={id} className={'skjemaelement__label'}>{children}</label>
            <NavDatovelger
                dato={dato}
                id={id}
                onChange={onChange}
            />
            <Feilmelding feil={feil}/>
        </>
    );
}