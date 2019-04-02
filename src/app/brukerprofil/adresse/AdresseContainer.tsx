import * as React from 'react';
import { connect } from 'react-redux';

import { Person } from '../../../models/person/person';
import { AppState } from '../../../redux/reducers';
import { KodeverkResponse } from '../../../models/kodeverk';
import Innholdslaster from '../../../components/Innholdslaster';
import { hentPostnummere } from '../../../redux/restReducers/kodeverk/postnummerReducer';
import AdresseForm from './AdresseForm';
import {
    endreMatrikkeladresse,
    endreNorskGateadresse,
    endrePostboksadrese,
    endreUtlandsadresse,
    reset,
    slettMidlertidigeAdresser
} from '../../../redux/restReducers/brukerprofil/endreAdresseReducer';
import { Gateadresse, Matrikkeladresse, Postboksadresse, Utlandsadresse } from '../../../models/personadresse';
import { VeilederRoller } from '../../../models/veilederRoller';
import { Undertittel } from 'nav-frontend-typografi';
import { reloadPerson } from '../../../redux/restReducers/personinformasjon';
import { isNotStarted, RestResource } from '../../../redux/restReducers/restResource';
import { AsyncDispatch } from '../../../redux/ThunkTypes';

interface StateProps {
    postnummerResource: RestResource<KodeverkResponse>;
    endreAdresseResource: RestResource<{}>;
}

interface DispatchProps {
    hentPostnummerKodeverk: () => void;
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
    componentDidMount() {
        if (isNotStarted(this.props.postnummerResource)) {
            this.props.hentPostnummerKodeverk();
        }
    }

    componentWillUnmount() {
        this.props.resetEndreAdresseResource();
    }

    render() {
        return (
            <div>
                <Undertittel>Adresse</Undertittel>
                <Innholdslaster avhengigheter={[this.props.postnummerResource]}>
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
                </Innholdslaster>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        postnummerResource: state.restResources.postnummer,
        endreAdresseResource: state.restResources.endreAdresse
    };
};

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentPostnummerKodeverk: () => dispatch(hentPostnummere()),
        endreNorskGateadresse: (fødselsnummer: string, gateadresse: Gateadresse) =>
            dispatch(endreNorskGateadresse(fødselsnummer, gateadresse)),
        endreMatrikkeladresse: (fødselsnummer: string, matrikkeladresse: Matrikkeladresse) =>
            dispatch(endreMatrikkeladresse(fødselsnummer, matrikkeladresse)),
        endrePostboksadresse: (fødselsnummer: string, postboksadresse: Postboksadresse) =>
            dispatch(endrePostboksadrese(fødselsnummer, postboksadresse)),
        endreUtlandsadresse: (fødselsnummer: string, utlandsadresse: Utlandsadresse) =>
            dispatch(endreUtlandsadresse(fødselsnummer, utlandsadresse)),
        slettMidlertidigeAdresser: fødselsnummer => dispatch(slettMidlertidigeAdresser(fødselsnummer)),
        resetEndreAdresseResource: () => dispatch(reset()),
        reloadPerson: (fødselsnummer: string) => dispatch(reloadPerson(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdresseFormContainer);
