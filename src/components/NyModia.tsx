import { ArrowUndoIcon, SparklesIcon } from '@navikt/aksel-icons';
import { Box, Button } from '@navikt/ds-react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback, useEffect } from 'react';
import { trackToggleNyModia } from 'src/utils/analytics';
import { nesteMidnattOslo } from 'src/utils/date-utils';
import { FeatureToggles } from './featureToggle/toggleIDs';
import useFeatureToggle from './featureToggle/useFeatureToggle';

const nyModiaStorageAtom = atomWithStorage<number | null>('ny-modia-v2', null);

export const nyModiaAtom = atom(
    (get) => {
        const expiresAt = get(nyModiaStorageAtom);
        return expiresAt === null || Date.now() >= expiresAt;
    },
    (_get, set, useNyModia: boolean) => {
        set(nyModiaStorageAtom, useNyModia ? null : nesteMidnattOslo());
    }
);

export const NyModia = () => {
    const { isOn } = useFeatureToggle(FeatureToggles.NyModiaKnapp);
    const [nyModia, setNyModia] = useAtom(nyModiaAtom);

    const { href } = useLocation();
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        setNyModia(!nyModia);
        trackToggleNyModia(!nyModia);
        if (!nyModia) {
            navigate({ to: `/new/${href}` });
        } else {
            navigate({ to: href.replace('/new', '') });
        }
    }, [navigate, setNyModia, nyModia, href]);

    useEffect(() => {
        if (href.includes('/saker') && nyModia) {
            navigate({ to: href.replace('/saker', '/dokumenter') });
            return;
        }
        if (href.includes('/new') && !nyModia) {
            navigate({ to: href.replace('/new', '') });
            return;
        }
        if (!href.includes('/new') && nyModia) {
            navigate({ to: `/new/${href}` });
            return;
        }
    }, [href, nyModia, navigate]);

    if (!isOn) return;

    return (
        <Box className="absolute bottom-0 right-4 mb-12 overflow-hidden z-10" borderRadius="small">
            <Button
                icon={nyModia ? <ArrowUndoIcon /> : <SparklesIcon />}
                variant="secondary"
                size="small"
                onClick={handleClick}
                id="ny-modia-knapp-wrapper"
            >
                {nyModia ? 'Gammel Modia' : 'Ny Modia'}
            </Button>
        </Box>
    );
};
