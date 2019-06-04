import { AppState } from '../../../redux/reducers';
import { isFinishedPosting, PostResource } from '../../../rest/utils/postResource';
import { SendMeldingRequest } from '../../../models/meldinger/meldinger';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { resetSendMeldingActionCreator } from '../../../redux/restReducers/sendMelding';

interface OwnProps {
    callBack: () => void;
}

interface StateProps {
    sendResource: PostResource<SendMeldingRequest>;
}

interface DispatchProps {
    resetSendMeldingResource: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

function TriggerCallback(props: Props) {
    if (isFinishedPosting(props.sendResource)) {
        props.callBack();
        props.resetSendMeldingResource();
    }
    return null;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        sendResource: state.restResources.sendMelding
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        resetSendMeldingResource: () => dispatch(resetSendMeldingActionCreator)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TriggerCallback);
