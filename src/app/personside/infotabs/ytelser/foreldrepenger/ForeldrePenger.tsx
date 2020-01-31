import * as React from 'react';
import { useRef } from 'react';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import ForeldrepengePeriode from './ForeldrepengePeriode';
import Oversikt from './Oversikt';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import VisuallyHiddenAutoFokusHeader from '../../../../../components/VisuallyHiddenAutoFokusHeader';
import { erModiabrukerdialog } from '../../../../../utils/erNyPersonoversikt';
import { useOnMount } from '../../../../../utils/customHooks';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { guid } from 'nav-frontend-js-utils';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';

interface Props {
    foreldrepenger: Foreldrepengerettighet | null;
}

const StyledArticle = styled.article`
    ${theme.hvittPanel};
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
        <StyledArticle aria-labelledby={titleId.current}>
            <h2 tabIndex={-1} className="sr-only" id={titleId.current}>
                Foreldrepengerettighet
            </h2>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Foreldrepengerettighet" />}
            <Oversikt foreldrePenger={foreldrepenger} />
            <ol>{perioder}</ol>
        </StyledArticle>
    );
}

export default Foreldrepenger;
