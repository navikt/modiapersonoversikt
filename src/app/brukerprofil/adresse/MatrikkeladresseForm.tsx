import * as React from 'react';
import { ChangeEvent } from 'react';

import Input from 'nav-frontend-skjema/lib/input';

import { Matrikkeladresse } from '../../../models/personadresse';
import PoststedVelger, { PoststedInformasjon } from './PoststedVelger';

interface Props {
    onChange: (matrikkeladresse: Matrikkeladresse) => void;
    matrikkeladresse: Matrikkeladresse;
}

function onPostinformasjonChange(props: Props) {
    return ({poststed, postnummer}: PoststedInformasjon) => {
        props.onChange({...props.matrikkeladresse, postnummer, poststed});
    };
}

function MatrikkeladresseForm(props: Props) {

    const {postnummer, poststed} = props.matrikkeladresse;

    return (
        <>
            <Input
                bredde={'XXL'}
                label="Merkes med C/O"
                defaultValue={props.matrikkeladresse.tilleggsadresse}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...props.matrikkeladresse, tilleggsadresse: event.target.value})}
            />
            <Input
                bredde={'XXL'}
                label="Områdeadresse"
                defaultValue={props.matrikkeladresse.eiendomsnavn}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...props.matrikkeladresse, eiendomsnavn: event.target.value})}
            />
            <PoststedVelger poststedInformasjon={{postnummer, poststed}} onChange={onPostinformasjonChange(props)} />
        </>
    );
}

export default MatrikkeladresseForm;