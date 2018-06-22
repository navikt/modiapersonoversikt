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
import { endreNorskGateadresse } from '../../../redux/brukerprofil/endreAdresseReducer';
import { GateadresseSkjemainput } from './GateadresseForm';

interface StateProps {
    postnummerReducer: RestReducer<KodeverkResponse>;
    endreAdresseReducer: RestReducer<{}>;
}

interface DispatchProps {
    hentPostnummerKodeverk: () => void;
    endreNorskGateadresse: (fødselsnummer: string, gateadresse: GateadresseSkjemainput) => void;
}

class AdresseFormContainer extends React.Component<StateProps & DispatchProps & {person: Person}> {

    componentDidMount() {
        if (this.props.postnummerReducer.status === STATUS.NOT_STARTED) {
            this.props.hentPostnummerKodeverk();
        }
    }

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.postnummerReducer]}>
                <AdresseForm
                    person={this.props.person}
                    endreNorskGateadresse={this.props.endreNorskGateadresse}
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
        endreNorskGateadresse: (fødselsnummer: string, gateadresse: GateadresseSkjemainput) =>
            dispatch(endreNorskGateadresse(fødselsnummer, gateadresse))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdresseFormContainer);