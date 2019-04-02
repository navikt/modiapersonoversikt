import { Traad } from '../../../../../models/meldinger/meldinger';
import { AppState } from '../../../../../redux/reducers';
import { connect } from 'react-redux';
import TraadVisning from './TraadVisning';

interface StateProps {
    valgtTraad?: Traad;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtTraad: state.meldinger.valgtTraad
    };
}

export default connect(mapStateToProps)(TraadVisning);
