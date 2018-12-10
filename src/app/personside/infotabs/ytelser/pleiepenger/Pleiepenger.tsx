import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import Pleiepengerperiode from './Pleiepengerperiode';
import Oversikt from './Oversikt';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

function Pleiepenger(props: Props) {

    return (
        <>
            <Oversikt pleiepenger={props.pleiepenger}/>
            <ol>
                {props.pleiepenger.perioder.map((periode, index) =>
                    <Pleiepengerperiode key={index} periode={periode}/>
                )}
            </ol>
        </>
    );
}

export default Pleiepenger;
