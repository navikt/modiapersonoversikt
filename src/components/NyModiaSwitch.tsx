import { Box, Switch } from '@navikt/ds-react';
import { useAtom, useSetAtom } from 'jotai';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { openGamleModiaFeedbackModalAtom } from 'src/app/internarbeidsflatedecorator/LumiGamleModiaModal';
import { isGamleModiaFeedbackInCooldown } from 'src/app/internarbeidsflatedecorator/lumiStorageUtils';
import { nyModiaAtom } from 'src/components/NyModia';
import { trackToggleNyModia } from 'src/utils/analytics';
import { FeatureToggles } from './featureToggle/toggleIDs';
import useFeatureToggle from './featureToggle/useFeatureToggle';

interface NyModiaSwitchProps {
    onCloseMenu?: () => void;
}

export const NyModiaSwitch = forwardRef<HTMLInputElement, NyModiaSwitchProps>(({ onCloseMenu }, ref) => {
    const { isOn: nyModiaIsOn } = useFeatureToggle(FeatureToggles.NyModiaKnapp);
    const { isOn: lumiFeedbackGamleModiaIsOn } = useFeatureToggle(FeatureToggles.LumiFeedbackGamleModia);
    const [nyModia, setNyModia] = useAtom(nyModiaAtom);
    const openGamleModiaFeedbackModal = useSetAtom(openGamleModiaFeedbackModalAtom);

    const [isChecked, setIsChecked] = useState(nyModia);

    useEffect(() => {
        setIsChecked(nyModia);
    }, [nyModia]);

    const handleClick = useCallback(() => {
        const switchingTo = !nyModia;
        if (!switchingTo && lumiFeedbackGamleModiaIsOn && !isGamleModiaFeedbackInCooldown()) {
            onCloseMenu?.();
            openGamleModiaFeedbackModal(true);
            return;
        }
        setIsChecked(switchingTo);
        setTimeout(() => {
            setNyModia(switchingTo);
            trackToggleNyModia(switchingTo);
        }, 200);
    }, [setNyModia, nyModia, lumiFeedbackGamleModiaIsOn, openGamleModiaFeedbackModal, onCloseMenu]);

    if (!nyModiaIsOn) return;

    return (
        <Box paddingInline="space-8">
            <Switch role="menuitem" ref={ref} size="medium" checked={isChecked} onChange={handleClick}>
                Ny Modia
            </Switch>
        </Box>
    );
});
