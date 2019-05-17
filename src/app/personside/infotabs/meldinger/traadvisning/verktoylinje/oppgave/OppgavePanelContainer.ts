import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { AppState } from '../../../../../../../redux/reducers';
import { connect } from 'react-redux';
import OppgavePanel from './OppgavePanel';

interface StateProps {
    valgtTraad?: Traad;
    gjeldendeBrukerFnr: string;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtTraad: state.meldinger.valgtTraad,
        gjeldendeBrukerFnr: state.gjeldendeBruker.fødselsnummer
    };
}

export default connect(mapStateToProps)(OppgavePanel);
