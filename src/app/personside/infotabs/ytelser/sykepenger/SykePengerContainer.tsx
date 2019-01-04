import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { isNotStarted, RestReducer } from '../../../../../redux/restReducers/restReducer';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { SykepengerResponse } from '../../../../../models/ytelse/sykepenger';
import { hentSykepenger } from '../../../../../redux/restReducers/ytelser/sykepenger';
import PlukkRestData from '../pleiepenger/PlukkRestData';
import { loggEvent } from '../../../../../utils/frontendLogger';
import SykepengerEkspanderbartpanel from './SykepengerEkspanderbartPanel';

interface OwnProps {
    fødselsnummer: string;
}

interface StateProps {
    sykepengerReducer: RestReducer<SykepengerResponse>;
}

interface DispatchProps {
    hentSykepenger: (fødselsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class SykePengerContainer extends React.PureComponent<Props> {

    componentDidMount() {
        loggEvent('Sidevisning', 'Sykepenger');
        if (isNotStarted(this.props.sykepengerReducer)) {
            this.props.hentSykepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <PlukkRestData spinnerSize="M" restReducer={this.props.sykepengerReducer}>
                {data => {
                    if (!data.sykepenger) {
                        return null;
                    }
                    return data.sykepenger.map((sykepengerettighet, index) =>
                        <SykepengerEkspanderbartpanel key={index} sykepenger={sykepengerettighet}/>);
                }}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        sykepengerReducer: state.restEndepunkter.sykepengerReducer
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentSykepenger: (fødselsnummer: string) => dispatch(hentSykepenger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SykePengerContainer);
