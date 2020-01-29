import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import Pleiepengerperiode from './Pleiepengerperiode';
import Oversikt from './Oversikt';
import { datoStigende } from '../../../../../utils/dateUtils';
import VisuallyHiddenAutoFokusHeader from '../../../../../components/VisuallyHiddenAutoFokusHeader';
import { erModiabrukerdialog } from '../../../../../utils/erNyPersonoversikt';
import { useOnMount } from '../../../../../utils/customHooks';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

function Pleiepenger(props: Props) {
    useOnMount(() => {
        loggEvent('Visning', 'Pleiepenger');
    });

    const sortertePerioder = props.pleiepenger.perioder.sort(datoStigende(p => p.fom)).reverse();

    return (
        <article>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Pleiepengerettighet" />}
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
