import * as React from 'react';
import { Sykepenger } from '../../../../models/ytelse/sykepenger';
import { Pleiepengerettighet } from '../../../../models/ytelse/pleiepenger';
import { Foreldrepengerettighet } from '../../../../models/ytelse/foreldrepenger';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Bold } from '../../../../components/common-styled-components';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import useBrukersYtelser from '../ytelser/useBrukersYtelser';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useInfotabsDyplenker } from '../dyplenker';

const YtelserStyle = styled.div`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

function YtelserOversikt() {
    const { ytelser, pending } = useBrukersYtelser({
        pleiepengerKomponent: (pleiepenger1, key) => (
            <PleiepengerKomponent pleiepenger={pleiepenger1} unikId={key} key={key} />
        ),
        foreldrepengerKomponent: (foreldrepenger, key) => (
            <ForeldrepengerKomponent foreldrepenger={foreldrepenger} unikId={key} key={key} />
        ),
        sykepengerKomponent: (sykepenger, key) => <SykepengerKomponent sykepenger={sykepenger} unikId={key} key={key} />
    });

    return (
        <YtelserStyle>
            {ytelser}
            {!pending && ytelser.length === 0 && <AlertStripeInfo>Fant ingen ytelser for bruker</AlertStripeInfo>}
            {pending && <CenteredLazySpinner padding={theme.margin.layout} />}
        </YtelserStyle>
    );
}

function PleiepengerKomponent(props: { pleiepenger: Pleiepengerettighet; unikId: string }) {
    const dyplenker = useInfotabsDyplenker();
    return (
        <VisMerKnapp linkTo={dyplenker.ytelser.link(props.unikId)} valgt={false} ariaDescription="Vis pleiepenger">
            <Normaltekst>
                <Bold>Pleiepenger sykt barn</Bold>
            </Normaltekst>
            <Normaltekst>Barnets f.nr: {props.pleiepenger.barnet}</Normaltekst>
        </VisMerKnapp>
    );
}

function SykepengerKomponent(props: { sykepenger: Sykepenger; unikId: string }) {
    const dyplenker = useInfotabsDyplenker();

    return (
        <VisMerKnapp linkTo={dyplenker.ytelser.link(props.unikId)} valgt={false} ariaDescription="Vis sykepenger">
            <Normaltekst>ID dato: {props.sykepenger.sykmeldtFom}</Normaltekst>
            <Normaltekst>
                <Bold>Sykepenger</Bold>
            </Normaltekst>
            <Normaltekst>100% sykemeldt - Maksdato {props.sykepenger.slutt}</Normaltekst>
        </VisMerKnapp>
    );
}

function ForeldrepengerKomponent(props: { foreldrepenger: Foreldrepengerettighet; unikId: string }) {
    const dyplenker = useInfotabsDyplenker();

    return (
        <VisMerKnapp linkTo={dyplenker.ytelser.link(props.unikId)} valgt={false} ariaDescription="Vis foreldrepenger">
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
