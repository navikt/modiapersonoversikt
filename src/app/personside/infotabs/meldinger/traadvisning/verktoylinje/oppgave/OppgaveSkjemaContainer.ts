import { AppState } from '../../../../../../../redux/reducers';
import { connect } from 'react-redux';
import OppgaveSkjema from './OppgaveSkjema';
import { hasData, RestResource } from '../../../../../../../rest/utils/restResource';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { AsyncDispatch } from '../../../../../../../redux/ThunkTypes';

interface StateProps {
    gjeldendeBrukerFnr: string;
    innloggetSaksbehandler: InnloggetSaksbehandler;
}

interface DispatchProps {}

function hentInnloggetSaksbehandler(resource: RestResource<InnloggetSaksbehandler>) {
    if (!hasData(resource)) {
        throw new Error('Innlogget saksbehandler ikke funnet.');
    }
    return resource.data;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        gjeldendeBrukerFnr: state.gjeldendeBruker.fødselsnummer,
        innloggetSaksbehandler: hentInnloggetSaksbehandler(state.restResources.innloggetSaksbehandler)
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OppgaveSkjema);
