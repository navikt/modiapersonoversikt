import * as React from 'react';
import styled from 'styled-components';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import theme from '../../../../styles/personOversiktTheme';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import useBrukersYtelser from './useBrukersYtelser';
import PleiepengerEkspanderbartpanel from './pleiepenger/PleiepengerEkspanderbartPanel';
import SykepengerEkspanderbartpanel from './sykepenger/SykepengerEkspanderbartPanel';
import ForeldrepengerEkspanderbartpanel from './foreldrepenger/ForeldrepengerEkspanderbartPanel';

const Styling = styled.section`
    > * {
        margin-bottom: 0.5rem;
    }
    ${theme.resetEkspanderbartPanelStyling};
`;

function YtelserContainer() {
    const { ytelser, pending } = useBrukersYtelser({
        pleiepengerKomponent: (pleiepenger, key) => (
            <PleiepengerEkspanderbartpanel pleiepenger={pleiepenger} key={key} />
        ),
        sykepengerKomponent: (sykepenger, key) => <SykepengerEkspanderbartpanel sykepenger={sykepenger} key={key} />,
        foreldrepengerKomponent: (foreldrepenger, key) => (
            <ForeldrepengerEkspanderbartpanel foreldrepenger={foreldrepenger} key={key} />
        )
    });

    return (
        <Styling>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Ytelser" />}
            {ytelser}
            {!pending && ytelser.length === 0 && <AlertStripeInfo>Ingen ytelser funnet for bruker</AlertStripeInfo>}
            {pending && <CenteredLazySpinner />}
        </Styling>
    );
}

export default YtelserContainer;
