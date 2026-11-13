import { useLocation, useNavigate } from '@tanstack/react-router';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';
import { aktivBrukerAtom, aktivBrukerLastetAtom } from 'src/lib/state/context';
import { nesteMidnattOslo } from 'src/utils/date-utils';
import { getNyModiaRedirect } from 'src/utils/legacyModiaNavigation';
import { FeatureToggles } from './featureToggle/toggleIDs';
import useDeaktiverGammelModia from './featureToggle/useDeaktiverGammelModia';
import useFeatureToggle from './featureToggle/useFeatureToggle';
import { toast } from './toasts';

const nyModiaStorageAtom = atomWithStorage<number | null>('ny-modia-v2', null);

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
    const deaktivering = useDeaktiverGammelModia();
    const [nyModia, setNyModia] = useAtom(nyModiaAtom);
    const brukerHarValgt = useAtomValue(brukerHarValgtAtom);
    const aktivBruker = useAtomValue(aktivBrukerAtom);
    const aktivBrukerLastet = useAtomValue(aktivBrukerLastetAtom);
    const deaktiveringPending = deaktivering.status === 'pending';
    const gammelModiaDeaktivert = deaktivering.status !== 'pending' && deaktivering.isOn;

    const { href, pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!deaktiveringPending && !gammelModiaDeaktivert && !pending && isOn && !brukerHarValgt) {
            setNyModia(true);
        }
    }, [deaktiveringPending, gammelModiaDeaktivert, pending, isOn, brukerHarValgt, setNyModia]);

    useEffect(() => {
        if (deaktivering.status === 'error') {
            toast.warning('Kunne ikke hente versjonsvalg. Ny Modia brukes.');
        }
    }, [deaktivering.status]);

    useEffect(() => {
        if (deaktiveringPending) return;
        if (gammelModiaDeaktivert) {
            if (pathname === '/' && aktivBrukerLastet) {
                void navigate({ ...getNyModiaRedirect(pathname, {}, !!aktivBruker), replace: true });
            }
            return;
        }
        if (pending) return;
        const nyModiaEnabled = isOn && nyModia;

        if (href.includes('/saker') && nyModiaEnabled) {
            void navigate({ to: href.replace('/saker', '/dokumenter') });
        } else if (href.includes('/new') && !nyModiaEnabled) {
            void navigate({ to: href.replace('/new', '') });
        } else if (!href.includes('/new') && nyModiaEnabled) {
            void navigate({ to: `/new/${href}` });
        }
    }, [
        href,
        pathname,
        nyModia,
        isOn,
        pending,
        navigate,
        deaktiveringPending,
        gammelModiaDeaktivert,
        aktivBruker,
        aktivBrukerLastet
    ]);
};
