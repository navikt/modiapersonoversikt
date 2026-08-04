import dayjs from 'dayjs';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { getUtbetalingerForSiste30DagerDatoer } from 'src/app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import { usePaths } from 'src/app/routes/routing';
import { CenteredLazySpinner } from 'src/components/LazySpinner';
import type { ArbeidsOppfolgingDto } from 'src/generated/modiapersonoversikt-api';
import { useArbeidsoppfolging } from 'src/lib/clients/modiapersonoversikt-api';
import type { OppfolgingsYtelse } from 'src/models/oppfolging';
import { trackingEvents } from 'src/utils/analytics';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import oppfolgingResource from '../../../../rest/resources/oppfolgingResource';
import theme from '../../../../styles/personOversiktTheme';
import CopyToClipboard from '../../visittkort-v2/header/status/CopyToClipboard';
import { getOppfolgingEnhet, getVeileder } from '../oppfolging/oppfolging-utils';

interface Props {
    data: ArbeidsOppfolgingDto | undefined;
    ytelser: OppfolgingsYtelse[];
}

function OppfolgingOversikt() {
    const { data, isLoading, isError } = useArbeidsoppfolging();

    const periode = getUtbetalingerForSiste30DagerDatoer();
    const fom = dayjs(periode.fra).format('YYYY-MM-DD');
    const tom = dayjs(periode.til).format('YYYY-MM-DD');
    const { data: ytelsesData } = oppfolgingResource.useFetch(fom, tom);

    if (isLoading) return <CenteredLazySpinner padding={theme.margin.layout} />;
    if (isError)
        return <AlertStripeAdvarsel>Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripeAdvarsel>;

    return <OppfolgingPanel data={data} ytelser={ytelsesData?.ytelser ?? []} />;
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
            <OppfolgingVisning data={props.data} ytelser={props.ytelser} />
        </VisMerKnapp>
    );
}

function YtelserForBruker({ ytelser }: { ytelser: OppfolgingsYtelse[] }) {
    if (ytelser.length === 0) {
        return null;
    }
    const ytelserStrenger = ytelser
        .filter((ytelse) => ytelse.status !== 'Avsluttet')
        .filter((ytelse) => ytelse.status !== 'Lukket')
        .map((ytelse) => `${ytelse.type} : ${ytelse.status}`);
    const filtrerteYtelser = ytelserStrenger.filter((item, index) => ytelserStrenger.indexOf(item) === index).join(', ');
    return (
        <>
            <Element>Ytelser:</Element>
            <Normaltekst>{filtrerteYtelser}</Normaltekst>
        </>
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

function OppfolgingVisning({
    data,
    ytelser
}: {
    data: ArbeidsOppfolgingDto | undefined;
    ytelser: OppfolgingsYtelse[];
}) {
    return (
        <>
            <Element>Oppfølgende enhet:</Element>
            <Normaltekst>{getOppfolgingEnhet(data?.oppfolging)}</Normaltekst>
            <Veileder data={data} />
            <YtelserForBruker ytelser={ytelser} />
        </>
    );
}

export default OppfolgingOversikt;
