import * as React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from 'nav-frontend-skjema/lib/input';

import { Postboksadresse } from '../../../../../models/personadresse';
import PoststedVelger, { PoststedInformasjon } from '../../common/PoststedVelger';
import { AdresseFormInput } from '../MidlertidigAdresseNorge';
import Datovelger, { tilPeriode } from '../../../../../components/forms/Datovelger';

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

function PostboksadresseForm(props: Props) {
    const postboksadresse = props.input.value;

    const gyldigTil = postboksadresse.periode ? new Date(postboksadresse.periode.til) : undefined;

    return (
        <>
            <Input
                bredde={'XXL'}
                label="Merkes med C/O"
                value={postboksadresse.tilleggsadresse || ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...postboksadresse, tilleggsadresse: event.target.value})}
            />
            <InputLinje>
                <div style={{flex: 4, marginRight: 15}}>
                    <Input
                        bredde={'XXL'}
                        label="Postboksanlegg"
                        value={postboksadresse.postboksanlegg || ''}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.onChange({...postboksadresse, postboksanlegg: event.target.value})}
                    />
                </div>
                <Input
                    bredde={'S'}
                    label="Postboksnummer"
                    value={postboksadresse.postboksnummer}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        props.onChange({...postboksadresse, postboksnummer: event.target.value})}
                    feil={props.input.validering.felter.postboksnummer.skjemafeil}
                />
            </InputLinje>
            <PoststedVelger
                poststedInformasjon={{postnummer: postboksadresse.postnummer, poststed: postboksadresse.poststed}}
                onChange={onPostinformasjonChange(props)}
                feil={props.input.validering.felter.postnummer.skjemafeil}
            />

            <Datovelger
                id={'postboksadresse-gyldig-til'}
                onChange={(date: Date) => props.onChange({...postboksadresse, periode: tilPeriode(date)})}
                dato={gyldigTil}
                innenEtÅr={true}
                feil={props.input.validering.felter.periode ?
                    props.input.validering.felter.periode.skjemafeil : undefined}
            >
                Gyldig til
            </Datovelger>
        </>
    );
}

export default PostboksadresseForm;