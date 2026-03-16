import { atom, useAtomValue } from 'jotai';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';

export const dialogUnderArbeidAtom = atom<string>();
export const overskridKontaktReservasjonAtom = atom<boolean>(false);

export const useDisableDialog = () => {
    const { data } = usePersonData();
    const reservertIKRR = !!data?.person.kontaktInformasjon?.erReservert?.value;
    const overskridReservasjon = useAtomValue(overskridKontaktReservasjonAtom);
    return reservertIKRR && !overskridReservasjon;
};
