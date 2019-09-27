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
import { getUnikPleiepengerKey } from '../../../../models/ytelse/pleiepenger';
import { getUnikSykepengerKey } from '../../../../models/ytelse/sykepenger';
import { getUnikForeldrepengerKey } from '../../../../models/ytelse/foreldrepenger';

const Styling = styled.section`
    > * {
        margin-bottom: 0.5rem;
    }
    ${theme.resetEkspanderbartPanelStyling};
    padding: ${theme.margin.layout};
`;

function YtelserContainer() {
    const { ytelser, pending, feilmeldinger } = useBrukersYtelser({
        renderPleiepenger: pleiepenger => (
            <PleiepengerEkspanderbartpanel pleiepenger={pleiepenger} key={getUnikPleiepengerKey(pleiepenger)} />
        ),
        renderSykepenger: sykepenger => (
            <SykepengerEkspanderbartpanel sykepenger={sykepenger} key={getUnikSykepengerKey(sykepenger)} />
        ),
        renderForeldrepenger: foreldrepenger => (
            <ForeldrepengerEkspanderbartpanel
                foreldrepenger={foreldrepenger}
                key={getUnikForeldrepengerKey(foreldrepenger)}
            />
        )
    });

    return (
        <Styling>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Ytelser" />}
            {ytelser}
            {feilmeldinger}
            {!pending && feilmeldinger.length === 0 && ytelser.length === 0 && (
                <AlertStripeInfo>Ingen ytelser funnet for bruker</AlertStripeInfo>
            )}
            {pending && <CenteredLazySpinner />}
        </Styling>
    );
}

export default YtelserContainer;
