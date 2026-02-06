import { Alert, HStack, Skeleton } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { oppgaveFilterAtom } from 'src/components/Oppgave/List/Filter';
import { getOppgaveId, useFilterOppgave } from 'src/components/Oppgave/List/utils';
import { OppgaveContent } from 'src/components/Oppgave/OppgaveContent';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { oppgaveRouteMiddleware } from 'src/routes/new/person/oppgaver';

const routeApi = getRouteApi('/new/person/oppgaver');

const OppgaveOgDialogDetail = ({ oppgaver }: { oppgaver: OppgaveDto[] }) => {
    const { id } = routeApi.useSearch();
    let valgtOppgave = oppgaver.find((item) => getOppgaveId(item) === id);
    const filterAtomValue = useAtomValue(oppgaveFilterAtom);
    const prevFilterRef = useRef(filterAtomValue);
    const navigate = routeApi.useNavigate();

    // Fjern oppgave i URL og cache hvis filteret er endret og oppgaven ikke finnes i filtrerte oppgaver
    useEffect(() => {
        const filterEndret = JSON.stringify(prevFilterRef.current) !== JSON.stringify(filterAtomValue);
        const oppgaveIkkeIListe = !valgtOppgave || !oppgaver.includes(valgtOppgave);
        if ((filterEndret && oppgaveIkkeIListe) || oppgaveIkkeIListe) {
            oppgaveRouteMiddleware().clear();
        }
    }, [valgtOppgave, oppgaver, filterAtomValue]);

    if (!oppgaver.length) {
        return <></>;
    }

    if (!valgtOppgave && id) {
        return (
            <HStack flexGrow="1" minHeight="0" className="">
                <Alert variant="error">Oppgaven du valgte, ble ikke funnet.</Alert>
            </HStack>
        );
    }

    if (!valgtOppgave && !id) {
        valgtOppgave = oppgaver[0];
        navigate({ search: { id: getOppgaveId(valgtOppgave) } });
    }

    if (!valgtOppgave) {
        return <></>;
    }

    return <OppgaveContent oppgave={valgtOppgave} />;
};

export const OppgaveDetail = () => {
    const { data: oppgaver, isLoading } = useFilterOppgave();
    return (
        <ErrorBoundary
            boundaryName="oppgaveDetaljer"
            errorText="Det oppstod en feil under visning av oppgave detailjer"
        >
            {isLoading ? <Skeleton variant="rectangle" height="4rem" /> : <OppgaveOgDialogDetail oppgaver={oppgaver} />}
        </ErrorBoundary>
    );
};
