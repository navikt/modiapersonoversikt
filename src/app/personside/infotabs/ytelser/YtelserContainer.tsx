import * as React from 'react';
import styled from 'styled-components/macro';
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
import { Ytelse } from './Ytelser';

interface Props {
    valgtYtelse: Ytelse;
}

const Styling = styled.section`
    > * {
        margin-bottom: 0.5rem;
    }
    ${theme.resetEkspanderbartPanelStyling};
    padding: ${theme.margin.layout};
`;

function YtelserContainer(props: Props) {
    const { ytelser, pending, feilmeldinger } = useBrukersYtelser({
        renderPleiepenger: pleiepenger =>
            pleiepenger === props.valgtYtelse ? (
                <PleiepengerEkspanderbartpanel pleiepenger={pleiepenger} key={getUnikPleiepengerKey(pleiepenger)} />
            ) : null,
        renderSykepenger: sykepenger =>
            sykepenger === props.valgtYtelse ? (
                <SykepengerEkspanderbartpanel sykepenger={sykepenger} key={getUnikSykepengerKey(sykepenger)} />
            ) : null,
        renderForeldrepenger: foreldrepenger =>
            foreldrepenger === props.valgtYtelse ? (
                <ForeldrepengerEkspanderbartpanel
                    foreldrepenger={foreldrepenger}
                    key={getUnikForeldrepengerKey(foreldrepenger)}
                />
            ) : null
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
