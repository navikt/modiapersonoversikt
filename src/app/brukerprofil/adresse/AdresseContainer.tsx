import * as React from 'react';
import { connect } from 'react-redux';

import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducers';
import { KodeverkResponse } from '../../../models/kodeverk';
import AdresseForm from './AdresseForm';
import {
    endreMatrikkeladresse,
    endreNorskGateadresse,
    endrePostboksadrese,
    endreUtlandsadresse,
    slettMidlertidigeAdresser
} from '../../../redux/restReducers/brukerprofil/endreAdresseReducer';
import { Gateadresse, Matrikkeladresse, Postboksadresse, Utlandsadresse } from '../../../models/personadresse';
import { VeilederRoller } from '../../../models/veilederRoller';
import { reloadPerson } from '../../../redux/restReducers/personinformasjon';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import RestResourceConsumer from '../../../rest/consumer/RestResourceConsumer';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { PostResource } from '../../../rest/utils/postResource';
import { EndreAdresseRequest } from '../../../redux/restReducers/brukerprofil/adresse-api';

interface StateProps {
    endreAdresseResource: PostResource<EndreAdresseRequest>;
}

interface DispatchProps {
    endreNorskGateadresse: (fødselsnummer: string, gateadresse: Gateadresse) => void;
    endreMatrikkeladresse: (fødselsnummer: string, matrikkeladresse: Matrikkeladresse) => void;
    endrePostboksadresse: (fødselsnummer: string, postboksadresse: Postboksadresse) => void;
    endreUtlandsadresse: (fødselsnummer: string, utlandsadresse: Utlandsadresse) => void;
    slettMidlertidigeAdresser: (fødselsnummer: string) => void;
    resetEndreAdresseResource: () => void;
    reloadPerson: (fødselsnummer: string) => void;
}

interface OwnProps {
    person: Person;
    veilederRoller: VeilederRoller;
}

class AdresseFormContainer extends React.Component<StateProps & DispatchProps & OwnProps> {
    componentWillUnmount() {
        this.props.resetEndreAdresseResource();
    }

    render() {
        return (
            <div>
                <Undertittel>Adresse</Undertittel>
                <RestResourceConsumer<KodeverkResponse> getResource={restResources => restResources.postnummer}>
                    {postnummer => (
                        <AdresseForm
                            veilederRoller={this.props.veilederRoller}
                            person={this.props.person}
                            endreNorskGateadresse={this.props.endreNorskGateadresse}
                            endreMatrikkeladresse={this.props.endreMatrikkeladresse}
                            endrePostboksadresse={this.props.endrePostboksadresse}
                            endreUtlandsadresse={this.props.endreUtlandsadresse}
                            slettMidlertidigeAdresser={this.props.slettMidlertidigeAdresser}
                            resetEndreAdresseResource={this.props.resetEndreAdresseResource}
                            endreAdresseResource={this.props.endreAdresseResource}
                            reloadPersonInfo={this.props.reloadPerson}
                        />
                    )}
                </RestResourceConsumer>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        endreAdresseResource: state.restResources.endreAdresse
    };
};

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        endreNorskGateadresse: (fødselsnummer: string, gateadresse: Gateadresse) =>
            dispatch(endreNorskGateadresse(gateadresse)),
        endreMatrikkeladresse: (fødselsnummer: string, matrikkeladresse: Matrikkeladresse) =>
            dispatch(endreMatrikkeladresse(matrikkeladresse)),
        endrePostboksadresse: (fødselsnummer: string, postboksadresse: Postboksadresse) =>
            dispatch(endrePostboksadrese(postboksadresse)),
        endreUtlandsadresse: (fødselsnummer: string, utlandsadresse: Utlandsadresse) =>
            dispatch(endreUtlandsadresse(utlandsadresse)),
        slettMidlertidigeAdresser: fødselsnummer => dispatch(slettMidlertidigeAdresser()),
        resetEndreAdresseResource: () =>
            dispatch((d, getState) => d(getState().restResources.endreAdresse.actions.reset)),
        reloadPerson: (fødselsnummer: string) => dispatch(reloadPerson(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdresseFormContainer);
