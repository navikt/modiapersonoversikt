import { Traad } from '../../../../../models/meldinger/meldinger';
import { AppState } from '../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { settValgtTraad } from '../../../../../redux/restReducers/meldinger/actions';
import { connect } from 'react-redux';
import TraadListe from './TraadListe';
import { Loaded } from '../../../../../redux/restReducers/restResource';

interface StateProps {
    traader: Traad[];
    valgtTraad?: Traad;
}

interface DispatchProps {
    settValgtTraad: (traad: Traad) => void;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtTraad: state.meldinger.valgtTraad,
        traader: (state.restResources.tråderOgMeldinger as Loaded<Traad[]>).data
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        settValgtTraad: (traad: Traad) => dispatch(settValgtTraad(traad))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TraadListe);
