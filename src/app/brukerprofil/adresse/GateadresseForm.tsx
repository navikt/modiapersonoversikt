import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';

import { Gateadresse } from '../../../models/personadresse';
import PoststedVelger, { PoststedInformasjon } from './PoststedVelger';

interface Props {
    onChange: (gateadresse: Gateadresse) => void;
    gateadresse: Gateadresse;
}

const InputLinje = styled.div`
  display: flex;
`;

function onPostinformasjonChange(props: Props) {
    return ({poststed, postnummer}: PoststedInformasjon) => {
        props.onChange({...props.gateadresse, postnummer, poststed});
    };
}

function GateadresseForm(props: Props) {

    const {postnummer, poststed} = props.gateadresse;

    return (
        <>
            <Input
                bredde={'XXL'}
                label="Merkes med C/O"
                defaultValue={props.gateadresse.tilleggsadresse}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...props.gateadresse, tilleggsadresse: event.target.value})}
            />
            <InputLinje>
                <div style={{flex: 4, marginRight: 15}} >
                    <Input
                        bredde={'XXL'}
                        label="Gateadresse"
                        defaultValue={props.gateadresse.gatenavn}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.onChange({...props.gateadresse, gatenavn: event.target.value})}
                    />
                </div>
                <Input
                    bredde={'S'}
                    label="Husnummer"
                    defaultValue={props.gateadresse.husnummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...props.gateadresse, husnummer: event.target.value})}
                />
                <Input
                    bredde={'S'}
                    label="Husbokstav"
                    defaultValue={props.gateadresse.husbokstav}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...props.gateadresse, husbokstav: event.target.value})}
                />
                <Input
                    bredde={'S'}
                    label="Bolignummer"
                    defaultValue={props.gateadresse.bolignummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...props.gateadresse, bolignummer: event.target.value})}
                />
            </InputLinje>
            <PoststedVelger poststedInformasjon={{postnummer, poststed}} onChange={onPostinformasjonChange(props)} />
        </>
    );
}

export default GateadresseForm;