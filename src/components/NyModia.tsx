import { ArrowUndoIcon, SparklesIcon } from '@navikt/aksel-icons';
import { Box, Button } from '@navikt/ds-react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback, useEffect } from 'react';
import { trackToggleNyModia } from 'src/utils/analytics';
import { FeatureToggles } from './featureToggle/toggleIDs';
import useFeatureToggle from './featureToggle/useFeatureToggle';

export const nyModiaAtom = atomWithStorage('ny-modia', false);

export const NyModia = () => {
    const { isOn } = useFeatureToggle(FeatureToggles.NyModiaKnapp);
    const [nyModia, setNyModia] = useAtom(nyModiaAtom);

    const { href } = useLocation();
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        setNyModia((v) => !v);
        trackToggleNyModia(!nyModia);
        if (!nyModia) {
            navigate({ to: `/new/${href}` });
        } else {
            navigate({ to: href.replace('/new', '') });
        }
    }, [navigate, setNyModia, nyModia, href]);

    useEffect(() => {
        if (href.includes('/new') && !nyModia) {
            navigate({ to: href.replace('/new', '') });
        }
        if (!href.includes('/new') && nyModia) {
            navigate({ to: `/new/${href}` });
        }
    }, [href, nyModia, navigate]);

    if (!isOn) return;

    return (
        <Box className="absolute bottom-0 right-4 mb-12 overflow-hidden z-10" borderRadius="xlarge">
            <Button
                icon={nyModia ? <ArrowUndoIcon /> : <SparklesIcon />}
                variant="primary"
                size="small"
                onClick={handleClick}
                id="ny-modia-knapp-wrapper"
            >
                {nyModia ? 'Gammel Modia' : 'Ny Modia'}
            </Button>
        </Box>
    );
};
