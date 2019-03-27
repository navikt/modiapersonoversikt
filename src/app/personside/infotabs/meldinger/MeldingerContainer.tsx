import * as React from 'react';
import { isNotStarted, RestReducer } from '../../../../redux/restReducers/restReducer';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { Traad } from '../../../../models/meldinger/meldinger';
import PlukkRestData from '../ytelser/pleiepenger/PlukkRestData';
import MeldingerVisning from './MeldingerHovedKomponent';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentBaseUrls } from '../../../../redux/restReducers/baseurls';
import { hentMeldinger, reloadMeldinger } from '../../../../redux/restReducers/meldinger';
import { connect } from 'react-redux';

interface StateProps {
    baseUrlReducer: RestReducer<BaseUrlsResponse>;
    meldingerReducer: RestReducer<Traad[]>;
}

interface DispatchProps {
    hentBaseUrls: () => void;
    hentMeldinger: (fødselsnummer: string) => void;
    reloadMeldinger: (fødselsnummer: string) => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

class MeldingerContainer extends React.PureComponent<Props> {
    componentDidMount() {
        if (isNotStarted(this.props.baseUrlReducer)) {
            this.props.hentBaseUrls();
        }
        if (isNotStarted(this.props.meldingerReducer)) {
            this.props.hentMeldinger(this.props.fødselsnummer);
        }
    }

    render() {
        return <PlukkRestData restReducer={this.props.meldingerReducer}>{() => <MeldingerVisning />}</PlukkRestData>;
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        baseUrlReducer: state.restEndepunkter.baseUrlReducer,
        meldingerReducer: state.restEndepunkter.meldingerReducer
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentBaseUrls: () => dispatch(hentBaseUrls()),
        hentMeldinger: (fødselsnummer: string) => dispatch(hentMeldinger(fødselsnummer)),
        reloadMeldinger: (fødselsnummer: string) => dispatch(reloadMeldinger(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MeldingerContainer);
