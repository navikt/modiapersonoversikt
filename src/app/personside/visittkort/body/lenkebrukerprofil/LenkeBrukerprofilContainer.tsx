import * as React from 'react';
import { connect } from 'react-redux';

import { AppState, RestReducer } from '../../../../../redux/reducer';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { FeatureToggleResponse } from '../../../../../models/featureToggle';
import LenkeBrukerprofilVisning from './LenkeBrukerprofil';
import { Person } from '../../../../../models/person/person';
import { paths } from '../../../../routes/routing';

interface StateProps {
    featureToggleReducer: RestReducer<FeatureToggleResponse>;
}

interface OwnProps {
    person: Person;
}

type Props = StateProps & OwnProps;

const feilmelding = (fnr: string) => (
    <a
        className={'lenke'}
        href={`${paths.legacyPersonPath}/${fnr}${paths.legacyBrukerprofil}`}
    >
        Administrer brukerprofil
    </a>
);

class LenkeBrukerprofilContainer extends React.Component<Props> {
    render() {
        return (
            <Innholdslaster
                returnOnError={feilmelding(this.props.person.fødselsnummer)}
                avhengigheter={[this.props.featureToggleReducer]}
                spinnerSize={'L'}
            >
                <LenkeBrukerprofilVisning
                    nyBrukerprofilToggle={this.props.featureToggleReducer.data.value}
                    person={this.props.person}
                />
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        featureToggleReducer: state.featureToggleReducer
    });
};

export default connect(mapStateToProps)(LenkeBrukerprofilContainer);
