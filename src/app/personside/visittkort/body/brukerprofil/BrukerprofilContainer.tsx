import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'history';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppState, Reducer } from '../../../../../redux/reducer';
import {
    BegrensetTilgang,
    erPersonResponsAvTypeBegrensetTilgang,
    Person,
    PersonRespons
} from '../../../../../models/person/person';
import { EndreNavnRequest } from '../../../../../redux/brukerprofil/endreNavnRequest';
import { endreNavn, reset } from '../../../../../redux/brukerprofil/endreNavn';
import Brukerprofil from './Brukerprofil';
import { STATUS } from '../../../../../redux/utils';
import BegrensetTilgangSide from '../../../BegrensetTilgangSide';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { hentPerson, personinformasjonActionNames } from '../../../../../redux/personinformasjon';

interface DispatchProps {
    endreNavn: (request: EndreNavnRequest) => void;
    resetEndreNavnReducer: () => void;
    hentPersonData: (fødselsnummer: string) => void;
}

interface BrukerprofilContainerProps {
    personReducer: Reducer<PersonRespons>;
    status: STATUS;
    fødselsnummer: string;
}

interface RouteProps {
    fodselsnummer: string;
}

type props = RouteComponentProps<RouteProps> & BrukerprofilContainerProps & DispatchProps;

class BrukerprofilContainer extends React.Component<props> {

    componentDidMount() {
        if (this.props.personReducer.status === personinformasjonActionNames.INITIALIZED) {
            this.props.hentPersonData(this.props.fødselsnummer);
        }
    }

    getSideinnhold() {
        const data = this.props.personReducer.data;

        if (data !== undefined && erPersonResponsAvTypeBegrensetTilgang(data)) {
            return (
                <BegrensetTilgangSide person={data as BegrensetTilgang}/>
            );
        } else {
            return (
                <>
                    <Brukerprofil
                        person={this.props.personReducer.data as Person}
                        endreNavn={this.props.endreNavn}
                        status={this.props.status}
                        resetEndreNavnReducer={this.props.resetEndreNavnReducer}
                    />
                </>
            );
        }
    }

    render() {
        return (
            <Innholdslaster
                avhengigheter={[this.props.personReducer]}
            >
                {this.getSideinnhold()}
            </Innholdslaster>

        );
    }
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps<RouteProps>): BrukerprofilContainerProps => {
    return ({
        personReducer: state.personinformasjon,
        status: state.endreNavn.status,
        fødselsnummer: ownProps.match.params.fodselsnummer
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        endreNavn: (request: EndreNavnRequest) => dispatch(endreNavn(request)),
        resetEndreNavnReducer: () => dispatch(reset()),
        hentPersonData: (fødselsnummer => dispatch(hentPerson(fødselsnummer, dispatch)))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (BrukerprofilContainer));