import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { AppState } from '../../../../../../../redux/reducers';
import { connect } from 'react-redux';
import OppgavePanel from './OppgavePanel';
import { PostResource } from '../../../../../../../rest/utils/postResource';
import { OpprettOppgaveRequest } from '../../../../../../../models/meldinger/oppgave';

interface StateProps {
    valgtTraad?: Traad;
    gjeldendeBrukerFnr: string;
    opprettOppgaveResource: PostResource<OpprettOppgaveRequest>;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtTraad: state.meldinger.valgtTraad,
        gjeldendeBrukerFnr: state.gjeldendeBruker.fødselsnummer,
        opprettOppgaveResource: state.restResources.opprettOppgave
    };
}

export default connect(mapStateToProps)(OppgavePanel);
