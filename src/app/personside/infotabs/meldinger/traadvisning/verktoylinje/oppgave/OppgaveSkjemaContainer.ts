import { AppState } from '../../../../../../../redux/reducers';
import { connect } from 'react-redux';
import OppgaveSkjema from './OppgaveSkjema';
import { AsyncDispatch } from '../../../../../../../redux/ThunkTypes';

interface StateProps {
    gjeldendeBrukerFnr: string;
}

interface DispatchProps {}

function mapStateToProps(state: AppState): StateProps {
    return {
        gjeldendeBrukerFnr: state.gjeldendeBruker.fødselsnummer
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OppgaveSkjema);
