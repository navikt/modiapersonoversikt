import { Loaded } from '../../../../redux/restReducers/restReducer';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import SakstemaListe from './SakstemaListe';
import { connect } from 'react-redux';
import { settValgtSakstema } from '../../../../redux/saksoversikt/actions';

interface StateProps {
    sakstema: Sakstema[];
    valgtSakstema?: Sakstema;
}

interface DispatchProps {
    oppdaterSakstema: (sakstema: Sakstema) => void;
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        valgtSakstema: state.saksoversikt.valgtSakstema,
        sakstema: (state.restEndepunkter.saksoversiktReducer as Loaded<SakstemaResponse>).data.resultat
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        oppdaterSakstema: (sakstema: Sakstema) => dispatch(settValgtSakstema(sakstema))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SakstemaListe);
