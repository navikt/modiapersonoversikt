import * as React from 'react';
import { ForeldrepengerResponse } from '../../../../../models/ytelse/foreldrepenger';
import { connect } from 'react-redux';
import { hentForeldrepenger } from '../../../../../redux/restReducers/ytelser/foreldrepenger';
import { AppState } from '../../../../../redux/reducers';
import { isNotStarted, RestReducer } from '../../../../../redux/restReducers/restReducer';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import PlukkRestData from '../pleiepenger/PlukkRestData';
import { loggEvent } from '../../../../../utils/frontendLogger';
import ForeldrepengerEkspanderbartpanel from './ForeldrepengerEkspanderbartPanel';

interface OwnProps {
    fødselsnummer: string;
}

interface StateProps {
    foreldrepengerReducer: RestReducer<ForeldrepengerResponse>;
}

interface DispatchProps {
    hentForeldrepenger: (fødselsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class ForeldrePengerContainer extends React.PureComponent<Props> {
    componentDidMount() {
        loggEvent('Sidevisning', 'Foreldrepenger');
        if (isNotStarted(this.props.foreldrepengerReducer)) {
            this.props.hentForeldrepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <PlukkRestData spinnerSize="M" restReducer={this.props.foreldrepengerReducer}>
                {data => {
                    if (!data.foreldrepenger || !data.foreldrepenger[0]) {
                        return null;
                    }
                    return data.foreldrepenger.map((foreldrepengerettighet, index) => (
                        <ForeldrepengerEkspanderbartpanel key={index} foreldrepenger={foreldrepengerettighet} />
                    ));
                }}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        foreldrepengerReducer: state.restEndepunkter.foreldrepengerReducer
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentForeldrepenger: (fødselsnummer: string) => dispatch(hentForeldrepenger(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForeldrePengerContainer);
