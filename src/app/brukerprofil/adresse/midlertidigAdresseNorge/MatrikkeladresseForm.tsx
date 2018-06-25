import * as React from 'react';
import { ChangeEvent } from 'react';

import Input from 'nav-frontend-skjema/lib/input';
import Datovelger from 'nav-datovelger';

import { Matrikkeladresse } from '../../../../models/personadresse';
import PoststedVelger, { PoststedInformasjon } from '../common/PoststedVelger';

interface Props {
    onChange: (matrikkeladresse: Matrikkeladresse) => void;
    matrikkeladresse: Matrikkeladresse;
}

function onPostinformasjonChange(props: Props) {
    return ({poststed, postnummer}: PoststedInformasjon) => {
        props.onChange({...props.matrikkeladresse, postnummer, poststed});
    };
}

function onGyldigTilChange(props: Props) {
    return (gyldigTil: Date) => {
        const periode = { fra: new Date().toISOString(), til: gyldigTil.toISOString()};
        props.onChange({...props.matrikkeladresse, periode});
    };
}

function MatrikkeladresseForm(props: Props) {

    const {postnummer, poststed} = props.matrikkeladresse;
    const gyldigTil = props.matrikkeladresse.periode ? new Date(props.matrikkeladresse.periode.til) : new Date();

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
          
            <label className={'skjemaelement__label'}>Gyldig til</label>
            <Datovelger
                dato={gyldigTil}
                id={'matrikkeladresse-datovelger'}
                onChange={onGyldigTilChange(props)}
            />
        </>
    );
}

export default MatrikkeladresseForm;
