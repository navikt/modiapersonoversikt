import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { isNotStarted, RestResource } from '../../../../../redux/restReducers/restResource';
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
    sykepengerResource: RestResource<SykepengerResponse>;
}

interface DispatchProps {
    hentSykepenger: (fødselsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class SykePengerContainer extends React.PureComponent<Props> {
    componentDidMount() {
        loggEvent('Sidevisning', 'Sykepenger');
        if (isNotStarted(this.props.sykepengerResource)) {
            this.props.hentSykepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <PlukkRestData spinnerSize="M" restResource={this.props.sykepengerResource}>
                {data => {
                    if (!data.sykepenger) {
                        return null;
                    }
                    return <SykepengerEkspanderbartpanel sykepenger={data.sykepenger} />;
                }}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        sykepengerResource: state.restResources.sykepenger
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentSykepenger: (fødselsnummer: string) => dispatch(hentSykepenger(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SykePengerContainer);
