import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';

import { Postboksadresse } from '../../../../../models/personadresse';
import PoststedVelger, { PoststedInformasjon } from '../../common/PoststedVelger';
import { AdresseFormInput } from '../MidlertidigAdresseNorge';
import Datovelger from '../../../../../components/forms/Datovelger';

interface Props {
    onChange: (postboksadresse: Postboksadresse) => void;
    input: AdresseFormInput<Postboksadresse>;
}

const InputLinje = styled.div`
  display: flex;
`;

function onPostinformasjonChange(props: Props) {
    return ({poststed, postnummer}: PoststedInformasjon) => {
        props.onChange({...props.input.value, postnummer, poststed});
    };
}

function onGyldigTilChange(props: Props) {
    return (gyldigTil: Date) => {
        const periode = {fra: new Date().toISOString(), til: gyldigTil.toISOString()};
        props.onChange({...props.input.value, periode});
    };
}

function PostboksadresseForm(props: Props) {
    const postboksadresse = props.input.value;

    const gyldigTil = postboksadresse.periode ? new Date(postboksadresse.periode.til) :
        new Date();

    return (
        <>
            <Input
                bredde={'XXL'}
                label="Merkes med C/O"
                defaultValue={postboksadresse.tilleggsadresse}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...postboksadresse, tilleggsadresse: event.target.value})}
            />
            <InputLinje>
                <div style={{flex: 4, marginRight: 15}}>
                    <Input
                        bredde={'XXL'}
                        label="Postboksanlegg"
                        defaultValue={postboksadresse.postboksanlegg}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.onChange({...postboksadresse, postboksanlegg: event.target.value})}
                    />
                </div>
                <Input
                    bredde={'S'}
                    label="Postboksnummer"
                    defaultValue={postboksadresse.postboksnummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...postboksadresse, postboksnummer: event.target.value})}
                />
            </InputLinje>
            <PoststedVelger
                poststedInformasjon={{postnummer: postboksadresse.postnummer, poststed: postboksadresse.poststed}}
                onChange={onPostinformasjonChange(props)}
                feil={props.input.validering.felter.postnummer.skjemafeil}
            />

            <Datovelger
                id={'postboksadresse-gyldig-til'}
                onChange={(dato) => onGyldigTilChange(props)(dato)}
                dato={gyldigTil}
                feil={props.input.validering.felter.periode ?
                    props.input.validering.felter.periode.skjemafeil : undefined}
            >
                Gyldig til
            </Datovelger>
        </>
    );
}

export default PostboksadresseForm;