import { Alert, Heading, HGrid, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { meldingerFilterAtom } from 'src/components/Meldinger/List/Filter';
import { useFilterMeldinger, useGsakTemaer, useTraader } from 'src/components/Meldinger/List/utils';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { meldingerRouteMiddleware } from 'src/routes/new/person/meldinger';
import { TraadDetailContent } from './Detail';
import { TraadList } from './List';

export const MeldingerPage = () => {
    return (
        <ErrorBoundary boundaryName="MeldingerPage" errorText="Det oppstod en feil under lasting av meldinger.">
            <MeldingerPageContent />
        </ErrorBoundary>
    );
};

const MeldingerPageContent = () => {
    const { traader, errorMessages: traadErrorMessages, pending } = useTraader();
    const { errorMessages: temaErrorMessages } = useGsakTemaer();

    return (
        <HGrid
            gap="1"
            columns={{ xs: 1, md: 'max-content 1fr' }}
            overflow={{ xs: 'scroll', md: 'hidden' }}
            height="100%"
        >
            <VStack height="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <Heading level="2" size="small" visuallyHidden>
                    Dialoger
                </Heading>
                <ErrorBoundary boundaryName="TraadList" errorText="Det oppstod en feil under visning av melding liste">
                    <TraadList />
                </ErrorBoundary>
            </VStack>
            <VStack flexGrow="1" overflowX={{ md: 'hidden' }}>
                <AlertBanner alerts={[...traadErrorMessages, ...temaErrorMessages]} />
                <ErrorBoundary
                    boundaryName="TraadDetailSection"
                    errorText="Det oppstod en feil under visning av melding detailjer"
                >
                    {pending ? <Skeleton variant="rounded" height="4rem" /> : <TraadDetailSection traader={traader} />}
                </ErrorBoundary>
            </VStack>
        </HGrid>
    );
};

const routeApi = getRouteApi('/new/person/meldinger');

const TraadDetailSection = ({ traader }: { traader: Traad[] }) => {
    const { traadId } = routeApi.useSearch();
    const filters = useAtomValue(meldingerFilterAtom);
    const filteredMeldinger = useFilterMeldinger(traader, filters);
    const navigate = routeApi.useNavigate();
    const valgtTraad = filteredMeldinger.find((t) => t.traadId === traadId);

    const prevFilterRef = useRef(meldingerFilterAtom);

    // Fjern traadid i URL og cache kun hvis filteret er endret og tråden ikke finnes i filtrerte tråder
    useEffect(() => {
        const filterEndret = JSON.stringify(prevFilterRef.current.init) !== JSON.stringify(filters);
        const traadIkkeIListe = !valgtTraad || !filteredMeldinger.includes(valgtTraad);
        if (filterEndret && traadIkkeIListe) {
            meldingerRouteMiddleware.clear();
        }
    }, [valgtTraad, filteredMeldinger, filters]);

    if (filteredMeldinger.length === 0) {
        return <></>;
    }

    if (!valgtTraad && traadId) {
        return <Alert variant="error">Tråden du valgte, ble ikke funnet.</Alert>;
    }

    if (!traadId && !valgtTraad) {
        const traadId = filteredMeldinger[0]?.traadId;
        navigate({ search: { traadId } });
    }

    return <TraadDetailContent traad={valgtTraad ?? filteredMeldinger[0]} />;
};
