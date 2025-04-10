import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { useRef } from 'react';
import type { Foreldrepengerettighet } from 'src/models/ytelse/foreldrepenger';
import { useOnMount } from 'src/utils/customHooks';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import styled from 'styled-components';
import ForeldrepengePeriode from './ForeldrepengePeriode';
import Oversikt from './Oversikt';

interface Props {
    foreldrepenger: Foreldrepengerettighet | null;
}

const StyledPanel = styled(Panel)`
    padding: 0rem;
`;

function Foreldrepenger({ foreldrepenger }: Props) {
    const titleId = useRef(guid());
    useOnMount(() => {
        loggEvent('Visning', 'Foreldrepenger');
    });

    if (foreldrepenger === null) {
        return <AlertStripeAdvarsel>Finner ikke foreldrepengerettighet</AlertStripeAdvarsel>;
    }

    const perioder = foreldrepenger.periode.map((periode, index) => (
        <ForeldrepengePeriode key={index} periode={periode} periodenr={index + 1} />
    ));

    return (
        <article>
            <StyledPanel aria-labelledby={titleId.current}>
                <h2 tabIndex={-1} className="sr-only" id={titleId.current}>
                    Foreldrepengerettighet
                </h2>
                <Oversikt foreldrePenger={foreldrepenger} />
                <ol>{perioder}</ol>
            </StyledPanel>
        </article>
    );
}

export default Foreldrepenger;
