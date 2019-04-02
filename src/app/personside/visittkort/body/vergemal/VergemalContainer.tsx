import * as React from 'react';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import { AppState } from '../../../../../redux/reducers';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { Vergemal } from '../../../../../models/vergemal/vergemal';
import VergemalWrapper from './Vergemal';
import { Loaded, RestResource } from '../../../../../redux/restReducers/restResource';

interface Props {
    vergemalResource: RestResource<Vergemal>;
}

const feilmelding = () => <AlertStripe type="advarsel">Feil ved lasting av vergemål</AlertStripe>;

class VergemalContainer extends React.Component<Props> {
    render() {
        return (
            <Innholdslaster
                returnOnError={feilmelding()}
                avhengigheter={[this.props.vergemalResource]}
                spinnerSize={'L'}
            >
                <VergemalWrapper vergemal={(this.props.vergemalResource as Loaded<Vergemal>).data} />
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        vergemalResource: state.restResources.vergemal
    };
};

export default connect(
    mapStateToProps,
    null
)(VergemalContainer);
