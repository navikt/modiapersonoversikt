import { Box, Switch } from '@navikt/ds-react';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { nyModiaAtom } from 'src/components/NyModia';
import { trackToggleNyModia } from 'src/utils/analytics';
import { FeatureToggles } from './featureToggle/toggleIDs';
import useFeatureToggle from './featureToggle/useFeatureToggle';

export const NyModiaSwitch = () => {
    const { isOn } = useFeatureToggle(FeatureToggles.NyModiaKnapp);
    const [nyModia, setNyModia] = useAtom(nyModiaAtom);

    const [isChecked, setIsChecked] = useState(nyModia);

    const handleClick = useCallback(() => {
        const switchingTo = !nyModia;
        setIsChecked(switchingTo);
        setTimeout(() => {
            setNyModia(switchingTo);
            trackToggleNyModia(switchingTo);
        }, 200);
    }, [setNyModia, nyModia]);

    if (!isOn) return;

    return (
        <Box.New paddingInline="2">
            <Switch size="medium" checked={isChecked} onChange={handleClick}>
                Ny Modia
            </Switch>
        </Box.New>
    );
};
