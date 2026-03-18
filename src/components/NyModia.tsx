import { useLocation, useNavigate } from '@tanstack/react-router';
import {atom, useAtom, useAtomValue} from 'jotai';
import { useEffect } from 'react';
import { FeatureToggles } from './featureToggle/toggleIDs';
import useFeatureToggle from './featureToggle/useFeatureToggle';
import {atomWithStorage} from "jotai/utils";
import {nesteMidnattOslo} from "src/utils/date-utils";


export const nyModiaStorageAtom = atomWithStorage<number | null>('ny-modia-v2', null);

export const nyModiaAtom = atom(
    (get) => {
        const stored = get(nyModiaStorageAtom);
        if (stored === null) return false;
        if (stored < 0) return true;
        return Date.now() >= stored;
    },
    (_get, set, brukNyModia: boolean) => {
        set(nyModiaStorageAtom, brukNyModia ? -1 : nesteMidnattOslo());
    }
);

export const brukerHarValgtAtom = atom((get) => get(nyModiaStorageAtom) !== null);


export const useNavigateToNewOrOldModia = () => {
    const { isOn, pending } = useFeatureToggle(FeatureToggles.NyModiaKnapp);
    const [nyModia, setNyModia] = useAtom(nyModiaAtom);
    const brukerHarValgt = useAtomValue(brukerHarValgtAtom);

    const { href } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!pending && isOn && !brukerHarValgt) {
            setNyModia(true);
        }
    }, [pending, isOn, brukerHarValgt, setNyModia]);


    useEffect(() => {
        if(pending) return
        const nyModiaEnabled = isOn && nyModia;
        console.log({nyModiaEnabled})

        if (href.includes('/saker') && nyModiaEnabled) {
            void navigate({ to: href.replace('/saker', '/dokumenter') });
        } else if (href.includes('/new') && !nyModiaEnabled) {
            void navigate({ to: href.replace('/new', '') });
        } else if (!href.includes('/new') && nyModiaEnabled) {
            void navigate({ to: `/new/${href}` });
        }
    }, [href, nyModia, isOn, pending, navigate]);


};
