import { atom, useAtomValue } from 'jotai';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';

export const svarUnderArbeidAtom = atom<string | undefined>(undefined);
export const nyMeldingUnderArbeidAtom = atom<boolean>(false);
export const draftAtom = atom<string>('');
export const overskridKontaktReservasjonAtom = atom<boolean>(false);
export const meldingPanelIsOpenAtom = atom(
    (get) => get(svarUnderArbeidAtom) !== undefined || get(nyMeldingUnderArbeidAtom)
);

export const useDisableDialog = () => {
    const { data } = usePersonData();
    const reservertIKRR = !!data?.person.kontaktInformasjon?.erReservert?.value;
    const overskridReservasjon = useAtomValue(overskridKontaktReservasjonAtom);
    return reservertIKRR && !overskridReservasjon;
};
