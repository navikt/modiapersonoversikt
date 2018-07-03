import * as React from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';

import { Person } from '../../../models/person/person';
import { AppState, RestReducer } from '../../../redux/reducer';
import { KodeverkResponse } from '../../../models/kodeverk';
import Innholdslaster from '../../../components/Innholdslaster';
import { hentPostnummere } from '../../../redux/kodeverk/postnummerReducer';
import { STATUS } from '../../../redux/utils';
import AdresseForm from './AdresseForm';
import {
    endreMatrikkeladresse,
    endreNorskGateadresse,
    endrePostboksadrese, slettMidlertidigeAdresser
} from '../../../redux/brukerprofil/endreAdresseReducer';
import { Gateadresse, Matrikkeladresse, Postboksadresse } from '../../../models/personadresse';
import { VeilederRoller } from '../../../models/veilederRoller';

interface StateProps {
    postnummerReducer: RestReducer<KodeverkResponse>;
    endreAdresseReducer: RestReducer<{}>;
}

interface DispatchProps {
    hentPostnummerKodeverk: () => void;
    endreNorskGateadresse: (fødselsnummer: string, gateadresse: Gateadresse) => void;
    endreMatrikkeladresse: (fødselsnummer: string, matrikkeladresse: Matrikkeladresse) => void;
    endrePostboksadresse: (fødselsnummer: string, postboksadresse: Postboksadresse) => void;
    slettMidlertidigeAdresser: (fødselsnummer: string) => void;
}

interface OwnProps {
    person: Person;
    veilederRoller: VeilederRoller;
}

class AdresseFormContainer extends React.Component<StateProps & DispatchProps & OwnProps> {

    componentDidMount() {
        if (this.props.postnummerReducer.status === STATUS.NOT_STARTED) {
            this.props.hentPostnummerKodeverk();
        }
    }

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.postnummerReducer]}>
                <AdresseForm
                    veilederRoller={this.props.veilederRoller}
                    person={this.props.person}
                    endreNorskGateadresse={this.props.endreNorskGateadresse}
                    endreMatrikkeladresse={this.props.endreMatrikkeladresse}
                    endrePostboksadresse={this.props.endrePostboksadresse}
                    slettMidlertidigeAdresser={this.props.slettMidlertidigeAdresser}
                    endreAdresseReducer={this.props.endreAdresseReducer}
                />
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        postnummerReducer: state.postnummerReducer,
        endreAdresseReducer: state.endreAdresseReducer
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentPostnummerKodeverk: () => dispatch(hentPostnummere()),
        endreNorskGateadresse: (fødselsnummer: string, gateadresse: Gateadresse) =>
            dispatch(endreNorskGateadresse(fødselsnummer, gateadresse)),
        endreMatrikkeladresse: (fødselsnummer: string, matrikkeladresse: Matrikkeladresse) =>
            dispatch(endreMatrikkeladresse(fødselsnummer, matrikkeladresse)),
        endrePostboksadresse: (fødselsnummer: string, postboksadresse: Postboksadresse) =>
            dispatch(endrePostboksadrese(fødselsnummer, postboksadresse)),
        slettMidlertidigeAdresser: fødselsnummer => dispatch(slettMidlertidigeAdresser(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdresseFormContainer);