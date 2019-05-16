import { AppState } from '../../../redux/reducers';
import { isFinishedPosting, PostResource } from '../../../rest/utils/postResource';
import { SendMeldingRequest } from '../../../models/meldinger/meldinger';
import { connect } from 'react-redux';

interface OwnProps {
    callBack: () => void;
}

interface StateProps {
    sendResource: PostResource<SendMeldingRequest>;
}

type Props = OwnProps & StateProps;

function TriggerCallback(props: Props) {
    if (isFinishedPosting(props.sendResource)) {
        props.callBack();
    }
    return null;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        sendResource: state.restResources.sendMelding
    };
}

export default connect(mapStateToProps)(TriggerCallback);
