import * as React from 'react';
import styled from 'styled-components';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import theme from '../../../../styles/personOversiktTheme';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import useBrukersYtelser from './useBrukersYtelser';

const Styling = styled.section`
    > * {
        margin-bottom: 0.5rem;
    }
    ${theme.resetEkspanderbartPanelStyling};
`;

function YtelserContainer() {
    const { rettigheter, pending } = useBrukersYtelser();

    return (
        <Styling>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Ytelser" />}
            {rettigheter}
            {!pending && rettigheter.length === 0 && <AlertStripeInfo>Ingen ytelser funnet for bruker</AlertStripeInfo>}
            {pending && <CenteredLazySpinner />}
        </Styling>
    );
}

export default YtelserContainer;
