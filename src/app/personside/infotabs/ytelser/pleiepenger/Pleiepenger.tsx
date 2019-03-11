import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import Pleiepengerperiode from './Pleiepengerperiode';
import Oversikt from './Oversikt';
import { genericAscendingDateComparator } from '../../../../../utils/dateUtils';
import VisuallyHiddenAutoFokusHeader from '../../../../../components/VisuallyHiddenAutoFokusHeader';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

function Pleiepenger(props: Props) {
    const sortertePerioder = props.pleiepenger.perioder.sort(genericAscendingDateComparator(p => p.fom)).reverse();

    return (
        <article>
            <VisuallyHiddenAutoFokusHeader tittel="Pleiepengerettighet" />
            <Oversikt pleiepenger={props.pleiepenger} />
            <ol>
                {sortertePerioder.map((periode, index) => (
                    <Pleiepengerperiode periodeNummer={sortertePerioder.length - index} key={index} periode={periode} />
                ))}
            </ol>
        </article>
    );
}

export default Pleiepenger;
