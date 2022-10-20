import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import theme from '../../../../styles/personOversiktTheme';
import { usePaths } from '../../../routes/routing';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { getOppfolgingEnhet, getVeileder } from '../oppfolging/oppfolging-utils';
import CopyToClipboard from '../../visittkort-v2/header/status/CopyToClipboard';
import oppfolgingResource from '../../../../rest/resources/oppfolgingResource';

interface Props {
    detaljertOppfolging: DetaljertOppfolging;
}

function OppfolgingOversikt() {
    return oppfolgingResource.useRenderer({
        ifPending: <CenteredLazySpinner padding={theme.margin.layout} />,
        ifData: (data: DetaljertOppfolging) => <OppfolgingPanel detaljertOppfolging={data} />
    });
}

function OppfolgingPanel(props: Props) {
    const paths = usePaths();

    if (props.detaljertOppfolging.oppfolging !== null && !props.detaljertOppfolging.oppfolging.erUnderOppfolging) {
        return <AlertStripeInfo>Er ikke i arbeidsrettet oppfølging</AlertStripeInfo>;
    }

    return (
        <VisMerKnapp linkTo={paths.oppfolging} ariaDescription="Gå til oppfølging" valgt={false}>
            <OppfolgingVisning detaljertOppfolging={props.detaljertOppfolging} />
        </VisMerKnapp>
    );
}

function YtelserForBruker({ detaljertOppfolging }: { detaljertOppfolging: DetaljertOppfolging }) {
    if (detaljertOppfolging.ytelser.length === 0) {
        return null;
    }
    const ytelser = detaljertOppfolging.ytelser
        .filter((ytelse) => ytelse.status !== 'Avsluttet')
        .filter((ytelse) => ytelse.status !== 'Lukket')
        .map((ytelse) => ytelse.type + ' : ' + ytelse.status);
    const filtrerteYtelser = ytelser.filter((item, index) => ytelser.indexOf(item) === index).join(', ');
    return (
        <>
            <Element>Ytelser:</Element>
            <Normaltekst>{filtrerteYtelser}</Normaltekst>
        </>
    );
}

function Veileder({ detaljertOppfolging }: { detaljertOppfolging: DetaljertOppfolging }) {
    const clipboard =
        detaljertOppfolging.oppfolging?.veileder && detaljertOppfolging.oppfolging.veileder.ident ? (
            <CopyToClipboard
                ariaLabel="Kopier veileder"
                stringToCopy={`${detaljertOppfolging.oppfolging.veileder.navn} (${detaljertOppfolging.oppfolging.veileder.ident})`}
            />
        ) : null;

    return (
        <>
            <Element>Veileder:</Element>
            <Normaltekst>{getVeileder(detaljertOppfolging.oppfolging?.veileder)}</Normaltekst>
            {clipboard}
        </>
    );
}

function OppfolgingVisning({ detaljertOppfolging }: { detaljertOppfolging: DetaljertOppfolging }) {
    const innsatsgruppe = detaljertOppfolging.innsatsgruppe;
    const rettighetsgruppe = detaljertOppfolging.rettighetsgruppe;

    return (
        <>
            <Element>Oppfølgende enhet:</Element>
            <Normaltekst>{getOppfolgingEnhet(detaljertOppfolging.oppfolging)}</Normaltekst>
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
