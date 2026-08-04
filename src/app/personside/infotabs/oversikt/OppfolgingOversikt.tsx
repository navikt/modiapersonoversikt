import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { usePaths } from 'src/app/routes/routing';
import { CenteredLazySpinner } from 'src/components/LazySpinner';
import type { ArbeidsOppfolgingDto } from 'src/generated/modiapersonoversikt-api';
import { useArbeidsoppfolging } from 'src/lib/clients/modiapersonoversikt-api';
import { trackingEvents } from 'src/utils/analytics';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import theme from '../../../../styles/personOversiktTheme';
import CopyToClipboard from '../../visittkort-v2/header/status/CopyToClipboard';
import { getOppfolgingEnhet, getVeileder } from '../oppfolging/oppfolging-utils';

interface Props {
    data: ArbeidsOppfolgingDto | undefined;
}

function OppfolgingOversikt() {
    const { data, isLoading, isError } = useArbeidsoppfolging();

    if (isLoading) return <CenteredLazySpinner padding={theme.margin.layout} />;
    if (isError)
        return <AlertStripeAdvarsel>Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripeAdvarsel>;

    return <OppfolgingPanel data={data} />;
}

function OppfolgingPanel(props: Props) {
    const paths = usePaths();

    if (props.data?.oppfolging != null && !props.data.oppfolging.erUnderOppfolging) {
        return <AlertStripeInfo>Er ikke under arbeidsrettet oppfølging</AlertStripeInfo>;
    }

    return (
        <VisMerKnapp
            linkTo={paths.oppfolging}
            umamiEvent={{
                name: trackingEvents.detaljvisningKlikket,
                data: {
                    fane: 'oversikt',
                    tekst: 'vis oppfølging'
                }
            }}
            ariaDescription="Gå til oppfølging"
            valgt={false}
        >
            <OppfolgingVisning data={props.data} />
        </VisMerKnapp>
    );
}

function Veileder({ data }: { data: ArbeidsOppfolgingDto | undefined }) {
    const clipboard = data?.oppfolging?.veileder?.ident ? (
        <CopyToClipboard
            ariaLabel="Kopier veileder"
            stringToCopy={`${data.oppfolging.veileder.navn} (${data.oppfolging.veileder.ident})`}
        />
    ) : null;

    return (
        <>
            <Element>Veileder:</Element>
            <Normaltekst>{getVeileder(data?.oppfolging?.veileder)}</Normaltekst>
            {clipboard}
        </>
    );
}

function OppfolgingVisning({ data }: { data: ArbeidsOppfolgingDto | undefined }) {
    return (
        <>
            <Element>Oppfølgende enhet:</Element>
            <Normaltekst>{getOppfolgingEnhet(data?.oppfolging)}</Normaltekst>
            <Veileder data={data} />
        </>
    );
}

export default OppfolgingOversikt;
