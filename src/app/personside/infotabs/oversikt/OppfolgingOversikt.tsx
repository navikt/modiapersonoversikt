import * as React from 'react';
import { DetaljertOppfolging, Oppfolging } from '../../../../models/oppfolging';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { Normaltekst } from 'nav-frontend-typografi';
import { Bold } from '../../../../components/common-styled-components';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import theme from '../../../../styles/personOversiktTheme';
import { usePaths } from '../../../routes/routing';

interface Props {
    detaljertOppfølging: DetaljertOppfolging;
}

function OppfolgingOversikt() {
    return (
        <RestResourceConsumer<DetaljertOppfolging>
            getResource={restResources => restResources.oppfolging}
            returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
        >
            {data => <OppfolgingPanel detaljertOppfølging={data} />}
        </RestResourceConsumer>
    );
}

function OppfolgingPanel(props: Props) {
    const paths = usePaths();
    return (
        <VisMerKnapp linkTo={paths.oppfolging} ariaDescription="Gå til oppfølging" valgt={false}>
            <OppfolgingVisning oppfolging={props.detaljertOppfølging.oppfølging} />
        </VisMerKnapp>
    );
}

function OppfolgingVisning({ oppfolging }: { oppfolging: Oppfolging }) {
    if (!oppfolging.erUnderOppfølging) {
        return <Normaltekst>Er ikke i arbeidsrettet oppfølging</Normaltekst>;
    }

    const veilederNavn = oppfolging.veileder ? (
        <Normaltekst>{oppfolging.veileder.navn}</Normaltekst>
    ) : (
        <Normaltekst>Ikke angitt</Normaltekst>
    );

    const veilederIdent = oppfolging.veileder ? <Normaltekst>({oppfolging.veileder.ident})</Normaltekst> : null;

    return (
        <>
            <Normaltekst>
                <Bold>Oppfølgende enhet:</Bold>
            </Normaltekst>
            <Normaltekst>{oppfolging.enhet.navn}</Normaltekst>
            <Normaltekst>
                <Bold>Veileder:</Bold>
            </Normaltekst>
            {veilederNavn}
            {veilederIdent}
        </>
    );
}

export default OppfolgingOversikt;
