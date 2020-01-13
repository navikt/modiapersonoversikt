import useBrukersYtelser from './useBrukersYtelser';
import { getPleiepengerIdDato, getUnikPleiepengerKey } from '../../../../models/ytelse/pleiepenger';
import { getUnikSykepengerKey } from '../../../../models/ytelse/sykepenger';
import { getUnikForeldrepengerKey } from '../../../../models/ytelse/foreldrepenger';
import * as React from 'react';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { formaterDato } from '../../../../utils/stringFormatting';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';

const Styling = styled.section`
    ${theme.hvittPanel};
`;

const YtelserListeStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

function YtelseListe() {
    const { ytelser, pending, feilmeldinger } = useBrukersYtelser({
        renderPleiepenger: pleiepenger => (
            <VisMerKnapp key={getUnikPleiepengerKey(pleiepenger)} ariaDescription="Vis pleiepenger" valgt={false}>
                <Undertittel>Pleiepenger sykt barn</Undertittel>
                <Element>ID-dato</Element>
                <Normaltekst>{formaterDato(getPleiepengerIdDato(pleiepenger))}</Normaltekst>
                <Element>Barnets f.nr:</Element>
                <Normaltekst>{pleiepenger.barnet}</Normaltekst>
            </VisMerKnapp>
        ),
        renderSykepenger: sykepenger => (
            <VisMerKnapp key={getUnikSykepengerKey(sykepenger)} ariaDescription="Vis sykepenger" valgt={false}>
                <Undertittel>Sykepengerrettighet</Undertittel>
                <Element>ID-dato</Element>
                <Normaltekst>{formaterDato(getUnikSykepengerKey(sykepenger))}</Normaltekst>
                <Element>f.nr:</Element>
                <Normaltekst>{sykepenger.fødselsnummer}</Normaltekst>
            </VisMerKnapp>
        ),
        renderForeldrepenger: foreldrepenger => (
            <VisMerKnapp
                key={getUnikForeldrepengerKey(foreldrepenger)}
                ariaDescription="Vis foreldrepenger"
                valgt={false}
            >
                <Undertittel>Pleiepenger sykt barn</Undertittel>
                <Element>ID-dato</Element>
                <Normaltekst>{formaterDato(getUnikForeldrepengerKey(foreldrepenger))}</Normaltekst>
                <Element>Barnets f.nr:</Element>
                <Normaltekst>{foreldrepenger.barnetsFødselsdato}</Normaltekst>
            </VisMerKnapp>
        )
    });

    return (
        <Styling>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Ytelser" />}
            {feilmeldinger}
            {!pending && feilmeldinger.length === 0 && ytelser.length === 0 && (
                <AlertStripeInfo>Ingen ytelser funnet for bruker</AlertStripeInfo>
            )}
            {pending && <CenteredLazySpinner />}
            <YtelserListeStyle role="tablist">{ytelser}</YtelserListeStyle>
        </Styling>
    );
}

export default YtelseListe;
