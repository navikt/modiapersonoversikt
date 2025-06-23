import { Alert, BodyShort, HGrid, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { Suspense } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { ForeldrePengerDetails } from 'src/components/ytelser/Detail/foreldrepenger';
import { PleiePengerDetails } from 'src/components/ytelser/Detail/pleiepenger';
import { SykepengerDetails } from 'src/components/ytelser/Detail/sykepenger';
import { TiltaksPengerDetails } from 'src/components/ytelser/Detail/tiltakspenger';
import { getUnikYtelseKey, useFilterYtelser } from 'src/components/ytelser/utils';
import {
    type Foreldrepenger,
    type Pleiepenger,
    type Sykepenger,
    type VedtakDto,
    YtelseVedtakYtelseType
} from 'src/generated/modiapersonoversikt-api';

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
    columns?: number;
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

const YtelseDataDetails = () => {
    const ytelser = useFilterYtelser();
    const { id } = routeApi.useSearch();
    const selectedYtelse = ytelser.find((item) => getUnikYtelseKey(item) === id);
    if (!selectedYtelse) {
        return <Alert variant="info">Ingen valgte ytelse.</Alert>;
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
            return <Alert variant="info">Underarbeide</Alert>;
        default:
            return <Alert variant="info">Ukjent ytelse type {selectedYtelse.ytelseType}</Alert>;
    }
};

export const ValgteYtelseDetailPage = () => {
    return (
        <ErrorBoundary boundaryName="valgteYtelseDetailPage">
            <Suspense fallback={<Skeleton variant="rounded" height="200" />}>
                <VStack flexGrow="1" minHeight="0" maxHeight="100%" className="overflow-scroll">
                    <YtelseDataDetails />
                </VStack>
            </Suspense>
        </ErrorBoundary>
    );
};
