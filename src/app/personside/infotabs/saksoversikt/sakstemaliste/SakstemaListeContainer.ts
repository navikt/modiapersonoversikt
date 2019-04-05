import { Loaded } from '../../../../../redux/restReducers/deprecatedRestResource';
import { Sakstema, SakstemaResponse } from '../../../../../models/saksoversikt/sakstema';
import { AppState } from '../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { connect } from 'react-redux';
import { settValgtSakstema } from '../../../../../redux/saksoversikt/actions';
import SakstemaListe from './SakstemaListe';

interface StateProps {
    sakstema: Sakstema[];
    valgtSakstema?: Sakstema;
}

interface DispatchProps {
    oppdaterSakstema: (sakstema: Sakstema) => void;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtSakstema: state.saksoversikt.valgtSakstema,
        sakstema: (state.restResources.sakstema as Loaded<SakstemaResponse>).data.resultat
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        oppdaterSakstema: (sakstema: Sakstema) => dispatch(settValgtSakstema(sakstema))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SakstemaListe);
