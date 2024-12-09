import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { useRef } from 'react';
import styled from 'styled-components';
import type { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import { useOnMount } from '../../../../../utils/customHooks';
import { datoStigende } from '../../../../../utils/date-utils';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import Oversikt from './Oversikt';
import Pleiepengerperiode from './Pleiepengerperiode';

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
