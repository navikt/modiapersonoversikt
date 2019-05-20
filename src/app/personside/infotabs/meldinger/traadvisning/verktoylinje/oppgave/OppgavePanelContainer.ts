import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { AppState } from '../../../../../../../redux/reducers';
import { connect } from 'react-redux';
import OppgavePanel from './OppgavePanel';
import { PostResource } from '../../../../../../../rest/utils/postResource';
import { OpprettOppgaveRequest } from '../../../../../../../models/meldinger/oppgave';
import { Loaded, RestResource } from '../../../../../../../rest/utils/restResource';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';

interface StateProps {
    valgtTraad?: Traad;
    gjeldendeBrukerFnr: string;
    innloggetSaksbehandler: InnloggetSaksbehandler;
    opprettOppgaveResource: PostResource<OpprettOppgaveRequest>;
}

function hentInnloggetSaksbehandler(resource: RestResource<InnloggetSaksbehandler>) {
    return (resource as Loaded<InnloggetSaksbehandler>).data;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtTraad: state.meldinger.valgtTraad,
        gjeldendeBrukerFnr: state.gjeldendeBruker.fødselsnummer,
        innloggetSaksbehandler: hentInnloggetSaksbehandler(state.restResources.innloggetSaksbehandler),
        opprettOppgaveResource: state.restResources.opprettOppgave
    };
}

export default connect(mapStateToProps)(OppgavePanel);
