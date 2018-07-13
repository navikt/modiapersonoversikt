import * as React from 'react';
import NavDatovelger, { Avgrensninger } from 'nav-datovelger';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { formaterTilISO8601Date } from '../../utils/dateUtils';

interface Props {
    dato: Date | undefined;
    id: string;
    onChange: (dato: Date) => void;
    feil?: SkjemaelementFeil;
    children: string;
    innenEtÅr?: boolean;
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

function getAvgrensninger(): Avgrensninger {
    const iDag = new Date();

    let iMorgen = new Date();
    iMorgen.setDate(iDag.getDate() + 1);

    let omEtÅr = new Date();
    omEtÅr.setDate(iDag.getDate() + 365);

    return {
        minDato: iMorgen,
        maksDato: omEtÅr
    };
}

export default function Datovelger({dato, id, onChange, feil, children, innenEtÅr}: Props) {
    const avgrensninger: Avgrensninger | undefined = innenEtÅr ? getAvgrensninger() : undefined;
    return (
        <>
            <label htmlFor={id} className={'skjemaelement__label'}>{children}</label>
            <NavDatovelger
                dato={dato}
                id={id}
                avgrensninger={avgrensninger}
                onChange={onChange}
            />
            <Feilmelding feil={feil}/>
        </>
    );
}
