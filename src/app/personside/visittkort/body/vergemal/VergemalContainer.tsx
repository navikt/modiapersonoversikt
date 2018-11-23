import * as React from 'react';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import { AppState } from '../../../../../redux/reducers';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { Vergemal } from '../../../../../models/vergemal/vergemal';
import VergemalWrapper from './Vergemal';
import { Loaded, RestReducer } from '../../../../../redux/restReducers/restReducer';

interface Props {
    vergemalReducer: RestReducer<Vergemal>;
}

const feilmelding = () => (
    <AlertStripe type="advarsel">
        Feil ved lasting av vergemål
    </AlertStripe>
);

class VergemalContainer extends React.Component<Props> {
    render() {
        return (
            <Innholdslaster
                returnOnError={feilmelding()}
                avhengigheter={[this.props.vergemalReducer]}
                spinnerSize={'L'}
            >
                <VergemalWrapper vergemal={(this.props.vergemalReducer as Loaded<Vergemal>).data}/>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        vergemalReducer: state.restEndepunkter.vergemal
    });
};

export default connect(mapStateToProps, null)(VergemalContainer);
