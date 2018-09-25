import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../../../../redux/reducers';
import { RestReducer } from '../../../../../redux/restReducers/restReducer';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { FeatureToggleResponse } from '../../../../../models/featureToggle';
import LenkeBrukerprofilVisning from './LenkeBrukerprofil';
import { Person } from '../../../../../models/person/person';
import { paths } from '../../../../routes/routing';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import styled from 'styled-components';

interface StateProps {
    featureToggleNyBrukerprofilReducer: RestReducer<FeatureToggleResponse>;
}

interface OwnProps {
    person: Person;
}

type Props = StateProps & OwnProps;

const feilmelding = (fnr: string) => (
    <a
        className="lenke"
        href={`${paths.legacyPersonPath}/${fnr}${paths.legacyBrukerprofil}`}
    >
        <Normaltekst tag="span">
            Administrer brukerprofil
        </Normaltekst>
    </a>
);

const PlaceBottomRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-grow: 1;
`;

class LenkeBrukerprofilContainer extends React.Component<Props> {
    render() {
        return (
            <Innholdslaster
                returnOnError={feilmelding(this.props.person.fødselsnummer)}
                avhengigheter={[this.props.featureToggleNyBrukerprofilReducer]}
                spinnerSize={'L'}
            >
                <PlaceBottomRight>
                    <LenkeBrukerprofilVisning
                        nyBrukerprofilToggle={
                            this.props.featureToggleNyBrukerprofilReducer.data['modiabrukerdialog.ny-brukerprofil']
                        }
                        person={this.props.person}
                    />
                </PlaceBottomRight>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        featureToggleNyBrukerprofilReducer: state.restEndepunkter.featureToggleNyBrukerprofilReducer
    });
};

export default connect(mapStateToProps)(LenkeBrukerprofilContainer);
