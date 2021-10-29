import * as React from 'react';
import Visittkort from './visittkort-v2/Visittkort';
import VisittkortContainer from './visittkort/VisittkortContainer';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function VisittkortSwitcher() {
    const brukV2 = useFeatureToggle(FeatureToggles.BrukV2Visittkort);
    if (brukV2.pending) {
        return null;
    } else if (brukV2.isOn) {
        return <Visittkort />;
    } else {
        return <VisittkortContainer />;
    }
}

export default VisittkortSwitcher;
