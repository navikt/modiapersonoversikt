import { useRef } from 'react';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import ForeldrepengePeriode from './ForeldrepengePeriode';
import Oversikt from './Oversikt';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { useOnMount } from '../../../../../utils/customHooks';
import { guid } from 'nav-frontend-js-utils';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import Panel from 'nav-frontend-paneler';
import styled from 'styled-components';

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
