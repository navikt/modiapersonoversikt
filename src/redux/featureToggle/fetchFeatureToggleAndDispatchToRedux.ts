import { AsyncDispatch } from '../ThunkTypes';
import { getFeatureToggle } from '../../api/featuretoggle-api';
import { setFeatureToggleOff, setFeatureToggleOn } from './featureToggleReducer';
import { loggError } from '../../utils/frontendLogger';

export function fetchFeatureToggleAndDispatchToRedux(toggleID: string, dispatch: AsyncDispatch) {
    getFeatureToggle(toggleID)
        .then(isOn =>
            dispatch(isOn ? setFeatureToggleOn(toggleID) : setFeatureToggleOff(toggleID)))
        .catch(error => {
            dispatch(setFeatureToggleOff(toggleID));
            loggError(error, 'Failed to fetch feature toggle (default off): ' + toggleID);
        });
}
