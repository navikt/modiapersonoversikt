import * as React from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';

import AlertStripe from 'nav-frontend-alertstriper';

import { Person } from '../../../models/person/person';
import { AppState, RestReducer } from '../../../redux/reducer';
import { KodeverkResponse } from '../../../models/kodeverk';
import Innholdslaster from '../../../components/Innholdslaster';
import { hentPostnummere } from '../../../redux/kodeverk/postnummerReducer';
import { STATUS } from '../../../redux/utils';
import AdresseForm from './AdresseForm';

interface StateProps {
    postnummerReducer: RestReducer<KodeverkResponse>;
}

interface DispatchProps {
    hentPostnummerKodeverk: () => void;
}

function AdresseFormWrapper(props: {postnummer: KodeverkResponse | undefined, person: Person}) {
    if (!props.postnummer) {
        return <AlertStripe type={'stopp'}>Klarte ikke hente kodeverk for postnummer</AlertStripe>;
    }
    return <AdresseForm person={props.person} postnummer={props.postnummer}/>;
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
                <AdresseFormWrapper postnummer={this.props.postnummerReducer.data} person={this.props.person}/>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        postnummerReducer: state.postnummerReducer
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentPostnummerKodeverk: () => dispatch(hentPostnummere())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdresseFormContainer);