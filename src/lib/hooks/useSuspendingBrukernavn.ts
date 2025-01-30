import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { capitalizeName } from 'src/utils/string-utils';

export const useSuspendingBrukernavn = () => {
    const personData = usePersonData();
    return personData.data ? capitalizeName(personData.data.person.navn.firstOrNull()?.fornavn || '') : 'bruker';
};
