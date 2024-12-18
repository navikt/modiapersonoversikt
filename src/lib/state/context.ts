import { atom, useAtomValue } from 'jotai';

export const aktivBrukerAtom = atom<string>();
export const aktivBrukerLastetAtom = atom<boolean>(false);
export const aktivEnhetAtom = atom<string>();

const definedAktivBrukerAtom = atom((get) => get(aktivBrukerAtom) ?? 'invalid value');

export const usePersonAtomValue = () => {
    return useAtomValue(definedAktivBrukerAtom);
};
