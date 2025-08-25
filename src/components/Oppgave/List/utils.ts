import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import { useMemo } from 'react';
import { type OppgaveFilter, oppgaveFilterAtom } from 'src/components/Oppgave/List/Filter';
import { usePersonOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import type { OppgaveDto } from 'src/lib/types/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';

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

export const useFilterOppgave = () => {
    const filters = useAtomValue(oppgaveFilterAtom);
    const { data } = usePersonOppgaver();

    const oppgaver = data.sort(datoSynkende((v) => v.aktivDato));

    return useMemo(() => filterOppdave(oppgaver, filters), [oppgaver, filters]);
};

export const getOppgaveId = (oppgave: OppgaveDto) => {
    return `Oppgave${oppgave.oppgaveId}`;
};
