import { Alert, BodyShort, GuidePanel, HGrid, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense, useEffect, useRef } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { ForeldrePengerDetails } from 'src/components/ytelser/Detail/foreldrepenger';
import { PensjonDetails } from 'src/components/ytelser/Detail/pensjon';
import { PleiePengerDetails } from 'src/components/ytelser/Detail/pleiepenger';
import { SykepengerDetails } from 'src/components/ytelser/Detail/sykepenger';
import { TiltaksPengerDetails } from 'src/components/ytelser/Detail/tiltakspenger';
import { ytelseFilterAtom } from 'src/components/ytelser/List/Filter';
import { getUnikYtelseKey, useFilterYtelser } from 'src/components/ytelser/utils';
import {
    type Foreldrepenger,
    type PensjonSak,
    type Pleiepenger,
    type Sykepenger,
    type VedtakDto,
    YtelseVedtakYtelseType
} from 'src/generated/modiapersonoversikt-api';
import { ytelserRouteMiddleware } from 'src/routes/new/person/ytelser';

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

const YtelseDataDetails = () => {
    const ytelser = useFilterYtelser();
    const { id } = routeApi.useSearch();
    const selectedYtelse = ytelser.find((item) => getUnikYtelseKey(item) === id);
    const filterAtomValue = useAtomValue(ytelseFilterAtom);
    const prevFilterRef = useRef(ytelseFilterAtom);

    // Fjern ytelseid i URL og cache hvis filteret er endret og ytelsen ikke finnes i filtrerte ytelser
    useEffect(() => {
        const filterEndret = JSON.stringify(prevFilterRef.current.init) !== JSON.stringify(filterAtomValue);
        const ytelseIkkeIListe = !selectedYtelse || !ytelser.includes(selectedYtelse);
        if (filterEndret && ytelseIkkeIListe) {
            ytelserRouteMiddleware.clear();
        }
    }, [selectedYtelse, ytelser, filterAtomValue]);

    if (ytelser.length === 0) {
        return (
            <Alert className="mt-6" variant="info">
                Fant ingen ytelser
            </Alert>
        );
    }

    if (!id) {
        return (
            <HStack margin="4">
                <GuidePanel>Velg en ytelse fra listen på venstre side for å se detaljer.</GuidePanel>
            </HStack>
        );
    }

    if (!selectedYtelse) {
        return (
            <VStack flexGrow="1" minHeight="0" className="mt-6">
                <Alert variant="error">Ytelsen du valgte, ble ikke funnet.</Alert>
            </VStack>
        );
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
