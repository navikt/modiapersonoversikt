import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';
import { default as PoststedVelger, PoststedInformasjon } from '../../common/PoststedVelger';
import { Gateadresse } from '../../../../../models/personadresse';
import { AdresseFormInput } from '../MidlertidigAdresseNorge';
import Datovelger, { tilPeriode } from '../../../../../components/forms/Datovelger';

interface Props {
    onChange: (gateadresse: Gateadresse) => void;
    input: AdresseFormInput<Gateadresse>;
}

const InputLinje = styled.div`
  display: flex;
`;

function onPostinformasjonChange(props: Props) {
    return ({poststed, postnummer}: PoststedInformasjon) => {
        props.onChange({...props.input.value, postnummer, poststed});
    };
}

function GateadresseForm(props: Props) {
    const gateadresse = props.input.value;
    const validering = props.input.validering;
    const adresseGyldigTil = gateadresse.periode ? new Date(gateadresse.periode.til) : new Date();

    return (
        <>
            <Input
                bredde={'XXL'}
                label="Merkes med C/O"
                defaultValue={gateadresse.tilleggsadresse}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...gateadresse, tilleggsadresse: event.target.value})}
            />
            <InputLinje>
                <div style={{flex: 4, marginRight: 15}} >
                    <Input
                        bredde={'XXL'}
                        label="Gateadresse"
                        defaultValue={gateadresse.gatenavn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.onChange({...gateadresse, gatenavn: event.target.value})}
                        feil={validering.felter.gatenavn.skjemafeil}
                    />
                </div>
                <Input
                    bredde={'S'}
                    label="Husnummer"
                    defaultValue={gateadresse.husnummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...gateadresse, husnummer: event.target.value})}
                />
                <Input
                    bredde={'S'}
                    label="Husbokstav"
                    defaultValue={gateadresse.husbokstav}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...gateadresse, husbokstav: event.target.value})}
                />
                <Input
                    bredde={'S'}
                    label="Bolignummer"
                    defaultValue={gateadresse.bolignummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...gateadresse, bolignummer: event.target.value})}
                />
            </InputLinje>
            <PoststedVelger
                poststedInformasjon={{postnummer: gateadresse.postnummer, poststed: gateadresse.poststed}}
                onChange={onPostinformasjonChange(props)}
                feil={validering.felter.postnummer.skjemafeil}
            />
            <Datovelger
                dato={adresseGyldigTil}
                id={'gateform-datovelger'}
                onChange={(date: Date) => props.onChange({...gateadresse, periode: tilPeriode(date)})}
                feil={validering.felter.periode ? validering.felter.periode.skjemafeil : undefined}
            >
                Gyldig til
            </Datovelger>
        </>
    );
}

export default GateadresseForm;