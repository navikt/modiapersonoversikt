import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { Normaltekst } from 'nav-frontend-typografi';
import { Bold } from '../../../../components/common-styled-components';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import theme from '../../../../styles/personOversiktTheme';
import { usePaths } from '../../../routes/routing';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

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

    if (!props.detaljertOppfølging.oppfølging.erUnderOppfølging) {
        return <AlertStripeInfo>Er ikke i arbeidsrettet oppfølging</AlertStripeInfo>;
    }

    return (
        <VisMerKnapp linkTo={paths.oppfolging} ariaDescription="Gå til oppfølging" valgt={false}>
            <OppfolgingVisning detaljertOppfolging={props.detaljertOppfølging} />
        </VisMerKnapp>
    );
}

function YtelserForBruker({ detaljertOppfolging }: { detaljertOppfolging: DetaljertOppfolging }) {
    if (detaljertOppfolging.ytelser.length === 0) {
        return <Normaltekst>Ingen ytelser for bruker</Normaltekst>;
    }
    const ytelser = detaljertOppfolging.ytelser.map(ytelse => ytelse.type).join(', ');
    return (
        <>
            <Normaltekst>
                <Bold>Ytelser:</Bold>
            </Normaltekst>
            <Normaltekst>{ytelser}</Normaltekst>
        </>
    );
}

function OppfolgingVisning({ detaljertOppfolging }: { detaljertOppfolging: DetaljertOppfolging }) {
    const veilederNavn = detaljertOppfolging.oppfølging.veileder ? (
        <Normaltekst>{detaljertOppfolging.oppfølging.veileder.navn}</Normaltekst>
    ) : (
        <Normaltekst>Ikke angitt</Normaltekst>
    );

    const enhet = detaljertOppfolging.oppfølging.enhet ? (
        <Normaltekst>{detaljertOppfolging.oppfølging.enhet.navn}</Normaltekst>
    ) : (
        <Normaltekst>Ikke angitt</Normaltekst>
    );

    const veilederIdent = detaljertOppfolging.oppfølging.veileder ? (
        <Normaltekst>({detaljertOppfolging.oppfølging.veileder.ident})</Normaltekst>
    ) : null;
    const innsatsgruppe = detaljertOppfolging.innsatsgruppe;
    const rettighetsgruppe = detaljertOppfolging.rettighetsgruppe;

    return (
        <>
            <Normaltekst>
                <Bold>Oppfølgende enhet:</Bold>
            </Normaltekst>
            {enhet}
            <Normaltekst>
                <Bold>Veileder:</Bold>
            </Normaltekst>
            {veilederNavn}
            {veilederIdent}
            <Normaltekst>
                <Bold>Innsatsgruppe / Rettighetsgruppe: </Bold>
            </Normaltekst>
            <Normaltekst>
                {innsatsgruppe} / {rettighetsgruppe}{' '}
            </Normaltekst>
            <YtelserForBruker detaljertOppfolging={detaljertOppfolging} />
        </>
    );
}

export default OppfolgingOversikt;
