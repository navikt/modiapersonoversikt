import { atom, useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';

export const svarUnderArbeidAtom = atomWithStorage<string | undefined>('svar-under-arbeid', undefined);
export const overskridKontaktReservasjonAtom = atom<boolean>(false);

export const useDisableDialog = () => {
    const { data } = usePersonData();
    const reservertIKRR = !!data?.person.kontaktInformasjon?.erReservert?.value;
    const overskridReservasjon = useAtomValue(overskridKontaktReservasjonAtom);
    return reservertIKRR && !overskridReservasjon;
};
