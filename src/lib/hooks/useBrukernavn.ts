import { capitalizeName } from 'src/utils/string-utils';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';

export const useBrukernavn = () => {
    const personData = usePersonData();
    return personData.data ? capitalizeName(personData.data.person.navn.firstOrNull()?.fornavn || '') : 'bruker';
};
