import { useEffect } from 'react';
import { FeatureToggles } from '../../../components/featureToggle/toggleIDs';
import useFeatureToggle from '../../../components/featureToggle/useFeatureToggle';

export const useAlertOnNavigation = (shouldShowAlert: boolean) => {
    const { isOn } = useFeatureToggle(FeatureToggles.VisPromptMeldingSending);
    useEffect(() => {
        const promptUser = (e: BeforeUnloadEvent) => {
            if (!shouldShowAlert || !isOn) {
                return;
            }

            e.preventDefault();
            e.returnValue = true;
        };

        window.addEventListener('beforeunload', promptUser);
        return () => window.removeEventListener('beforeunload', promptUser);
    }, [shouldShowAlert, isOn]);
};
