import * as React from 'react';
import { ChangeEvent } from 'react';

import Input from 'nav-frontend-skjema/lib/input';

import { Matrikkeladresse } from '../../../../../models/personadresse';
import PoststedVelger, { PoststedInformasjon } from '../../common/PoststedVelger';
import { ValideringsResultat } from '../../../../../utils/forms/FormValidator';
import { default as Datovelger, tilPeriode } from '../../../../../components/forms/Datovelger';

interface Props {
    onChange: (matrikkeladresse: Matrikkeladresse) => void;
    matrikkeladresse: Matrikkeladresse;
    validering: ValideringsResultat<Matrikkeladresse>;
}

function onPostinformasjonChange(props: Props) {
    return ({poststed, postnummer}: PoststedInformasjon) => {
        props.onChange({...props.matrikkeladresse, postnummer, poststed});
    };
}

function MatrikkeladresseForm(props: Props) {
    const {matrikkeladresse, validering} = props;
    const {postnummer, poststed} = matrikkeladresse;
    const gyldigTil = props.matrikkeladresse.periode ? new Date(props.matrikkeladresse.periode.til) : undefined;

    return (
        <>
            <Input
                bredde={'XXL'}
                label="Merkes med C/O"
                value={matrikkeladresse.tilleggsadresse || ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...props.matrikkeladresse, tilleggsadresse: event.target.value})}
            />
            <Input
                bredde={'XXL'}
                label="Områdeadresse"
                value={props.matrikkeladresse.eiendomsnavn || ''}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    props.onChange({...props.matrikkeladresse, eiendomsnavn: event.target.value})}
                feil={validering.felter.eiendomsnavn ? validering.felter.eiendomsnavn.skjemafeil : undefined}

            />
            <PoststedVelger
                poststedInformasjon={{postnummer, poststed}}
                onChange={onPostinformasjonChange(props)}
                feil={props.validering.felter.postnummer.skjemafeil}
            />
            <Datovelger
                id={'postboksadresse-gyldig-til'}
                onChange={(date: Date) => props.onChange({...matrikkeladresse, periode: tilPeriode(date)})}
                dato={gyldigTil}
                innenEtÅr={true}
                feil={validering.felter.periode ? validering.felter.periode.skjemafeil : undefined}
            >
                Gyldig til
            </Datovelger>
        </>
    );
}

export default MatrikkeladresseForm;
