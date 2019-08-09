import { isFinishedPosting } from '../../../rest/utils/postResource';
import { useRestResource } from '../../../utils/customHooks';
import { useDispatch } from 'react-redux';

interface Props {
    callBack: () => void;
}

function TriggerCallback(props: Props) {
    const sendMeldingResource = useRestResource(resources => resources.sendReferat);
    const dispatch = useDispatch();
    if (isFinishedPosting(sendMeldingResource)) {
        props.callBack();
        dispatch(sendMeldingResource.actions.reset);
    }
    return null;
}

export default TriggerCallback;
