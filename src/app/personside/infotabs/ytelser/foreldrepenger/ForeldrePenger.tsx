import * as React from 'react';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import ForeldrepengePeriode from './ForeldrepengePeriode';
import Oversikt from './Oversikt';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface Props {
    foreldrepenger: Foreldrepengerettighet | null;
}

function Foreldrepenger({foreldrepenger}: Props) {

    if (foreldrepenger === null) {
        return <AlertStripeAdvarsel>Finner ikke foreldrepengerettighet</AlertStripeAdvarsel>;
    }

    const perioder = foreldrepenger.periode
        .map((periode, index) => <ForeldrepengePeriode key={index} periode={periode}/>);

    return (
        <article>
            <Oversikt foreldrePenger={foreldrepenger}/>
            <ul>
                {perioder}
            </ul>
        </article>
    );
}

export default Foreldrepenger;
