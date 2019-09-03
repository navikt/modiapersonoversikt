import * as React from 'react';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import ForeldrepengePeriode from './ForeldrepengePeriode';
import Oversikt from './Oversikt';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import VisuallyHiddenAutoFokusHeader from '../../../../../components/VisuallyHiddenAutoFokusHeader';
import { erModiabrukerdialog } from '../../../../../utils/erNyPersonoversikt';

interface Props {
    foreldrepenger: Foreldrepengerettighet | null;
}

function Foreldrepenger({ foreldrepenger }: Props) {
    if (foreldrepenger === null) {
        return <AlertStripeAdvarsel>Finner ikke foreldrepengerettighet</AlertStripeAdvarsel>;
    }

    const perioder = foreldrepenger.periode.map((periode, index) => (
        <ForeldrepengePeriode key={index} periode={periode} periodenr={index + 1} />
    ));

    return (
        <article>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Foreldrepengerettighet" />}
            <Oversikt foreldrePenger={foreldrepenger} />
            <ol>{perioder}</ol>
        </article>
    );
}

export default Foreldrepenger;
