import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import Pleiepengerperiode from './Pleiepengerperiode';
import Oversikt from './Oversikt';
import { datoStigende } from '../../../../../utils/date-utils';
import { useOnMount } from '../../../../../utils/customHooks';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import styled from 'styled-components';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

const StyledPanel = styled(Panel)`
    padding: 0rem;
`;

function Pleiepenger(props: Props) {
    const titleId = useRef(guid());
    useOnMount(() => {
        loggEvent('Visning', 'Pleiepenger');
    });

    const sortertePerioder = props.pleiepenger.perioder.sort(datoStigende((p) => p.fom)).reverse();

    return (
        <article>
            <StyledPanel aria-labelledby={titleId.current}>
                <h2 className="sr-only" id={titleId.current}>
                    Pleiepengerrettighet
                </h2>
                <Oversikt pleiepenger={props.pleiepenger} />
                <ol>
                    {sortertePerioder.map((periode, index) => (
                        <Pleiepengerperiode
                            periodeNummer={sortertePerioder.length - index}
                            key={index}
                            periode={periode}
                        />
                    ))}
                </ol>
            </StyledPanel>
        </article>
    );
}

export default Pleiepenger;
