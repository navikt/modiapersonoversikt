import { Traad } from '../../../../../models/meldinger/meldinger';
import { AppState } from '../../../../../redux/reducers';
import { connect } from 'react-redux';
import TraadVisning from './TraadVisning';
import { RestResource } from '../../../../../rest/utils/restResource';

interface StateProps {
    valgtTraad?: Traad;
    traader: RestResource<Traad[]>;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtTraad: state.meldinger.valgtTraad,
        traader: state.restResources.tråderOgMeldinger
    };
}

export default connect(mapStateToProps)(TraadVisning);
