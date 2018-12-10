import * as React from 'react';
import { ForeldrepengerResponse } from '../../../../../models/ytelse/foreldrepenger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import ForeldrepengePeriode from './ForeldrepengePeriode';
import Oversikt from './Oversikt';

interface Props {
    foreldrePengerResponse: ForeldrepengerResponse;
}

function Foreldrepenger(props: Props) {

    const foreldrepenger = props.foreldrePengerResponse.foreldrepenger;

    if (foreldrepenger === null) {
        return <AlertStripeInfo>Finner ingen foreldrepengerettigheter for bruker</AlertStripeInfo>;
    }

    const perioder = foreldrepenger.periode.map((periode, index) =>
        <ForeldrepengePeriode key={index} periode={periode}/>
    );

    return (
        <>
            <Oversikt foreldrePenger={foreldrepenger}/>
            <ul>
                {perioder}
            </ul>
        </>
    );
}

export default Foreldrepenger;
