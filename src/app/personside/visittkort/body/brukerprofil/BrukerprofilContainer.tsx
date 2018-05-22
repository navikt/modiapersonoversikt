import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'history';

import { AppState } from '../../../../../redux/reducer';
import { Person, PersonRespons } from '../../../../../models/person/person';
import { EndreNavnRequest } from '../../../../../redux/brukerprofil/endreNavnRequest';
import { endreNavn, reset } from '../../../../../redux/brukerprofil/endreNavn';
import Brukerprofil from './Brukerprofil';
import { STATUS } from '../../../../../redux/utils';

interface DispatchProps {
    endreNavn: (request: EndreNavnRequest) => void;
    resetReducer: () => void;
}

interface BrukerprofilContainerProps {
    person: PersonRespons | undefined;
    status: STATUS;
}

class BrukerprofilContainer extends React.Component<DispatchProps & BrukerprofilContainerProps> {

    render() {
        if (!this.props.person) {
            return <>Ingen person lastet</>;
        }

        return (
            <Brukerprofil
                person={this.props.person as Person}
                endreNavn={this.props.endreNavn}
                status={this.props.status}
                resetReducer={this.props.resetReducer}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        person: state.personinformasjon.data,
        status: state.endreNavn.status
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        endreNavn: (request: EndreNavnRequest) => dispatch(endreNavn(request)),
        resetReducer: () => dispatch(reset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrukerprofilContainer);