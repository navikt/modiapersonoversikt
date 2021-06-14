import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import theme from '../../../../styles/personOversiktTheme';
import { usePaths } from '../../../routes/routing';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import CopyToClipboard from '../../visittkort/header/status/CopyToClipboard';

interface Props {
    detaljertOppfølging: DetaljertOppfolging;
}

const onPendingSpinner = <CenteredLazySpinner padding={theme.margin.layout} />;
function OppfolgingOversikt() {
    return (
        <RestResourceConsumer<DetaljertOppfolging>
            getResource={restResources => restResources.oppfolging}
            returnOnPending={onPendingSpinner}
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
    const ytelser = detaljertOppfolging.ytelser
        .filter(ytelse => ytelse.status !== 'Avsluttet')
        .filter(ytelse => ytelse.status !== 'Lukket')
        .map(ytelse => ytelse.type + ' : ' + ytelse.status);
    const filtrerteYtelser = ytelser.filter((item, index) => ytelser.indexOf(item) === index).join(', ');
    return (
        <>
            <Element>Ytelser:</Element>
            <Normaltekst>{filtrerteYtelser}</Normaltekst>
        </>
    );
}

function Veileder({ detaljertOppfolging }: { detaljertOppfolging: DetaljertOppfolging }) {
    const veilederNavn = detaljertOppfolging.oppfølging.veileder ? (
        <Normaltekst>{detaljertOppfolging.oppfølging.veileder.navn}</Normaltekst>
    ) : (
        <Normaltekst>Ikke angitt</Normaltekst>
    );
    const veilederIdent = detaljertOppfolging.oppfølging.veileder ? (
        <Normaltekst>({detaljertOppfolging.oppfølging.veileder.ident})</Normaltekst>
    ) : null;
    const clipboard =
        detaljertOppfolging.oppfølging.veileder && detaljertOppfolging.oppfølging.veileder.ident ? (
            <CopyToClipboard
                ariaLabel="Kopier veileder"
                stringToCopy={`${detaljertOppfolging.oppfølging.veileder.navn} (${detaljertOppfolging.oppfølging.veileder.ident})`}
            />
        ) : null;

    return (
        <>
            <Element>Veileder:</Element>
            {veilederNavn}
            {veilederIdent}
            {clipboard}
        </>
    );
}

function OppfolgingVisning({ detaljertOppfolging }: { detaljertOppfolging: DetaljertOppfolging }) {
    const enhet = detaljertOppfolging.oppfølging.enhet ? (
        <Normaltekst>{detaljertOppfolging.oppfølging.enhet.navn}</Normaltekst>
    ) : (
        <Normaltekst>Ikke angitt</Normaltekst>
    );

    const innsatsgruppe = detaljertOppfolging.innsatsgruppe;
    const rettighetsgruppe = detaljertOppfolging.rettighetsgruppe;

    return (
        <>
            <Element>Oppfølgende enhet:</Element>
            {enhet}
            <Veileder detaljertOppfolging={detaljertOppfolging} />
            <Element>Innsatsgruppe / Rettighetsgruppe:</Element>
            <Normaltekst>
                {innsatsgruppe} / {rettighetsgruppe}{' '}
            </Normaltekst>
            <YtelserForBruker detaljertOppfolging={detaljertOppfolging} />
        </>
    );
}

export default OppfolgingOversikt;
