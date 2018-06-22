import * as React from 'react';

import Datovelger from 'nav-datovelger';

import PoststedVelger from './PoststedVelger';
import { Skjemainput } from './InputFelt';
import { formaterTilISO8601Date } from '../../../utils/dateUtils';
import { Matrikkeladresse } from '../../../models/personadresse';
import { defaultSkjemainput, stringTilSkjemainput } from '../formUtils';

interface Props {
    onChange: (matrikkeladresse: Partial<MatrikkeladresseSkjemainput>) => void;
    matrikkeladresse: MatrikkeladresseSkjemainput;
}

export interface MatrikkeladresseSkjemainput {
    postnummer: Skjemainput;
    gyldigTil: Skjemainput;
    tilleggsadresse: Skjemainput;
    eiendomsnavn: Skjemainput;
}

export function getOrDefaultMatrikkeladresse(matrikkeladresse?: Matrikkeladresse): MatrikkeladresseSkjemainput {
    if (!matrikkeladresse) {
        return {
            postnummer: defaultSkjemainput,
            gyldigTil: defaultSkjemainput,
            tilleggsadresse: defaultSkjemainput,
            eiendomsnavn: defaultSkjemainput
        };
    }

    const gyldigTil = matrikkeladresse.periode ? matrikkeladresse.periode.til : formaterTilISO8601Date(new Date());
    return {
        postnummer: stringTilSkjemainput(matrikkeladresse.postnummer),
        gyldigTil: stringTilSkjemainput(gyldigTil),
        tilleggsadresse: stringTilSkjemainput(matrikkeladresse.tilleggsadresse),
        eiendomsnavn: stringTilSkjemainput(matrikkeladresse.eiendomsnavn)
    };
}

function MatrikkeladresseForm(props: Props) {
    const {onChange} = props;
    const gyldigTilDate = new Date(props.matrikkeladresse.gyldigTil.value);

    return (
        <>
            <Skjemainput
                bredde={'XXL'}
                label="Merkes med C/O"
                skjemainput={props.matrikkeladresse.tilleggsadresse}
                onSkjemainput={(tilleggsadresse) => onChange({tilleggsadresse})}
            />
            <Skjemainput
                bredde={'XXL'}
                label="Områdeadresse"
                skjemainput={props.matrikkeladresse.eiendomsnavn}
                onSkjemainput={(eiendomsnavn) => onChange({eiendomsnavn})}
            />
            <PoststedVelger
                postnummer={props.matrikkeladresse.postnummer}
                onChange={(postnummer) => onChange({postnummer})}
            />

            <label className={'skjemaelement__label'}>Gyldig til</label>
            <Datovelger
                dato={gyldigTilDate}
                id={'matrikkeladresse-datovelger'}
                onChange={(date) => onChange({gyldigTil: {
                        value: formaterTilISO8601Date(date), skjemafeil: []
                    }})}
            />
        </>
    );
}

export default MatrikkeladresseForm;
