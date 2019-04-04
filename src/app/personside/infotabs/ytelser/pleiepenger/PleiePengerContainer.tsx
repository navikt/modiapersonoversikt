import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { isNotStarted, RestResource } from '../../../../../redux/restReducers/restResource';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { hentPleiepenger } from '../../../../../redux/restReducers/ytelser/pleiepenger';
import { PleiepengerResponse } from '../../../../../models/ytelse/pleiepenger';
import PlukkRestData from './PlukkRestData';
import { loggEvent } from '../../../../../utils/frontendLogger';
import PleiepengerEkspanderbartpanel from './PleiepengerEkspanderbartPanel';

interface StateProps {
    fødselsnummer: string;
    pleiepengerResource: RestResource<PleiepengerResponse>;
}

interface DispatchProps {
    hentPleiepenger: (fødselsnummer: string) => void;
}

type Props = StateProps & DispatchProps;

class PleiePengerContainer extends React.PureComponent<Props> {
    componentDidMount() {
        loggEvent('Sidevisning', 'Pleiepenger');
        if (isNotStarted(this.props.pleiepengerResource)) {
            this.props.hentPleiepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <PlukkRestData spinnerSize="M" restResource={this.props.pleiepengerResource}>
                {data => {
                    if (!data.pleiepenger || !data.pleiepenger[0]) {
                        return null;
                    }
                    return data.pleiepenger.map((pleiepengeRettighet, index) => (
                        <PleiepengerEkspanderbartpanel key={index} pleiepenger={pleiepengeRettighet} />
                    ));
                }}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fødselsnummer: state.gjeldendeBruker.fødselsnummer,
        pleiepengerResource: state.restResources.pleiepenger
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentPleiepenger: (fødselsnummer: string) => dispatch(hentPleiepenger(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PleiePengerContainer);
