import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';
import Datovelger from 'nav-datovelger';

import { Postboksadresse } from '../../../models/personadresse';
import PoststedVelger, { PoststedInformasjon } from './PoststedVelger';

interface Props {
    onChange: (postboksadresse: Postboksadresse) => void;
    postboksadresse: Postboksadresse;
}

const InputLinje = styled.div`
  display: flex;
`;

function onPostinformasjonChange(props: Props) {
    return ({poststed, postnummer}: PoststedInformasjon) => {
        props.onChange({...props.postboksadresse, postnummer, poststed});
    };
}

function onGyldigTilChange(props: Props) {
    return (gyldigTil: Date) => {
        const periode = {fra: new Date().toISOString(), til: gyldigTil.toISOString()};
        props.onChange({...props.postboksadresse, periode});
    };
}

function PostboksadresseForm(props: Props) {

    const {postnummer, poststed} = props.postboksadresse;

    const gyldigTil = props.postboksadresse.periode ? new Date(props.postboksadresse.periode.til) : new Date();

    return (
        <>
            <Input
                bredde={'XXL'}
                label="Merkes med C/O"
                defaultValue={props.postboksadresse.tilleggsadresse}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...props.postboksadresse, tilleggsadresse: event.target.value})}
            />
            <InputLinje>
                <div style={{flex: 4, marginRight: 15}}>
                    <Input
                        bredde={'XXL'}
                        label="Postboksanlegg"
                        defaultValue={props.postboksadresse.postboksanlegg}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.onChange({...props.postboksadresse, postboksanlegg: event.target.value})}
                    />
                </div>
                <Input
                    bredde={'S'}
                    label="Postboksnummer"
                    defaultValue={props.postboksadresse.postboksnummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...props.postboksadresse, postboksnummer: event.target.value})}
                />
            </InputLinje>
            <PoststedVelger poststedInformasjon={{postnummer, poststed}} onChange={onPostinformasjonChange(props)}/>

            <>
                <label className={'skjemaelement__label'}>Gyldig til</label>
                <Datovelger
                    dato={gyldigTil}
                    id={'postboksadressegyldigtil'}
                    onChange={onGyldigTilChange(props)}
                />
            </>
        </>
    );
}

export default PostboksadresseForm;