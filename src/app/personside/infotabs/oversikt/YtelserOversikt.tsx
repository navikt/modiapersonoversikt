import * as React from 'react';
import { getUnikSykepengerKey, Sykepenger } from '../../../../models/ytelse/sykepenger';
import { getUnikPleiepengerKey, Pleiepengerettighet } from '../../../../models/ytelse/pleiepenger';
import { Foreldrepengerettighet, getUnikForeldrepengerKey } from '../../../../models/ytelse/foreldrepenger';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Bold } from '../../../../components/common-styled-components';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import useBrukersYtelser from '../ytelser/useBrukersYtelser';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useInfotabsDyplenker } from '../dyplenker';
import { ytelserTest } from '../dyplenkeTest/utils';

const YtelserStyle = styled.div`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

function YtelserOversikt() {
    const { ytelser, pending } = useBrukersYtelser({
        renderPleiepenger: pleiepenger => (
            <PleiepengerKomponent pleiepenger={pleiepenger} key={getUnikPleiepengerKey(pleiepenger)} />
        ),
        renderForeldrepenger: foreldrepenger => (
            <ForeldrepengerKomponent foreldrepenger={foreldrepenger} key={getUnikForeldrepengerKey(foreldrepenger)} />
        ),
        renderSykepenger: sykepenger => (
            <SykepengerKomponent sykepenger={sykepenger} key={getUnikSykepengerKey(sykepenger)} />
        )
    });

    return (
        <YtelserStyle>
            {ytelser}
            {!pending && ytelser.length === 0 && <AlertStripeInfo>Fant ingen ytelser for bruker</AlertStripeInfo>}
            {pending && <CenteredLazySpinner padding={theme.margin.layout} />}
        </YtelserStyle>
    );
}

function PleiepengerKomponent(props: { pleiepenger: Pleiepengerettighet }) {
    const dyplenker = useInfotabsDyplenker();
    return (
        <li className={ytelserTest.oversikt}>
            <VisMerKnapp
                linkTo={dyplenker.ytelser.link(getUnikPleiepengerKey(props.pleiepenger))}
                valgt={false}
                ariaDescription="Vis pleiepenger"
            >
                <Normaltekst>
                    <Bold>Pleiepenger sykt barn</Bold>
                </Normaltekst>
                <Normaltekst>Barnets f.nr: {props.pleiepenger.barnet}</Normaltekst>
            </VisMerKnapp>
        </li>
    );
}

function SykepengerKomponent(props: { sykepenger: Sykepenger }) {
    const dyplenker = useInfotabsDyplenker();

    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(getUnikSykepengerKey(props.sykepenger))}
            valgt={false}
            ariaDescription="Vis sykepenger"
        >
            <Normaltekst>ID dato: {props.sykepenger.sykmeldtFom}</Normaltekst>
            <Normaltekst>
                <Bold>Sykepenger</Bold>
            </Normaltekst>
            <Normaltekst>100% sykemeldt - Maksdato {props.sykepenger.slutt}</Normaltekst>
        </VisMerKnapp>
    );
}

function ForeldrepengerKomponent(props: { foreldrepenger: Foreldrepengerettighet }) {
    const dyplenker = useInfotabsDyplenker();
    return (
        <VisMerKnapp
            linkTo={dyplenker.ytelser.link(getUnikForeldrepengerKey(props.foreldrepenger))}
            valgt={false}
            ariaDescription="Vis foreldrepenger"
        >
            <Normaltekst>ID dato: {props.foreldrepenger.rettighetFom}</Normaltekst>
            <Normaltekst>
                <Bold>Foreldrepenger</Bold>
            </Normaltekst>
            <Normaltekst>
                {props.foreldrepenger.dekningsgrad}% dekningsgrad - Maksdato {props.foreldrepenger.slutt}
            </Normaltekst>
        </VisMerKnapp>
    );
}

export default YtelserOversikt;
