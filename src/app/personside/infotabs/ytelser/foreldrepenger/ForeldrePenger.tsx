import * as React from 'react';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import ForeldrepengePeriode from './ForeldrepengePeriode';
import Oversikt from './Oversikt';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import VisuallyHiddenAutoFokusHeader from '../../../../../components/VisuallyHiddenAutoFokusHeader';
import { erModiabrukerdialog } from '../../../../../utils/erNyPersonoversikt';
import { useOnMount } from '../../../../../utils/customHooks';
import { loggEvent } from '../../../../../utils/frontendLogger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    foreldrepenger: Foreldrepengerettighet | null;
}

const StyledArticle = styled.article`
    ${theme.hvittPanel};
`;

function Foreldrepenger({ foreldrepenger }: Props) {
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
        <StyledArticle>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Foreldrepengerettighet" />}
            <Oversikt foreldrePenger={foreldrepenger} />
            <ol>{perioder}</ol>
        </StyledArticle>
    );
}

export default Foreldrepenger;
