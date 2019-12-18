import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { Element, Normaltekst } from 'nav-frontend-typografi';
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
        return null;
    }
    const ytelser = detaljertOppfolging.ytelser.map(ytelse => ytelse.type);
    const filtrerteYtelser = ytelser.filter((item, index) => ytelser.indexOf(item) === index).join(', ');
    return (
        <>
            <Element>Ytelser:</Element>
            <Normaltekst>{filtrerteYtelser}</Normaltekst>
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
            <Element>Oppfølgende enhet:</Element>
            {enhet}
            <Element>Veileder:</Element>
            {veilederNavn}
            {veilederIdent}
            <Element>Innsatsgruppe / Rettighetsgruppe:</Element>
            <Normaltekst>
                {innsatsgruppe} / {rettighetsgruppe}{' '}
            </Normaltekst>
            <YtelserForBruker detaljertOppfolging={detaljertOppfolging} />
        </>
    );
}

export default OppfolgingOversikt;
