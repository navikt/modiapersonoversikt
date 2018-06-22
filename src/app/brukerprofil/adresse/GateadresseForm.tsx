import * as React from 'react';
import styled from 'styled-components';

import Datovelger from 'nav-datovelger';

import PoststedVelger from './PoststedVelger';
import { formaterTilISO8601Date } from '../../../utils/dateUtils';
import { Skjemainput } from './InputFelt';
import { Gateadresse } from '../../../models/personadresse';
import { defaultSkjemainput, stringTilSkjemainput, validatorer } from '../formUtils';

interface Props {
    onChange: (partial: Partial<GateadresseSkjemainput>) => void;
    gateadresse: GateadresseSkjemainput;
}

export interface GateadresseSkjemainput {
    gatenavn: Skjemainput;
    postnummer: Skjemainput;
    gyldigTil: Skjemainput;
    tilleggsadresse: Skjemainput;
    husnummer: Skjemainput;
    husbokstav: Skjemainput;
    bolignummer: Skjemainput;
}

export function getOrDefaultGateadresse(gateadresse?: Gateadresse): GateadresseSkjemainput {
    if (!gateadresse) {
        return {
            gatenavn: defaultSkjemainput,
            postnummer: defaultSkjemainput,
            gyldigTil: defaultSkjemainput,
            tilleggsadresse: defaultSkjemainput,
            husnummer: defaultSkjemainput,
            husbokstav: defaultSkjemainput,
            bolignummer: defaultSkjemainput,
        };
    }
    const gyldigTil = gateadresse.periode ? gateadresse.periode.til : formaterTilISO8601Date(new Date());
    return {
        gatenavn: stringTilSkjemainput(gateadresse.gatenavn),
        postnummer: stringTilSkjemainput(gateadresse.postnummer),
        gyldigTil: stringTilSkjemainput(gyldigTil),
        tilleggsadresse: stringTilSkjemainput(gateadresse.tilleggsadresse),
        husnummer: stringTilSkjemainput(gateadresse.husnummer),
        bolignummer: stringTilSkjemainput(gateadresse.bolignummer),
        husbokstav: stringTilSkjemainput(gateadresse.husbokstav)
    };
}

const InputLinje = styled.div`
  display: flex;
`;

function GateadresseForm(props: Props) {
    const {onChange} = props;
    const gyldigTilDate = new Date(props.gateadresse.gyldigTil.value);

    return (
        <>
            <Skjemainput
                bredde={'XXL'}
                label="Merkes med C/O"
                skjemainput={props.gateadresse.tilleggsadresse}
                onSkjemainput={(tilleggsadresse) => onChange({tilleggsadresse})}
            />
            <InputLinje>
                <div style={{flex: 4, marginRight: 15}} >
                    <Skjemainput
                        bredde={'XXL'}
                        label="Gateadresse"
                        skjemainput={props.gateadresse.gatenavn}
                        validatorer={[validatorer.erIkkeTomStreng]}
                        onSkjemainput={(gatenavn) => onChange({gatenavn})}
                    />
                </div>
                <Skjemainput
                    bredde={'S'}
                    label="Husnummer"
                    skjemainput={props.gateadresse.husnummer}
                    onSkjemainput={(husnummer) => onChange({husnummer})}
                />
                <Skjemainput
                    bredde={'S'}
                    label="Husbokstav"
                    skjemainput={props.gateadresse.husbokstav}
                    onSkjemainput={(husbokstav) => onChange({husbokstav})}
                />
                <Skjemainput
                    bredde={'S'}
                    label="Bolignummer"
                    skjemainput={props.gateadresse.bolignummer}
                    onSkjemainput={(bolignummer) => onChange({bolignummer})}
                />
            </InputLinje>
            <PoststedVelger
                postnummer={props.gateadresse.postnummer}
                onChange={(postnummer) => onChange({postnummer})}
            />
            <>
                <label className={'skjemaelement__label'}>Gyldig til</label>
                <Datovelger
                    dato={gyldigTilDate}
                    id={'gateform-datovelger'}
                    onChange={(date) => onChange({gyldigTil: {
                        value: formaterTilISO8601Date(date), skjemafeil: []
                    }})}
                />
            </>
        </>
    );
}

export default GateadresseForm;