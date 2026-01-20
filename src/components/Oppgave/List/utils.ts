import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import { useMemo } from 'react';
import { type OppgaveFilter, oppgaveFilterAtom } from 'src/components/Oppgave/List/Filter';
import { errorPlaceholder, responseErrorMessage } from 'src/components/ytelser/utils';
import { useTildeltOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import type { OppgaveDto } from 'src/lib/types/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';

interface Returns {
    oppgaver: OppgaveDto[];
    pending: boolean;
    errorMessages: (string | undefined)[];
    hasError: boolean;
}

const filterOppdave = (oppgaver: OppgaveDto[], filters: OppgaveFilter): OppgaveDto[] => {
    const { tema, dateRange } = filters;

    if (!oppgaver || oppgaver.length === 0) {
        return [];
    }
    let filteredList = oppgaver;

    if (tema?.length) {
        filteredList = filteredList.filter((oppgave) => tema.includes(oppgave.tema));
    }

    if (dateRange?.from && dateRange?.to) {
        filteredList = filteredList.filter((oppgave) => {
            const dato = dayjs(oppgave.aktivDato);
            return dato.isSameOrAfter(dateRange.from) && dato.isSameOrBefore(dateRange.to);
        });
    }

    return filteredList ?? [];
};

export const useFilterOppgave = (): Returns => {
    const filters = useAtomValue(oppgaveFilterAtom);
    const oppgaverResponse = useTildeltOppgaver();

    return useMemo(() => {
        const oppgaver = oppgaverResponse?.data ?? [];
        const errorMessages = [errorPlaceholder(oppgaverResponse, responseErrorMessage('oppgaver'))];
        const sortedOppgaver = oppgaver.sort(datoSynkende((v) => v.aktivDato));

        return {
            oppgaver: filterOppdave(sortedOppgaver, filters) ?? [],
            pending: oppgaverResponse.isLoading,
            errorMessages: errorMessages.filter(Boolean),
            hasError: oppgaverResponse.isError
        };
    }, [oppgaverResponse, filters]);
};

export const getOppgaveId = (oppgave: OppgaveDto) => {
    return `Oppgave${oppgave.oppgaveId}`;
};
