import { ArrowUndoIcon, SparklesIcon } from '@navikt/aksel-icons';
import { Box, Button } from '@navikt/ds-react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback } from 'react';
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

        if (!nyModia) {
            navigate({ to: `/new/${href}` });
        } else {
            navigate({ to: href.replace('/new', '') });
        }
    }, [navigate, setNyModia, nyModia, href]);

    if (!isOn) return;

    return (
        <Box className="absolute bottom-0 right-0 m-12 overflow-hidden" borderRadius="xlarge">
            <Button icon={nyModia ? <ArrowUndoIcon /> : <SparklesIcon />} variant="primary" onClick={handleClick}>
                {nyModia ? 'Gamle modia' : 'Ny!'}
            </Button>
        </Box>
    );
};
