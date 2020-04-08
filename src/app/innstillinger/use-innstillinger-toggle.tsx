import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function useInnstillingerToggle(): boolean {
    const response = useFeatureToggle(FeatureToggles.InnstillingerPanel);
    return response.isOn ?? false;
}

export default useInnstillingerToggle;
