import useBrukersYtelser from './useBrukersYtelser';
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
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';
import { Ytelse } from './Ytelser';

interface Props {
    setValgtYtelse: (ytelse: Ytelse) => void;
}

const Styling = styled.section`
    ${theme.hvittPanel};
    padding: ${theme.margin.layout};
`;

const YtelserListeStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

function YtelseListe(props: Props) {
    const { ytelser, pending, feilmeldinger } = useBrukersYtelser({
        renderPleiepenger: pleiepenger => (
            <VisMerKnapp
                key={getUnikPleiepengerKey(pleiepenger)}
                ariaDescription="Vis pleiepenger"
                valgt={false}
                onClick={() => props.setValgtYtelse(pleiepenger)}
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
                valgt={false}
                onClick={() => props.setValgtYtelse(sykepenger)}
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
                valgt={false}
                onClick={() => props.setValgtYtelse(foreldrepenger)}
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
            {!pending && feilmeldinger.length === 0 && ytelser.length === 0 && (
                <AlertStripeInfo>Ingen ytelser funnet for bruker</AlertStripeInfo>
            )}
            {pending && <CenteredLazySpinner />}
            <YtelserListeStyle role="tablist">{ytelser}</YtelserListeStyle>
        </Styling>
    );
}

export default YtelseListe;
