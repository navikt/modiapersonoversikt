import { Alert, BodyShort, HGrid, InlineMessage, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { ArbeidsavklaringspengerDetails } from 'src/components/ytelser/Detail/arbeidsavklaringspenger';
import { PeriodeDagpengerDtoDetails } from 'src/components/ytelser/Detail/dagpenger';
import { ForeldrePengerDetails } from 'src/components/ytelser/Detail/foreldrepenger';
import { ForeldrePengerFpSakDetails } from 'src/components/ytelser/Detail/foreldrepenger-fpsak';
import { PensjonDetails } from 'src/components/ytelser/Detail/pensjon';
import { PleiePengerDetails } from 'src/components/ytelser/Detail/pleiepenger';
import { SykepengerDetails } from 'src/components/ytelser/Detail/sykepenger';
import { SykePengerSpokelseDetails } from 'src/components/ytelser/Detail/sykepenger-spokelse';
import { TiltaksPengerDetails } from 'src/components/ytelser/Detail/tiltakspenger';
import { useSetIdQueryParam } from 'src/components/ytelser/useSetIdQueryParam';
import { getUnikYtelseKey, useFilterYtelser, type YtelseVedtak } from 'src/components/ytelser/utils';
import type {
    Foreldrepenger,
    ForeldrepengerFpSak,
    PensjonSak,
    PeriodeDagpengerDto,
    Pleiepenger,
    Sykepenger,
    Utbetalingsperioder,
    VedtakDto
} from 'src/generated/modiapersonoversikt-api';
import type { Arbeidsavklaringspenger } from 'src/models/ytelse/arbeidsavklaringspenger';
import { YtelseVedtakYtelseType } from 'src/models/ytelse/ytelse-utils';

const TitleValuePairComponent = ({ title, value }: { title: string; value: string | number | null | undefined }) => {
    return (
        <VStack justify="space-between">
            <BodyShort size="small" weight="semibold">
                {title}:
            </BodyShort>
            <BodyShort size="small">{value}</BodyShort>
        </VStack>
    );
};

export const TitleValuePairsComponent = ({
    entries,
    columns
}: {
    entries: {
        [name: string]: string | number | null | undefined;
    };
    columns?:
        | string
        | number
        | {
              xs?: string | number;
              sm?: string | number;
              md?: string | number;
              lg?: string | number;
              xl?: string | number;
          };
}) => {
    const keys = Object.keys(entries);
    return (
        <HGrid gap="6" columns={columns ?? 2} className="my-2">
            {keys.map((key) => {
                const value = entries[key];
                return <TitleValuePairComponent key={key} title={key} value={value} />;
            })}
        </HGrid>
    );
};

const routeApi = getRouteApi('/new/person/ytelser');

const YtelseDataDetails = ({ ytelser }: { ytelser: YtelseVedtak[] }) => {
    const { id } = routeApi.useSearch();
    const selectedYtelse = ytelser.find((item) => getUnikYtelseKey(item) === id);

    useSetIdQueryParam(ytelser);

    if (ytelser.length === 0) {
        return null;
    }

    if (!selectedYtelse && id) {
        return (
            <InlineMessage status="warning" className="p-2">
                Ytelsen du valgte, ble ikke funnet.
            </InlineMessage>
        );
    }

    if (!selectedYtelse) {
        return null;
    }

    switch (selectedYtelse.ytelseType) {
        case YtelseVedtakYtelseType.Foreldrepenger:
            return <ForeldrePengerDetails foreldrePenger={selectedYtelse.ytelseData.data as Foreldrepenger} />;
        case YtelseVedtakYtelseType.Sykepenger:
            return <SykepengerDetails sykepenger={selectedYtelse.ytelseData.data as Sykepenger} />;
        case YtelseVedtakYtelseType.Pleiepenger:
            return <PleiePengerDetails pleiePenger={selectedYtelse.ytelseData.data as Pleiepenger} />;
        case YtelseVedtakYtelseType.Tiltakspenge:
            return <TiltaksPengerDetails tiltaksPenger={selectedYtelse.ytelseData.data as VedtakDto} />;
        case YtelseVedtakYtelseType.Pensjon:
            return <PensjonDetails pensjon={selectedYtelse.ytelseData.data as PensjonSak} />;
        case YtelseVedtakYtelseType.Arbeidsavklaringspenger:
            return <ArbeidsavklaringspengerDetails aap={selectedYtelse.ytelseData.data as Arbeidsavklaringspenger} />;
        case YtelseVedtakYtelseType.ForeldrepengerFpSak:
            return <ForeldrePengerFpSakDetails ytelse={selectedYtelse.ytelseData.data as ForeldrepengerFpSak} />;
        case YtelseVedtakYtelseType.PeriodeDagpengerDto:
            return <PeriodeDagpengerDtoDetails ytelse={selectedYtelse.ytelseData.data as PeriodeDagpengerDto} />;
        case YtelseVedtakYtelseType.SykepengerSpokelse:
            return <SykePengerSpokelseDetails ytelse={selectedYtelse.ytelseData.data as Utbetalingsperioder} />;
        default:
            return <Alert variant="info">Ukjent ytelse type {selectedYtelse.ytelseType}</Alert>;
    }
};

export const ValgteYtelseDetailPage = () => {
    const { data: ytelser, isLoading } = useFilterYtelser();
    return (
        <ErrorBoundary
            boundaryName="valgteYtelseDetailPage"
            errorText="Det oppstod en feil under visning av ytelse detailjer"
        >
            {isLoading ? (
                <Skeleton variant="rectangle" height="4rem" />
            ) : (
                <VStack flexGrow="1" minHeight="0" maxHeight="100%" className="overflow-auto">
                    <YtelseDataDetails ytelser={ytelser} />
                </VStack>
            )}
        </ErrorBoundary>
    );
};
