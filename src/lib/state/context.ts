import { atom, useAtomValue } from 'jotai';
import type { Enhet } from 'src/models/enhet';

export const aktivBrukerAtom = atom<string>();
export const aktivBrukerLastetAtom = atom<boolean>(false);
export const aktivEnhetAtom = atom<string>();
export const aktivEnhetObjektAtom = atom<Enhet>();

const definedAktivBrukerAtom = atom((get) => get(aktivBrukerAtom) ?? 'invalid value');

export const usePersonAtomValue = () => {
    return useAtomValue(definedAktivBrukerAtom);
};
