import * as React from 'react';
import styled from 'styled-components/macro';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import theme from '../../../../styles/personOversiktTheme';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import useBrukersYtelserMarkup from './useBrukersYtelserMarkup';
import { getUnikPleiepengerKey } from '../../../../models/ytelse/pleiepenger';
import { getUnikSykepengerKey } from '../../../../models/ytelse/sykepenger';
import { getUnikForeldrepengerKey } from '../../../../models/ytelse/foreldrepenger';
import Pleiepenger from './pleiepenger/Pleiepenger';
import Sykepenger from './sykepenger/Sykepenger';
import Foreldrepenger from './foreldrepenger/ForeldrePenger';
import { useInfotabsDyplenker } from '../dyplenker';
import useBrukersYtelser, { Ytelse } from './useBrukersYtelser';

const Styling = styled.section`
    > * {
        margin-bottom: 0.5rem;
    }
    ${theme.resetEkspanderbartPanelStyling};
    padding: ${theme.margin.layout};
`;

function ValgtYtelse() {
    let førstValgt: Ytelse | '';
    const { ytelserSortert, pendingYtelser } = useBrukersYtelser();
    const dypLinker = useInfotabsDyplenker();

    if (dypLinker.ytelser.erQueryParamNull()) {
        console.log('erQueryParamNull treff');
        førstValgt = ytelserSortert[0];
    }

    const { ytelser, pending, feilmeldinger } = useBrukersYtelserMarkup({
        renderPleiepenger: pleiepenger =>
            dypLinker.ytelser.erValgt(getUnikPleiepengerKey(pleiepenger)) || førstValgt === pleiepenger ? (
                <Pleiepenger pleiepenger={pleiepenger} key={getUnikPleiepengerKey(pleiepenger)} />
            ) : null,
        renderSykepenger: sykepenger =>
            dypLinker.ytelser.erValgt(getUnikSykepengerKey(sykepenger)) || førstValgt === sykepenger ? (
                <Sykepenger sykepenger={sykepenger} key={getUnikSykepengerKey(sykepenger)} />
            ) : null,
        renderForeldrepenger: foreldrepenger =>
            dypLinker.ytelser.erValgt(getUnikForeldrepengerKey(foreldrepenger)) || førstValgt === foreldrepenger ? (
                <Foreldrepenger foreldrepenger={foreldrepenger} key={getUnikForeldrepengerKey(foreldrepenger)} />
            ) : null
    });

    return (
        <Styling>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Ytelser" />}
            {ytelser}
            {feilmeldinger}
            {!pending && !pendingYtelser && feilmeldinger.length === 0 && ytelser.length === 0 && (
                <AlertStripeInfo>Ingen ytelser funnet for bruker</AlertStripeInfo>
            )}
            {pending && <CenteredLazySpinner />}
        </Styling>
    );
}

export default ValgtYtelse;
