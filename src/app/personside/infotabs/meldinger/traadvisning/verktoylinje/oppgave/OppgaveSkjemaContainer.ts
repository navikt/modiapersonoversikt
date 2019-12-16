import { AppState } from '../../../../../../../redux/reducers';
import { connect } from 'react-redux';
import OppgaveSkjema from './OppgaveSkjema';
import { PostResource } from '../../../../../../../rest/utils/postResource';
import { OpprettOppgaveRequest } from '../../../../../../../models/meldinger/oppgave';
import { hasData, RestResource } from '../../../../../../../rest/utils/restResource';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { opprettOppgaveActionCreator } from '../../../../../../../redux/restReducers/meldinger/opprettOppgave';
import { AsyncDispatch } from '../../../../../../../redux/ThunkTypes';

interface StateProps {
    gjeldendeBrukerFnr: string;
    innloggetSaksbehandler: InnloggetSaksbehandler;
    opprettOppgaveResource: PostResource<OpprettOppgaveRequest>;
}

interface DispatchProps {
    opprettOppgave: (request: OpprettOppgaveRequest) => void;
}

function hentInnloggetSaksbehandler(resource: RestResource<InnloggetSaksbehandler>) {
    if (!hasData(resource)) {
        throw new Error('Innlogget saksbehandler ikke funnet.');
    }
    return resource.data;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        gjeldendeBrukerFnr: state.gjeldendeBruker.fødselsnummer,
        innloggetSaksbehandler: hentInnloggetSaksbehandler(state.restResources.innloggetSaksbehandler),
        opprettOppgaveResource: state.restResources.opprettOppgave
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        opprettOppgave: (request: OpprettOppgaveRequest) => dispatch(opprettOppgaveActionCreator(request))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OppgaveSkjema);
