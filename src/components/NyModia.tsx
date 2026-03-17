import { Box, Switch } from '@navikt/ds-react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback, useEffect, useState } from 'react';
import { trackToggleNyModia } from 'src/utils/analytics';
import { nesteMidnattOslo } from 'src/utils/date-utils';
import { FeatureToggles } from './featureToggle/toggleIDs';
import useFeatureToggle from './featureToggle/useFeatureToggle';

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

const brukerHarValgtAtom = atom((get) => get(nyModiaStorageAtom) !== null);

export const NyModiaSwitch = () => {
    const { isOn, pending } = useFeatureToggle(FeatureToggles.NyModiaKnapp);
    const [nyModia, setNyModia] = useAtom(nyModiaAtom);
    const brukerHarValgt = useAtomValue(brukerHarValgtAtom);

    const { href } = useLocation();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(nyModia);

    useEffect(() => {
        if (!pending && isOn && !brukerHarValgt) {
            setNyModia(true);
        }
    }, [pending, isOn, brukerHarValgt, setNyModia]);

    const handleClick = useCallback(() => {
        const switchingTo = !nyModia;
        setIsChecked(switchingTo);
        setTimeout(() => {
            setNyModia(switchingTo);
            trackToggleNyModia(switchingTo);
        }, 200);
    }, [setNyModia, nyModia]);

    useEffect(() => {
        if (pending) return;
        const nyModiaEnabled = isOn && nyModia;
        if (href.includes('/saker') && nyModiaEnabled) {
            void navigate({ to: href.replace('/saker', '/dokumenter') });
        } else if (href.includes('/new') && !nyModiaEnabled) {
            void navigate({ to: href.replace('/new', '') });
        } else if (!href.includes('/new') && nyModiaEnabled) {
            void navigate({ to: `/new/${href}` });
        }
    }, [href, nyModia, isOn, pending, navigate]);

    if (!isOn) return;

    return (
        <Box.New paddingInline="2">
            <Switch size="medium" checked={isChecked} onChange={handleClick}>
                Ny Modia
            </Switch>
        </Box.New>
    );
};
