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
    const adresseGyldigTil = gateadresse.periode ? new Date(gateadresse.periode.til) : undefined;

    return (
        <>
            <Input
                bredde={'XXL'}
                label="Merkes med C/O"
                value={gateadresse.tilleggsadresse || ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...gateadresse, tilleggsadresse: event.target.value})}
            />
            <InputLinje>
                <div style={{flex: 4, marginRight: 15}} >
                    <Input
                        bredde={'XXL'}
                        label="Gateadresse"
                        value={gateadresse.gatenavn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.onChange({...gateadresse, gatenavn: event.target.value})}
                        feil={validering.felter.gatenavn.skjemafeil}
                    />
                </div>
                <Input
                    bredde={'S'}
                    label="Husnummer"
                    value={gateadresse.husnummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...gateadresse, husnummer: event.target.value})}
                    feil={validering.felter.husnummer.skjemafeil}
                />
                <Input
                    bredde={'S'}
                    label="Husbokstav"
                    value={gateadresse.husbokstav || ''}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...gateadresse, husbokstav: event.target.value})}
                />
                <Input
                    bredde={'S'}
                    label="Bolignummer"
                    value={gateadresse.bolignummer || ''}
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
                innenEtÅr={true}
                onChange={(date: Date) => props.onChange({...gateadresse, periode: tilPeriode(date)})}
                feil={validering.felter.periode ? validering.felter.periode.skjemafeil : undefined}
            >
                Gyldig til
            </Datovelger>
        </>
    );
}

export default GateadresseForm;