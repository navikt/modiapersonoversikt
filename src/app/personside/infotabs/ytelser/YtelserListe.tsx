import useBrukersYtelserMarkup from './useBrukersYtelserMarkup';
import { getPleiepengerIdDato, getUnikPleiepengerKey } from '../../../../models/ytelse/pleiepenger';
import { getSykepengerIdDato, getUnikSykepengerKey } from '../../../../models/ytelse/sykepenger';
import { getForeldepengerIdDato, getUnikForeldrepengerKey } from '../../../../models/ytelse/foreldrepenger';
import * as React from 'react';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { formaterDato } from '../../../../utils/stringFormatting';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import { useInfotabsDyplenker } from '../dyplenker';
import useBrukersYtelser, { Ytelse } from './useBrukersYtelser';

const Styling = styled.section`
    ${theme.hvittPanel};
    padding: ${theme.margin.layout};
`;

const YtelserListeStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

function YtelseListe() {
    let førstValgt: Ytelse | '';
    const { ytelserSortert, pendingYtelser } = useBrukersYtelser();
    const dypLinker = useInfotabsDyplenker();

    if (dypLinker.ytelser.erQueryParamNull()) {
        console.log('erQueryParamNull treff');
        førstValgt = ytelserSortert[0];
    }

    const { ytelser, pending, feilmeldinger } = useBrukersYtelserMarkup({
        renderPleiepenger: pleiepenger => (
            <VisMerKnapp
                key={getUnikPleiepengerKey(pleiepenger)}
                ariaDescription="Vis pleiepenger"
                valgt={dypLinker.ytelser.erValgt(getUnikPleiepengerKey(pleiepenger)) || førstValgt === pleiepenger}
                linkTo={dypLinker.ytelser.link(getUnikPleiepengerKey(pleiepenger))}
            >
                <Undertittel>Pleiepenger sykt barn</Undertittel>
                <Element>ID-dato</Element>
                <Normaltekst>{formaterDato(getPleiepengerIdDato(pleiepenger))}</Normaltekst>
            </VisMerKnapp>
        ),
        renderSykepenger: sykepenger => (
            <VisMerKnapp
                key={getUnikSykepengerKey(sykepenger)}
                ariaDescription="Vis sykepenger"
                valgt={dypLinker.ytelser.erValgt(getUnikSykepengerKey(sykepenger)) || førstValgt === sykepenger}
                linkTo={dypLinker.ytelser.link(getUnikSykepengerKey(sykepenger))}
            >
                <Undertittel>Sykepengerrettighet</Undertittel>
                <Element>ID-dato</Element>
                <Normaltekst>{formaterDato(getSykepengerIdDato(sykepenger))}</Normaltekst>
            </VisMerKnapp>
        ),
        renderForeldrepenger: foreldrepenger => (
            <VisMerKnapp
                key={getUnikForeldrepengerKey(foreldrepenger)}
                ariaDescription="Vis foreldrepenger"
                valgt={
                    dypLinker.ytelser.erValgt(getUnikForeldrepengerKey(foreldrepenger)) || førstValgt === foreldrepenger
                }
                linkTo={dypLinker.ytelser.link(getUnikForeldrepengerKey(foreldrepenger))}
            >
                <Undertittel>Foreldrepenger</Undertittel>
                <Element>ID-dato</Element>
                <Normaltekst>{formaterDato(getForeldepengerIdDato(foreldrepenger))}</Normaltekst>
            </VisMerKnapp>
        )
    });
    return (
        <Styling>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Ytelser" />}
            {feilmeldinger}
            {!pending && pendingYtelser && feilmeldinger.length === 0 && ytelser.length === 0 && (
                <AlertStripeInfo>Ingen ytelser funnet for bruker</AlertStripeInfo>
            )}
            {pending && <CenteredLazySpinner />}
            <YtelserListeStyle role="tablist">{ytelser}</YtelserListeStyle>
        </Styling>
    );
}

export default YtelseListe;
