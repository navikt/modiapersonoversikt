import { Traad } from '../../../../../models/meldinger/meldinger';
import { AppState } from '../../../../../redux/reducers';
import { Loaded } from '../../../../../redux/restReducers/restReducer';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { settValgtTraad } from '../../../../../redux/restReducers/meldinger/actions';
import { connect } from 'react-redux';
import TraadListe from './TraadListe';

interface StateProps {
    traader: Traad[];
    valgtTraad?: Traad;
}

interface DispatchProps {
    oppdaterValgtTraad: (traad: Traad) => void;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtTraad: state.meldinger.valgtTraad,
        traader: (state.restEndepunkter.meldingerReducer as Loaded<Traad[]>).data
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        oppdaterValgtTraad: (traad: Traad) => dispatch(settValgtTraad(traad))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TraadListe);
