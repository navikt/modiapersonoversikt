import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';

import Innholdslaster from '../../innholdslaster';
import { AppState, Reducer } from '../../redux/reducer';
import { Person } from '../../models/person';
import { hentPerson } from '../../ducks/person';
import MainLayout from '../layout/MainLayout';

interface PersonsideRouteProps {
    fodselsnummer: string;
}

interface PersonsideStateProps {
    fodselsnummer: string;
    personReducer: Reducer<Person>;
}

interface DispatchProps {
    hentPerson: (fodselsnummer: string) => void;
}

type PersonsideProps = RouteComponentProps<PersonsideRouteProps> & PersonsideStateProps & DispatchProps;

class Personside extends React.PureComponent<PersonsideProps> {

    constructor(props: PersonsideProps) {
        super(props);
    }

    componentDidMount() {
        this.props.hentPerson(this.props.fodselsnummer);
    }

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.personReducer]}>
                <MainLayout />
            </Innholdslaster>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: RouteComponentProps<PersonsideRouteProps>): PersonsideStateProps {
    const routeParams = ownProps.match.params;
    const fodselsnummer = routeParams.fodselsnummer;

    return {
        fodselsnummer,
        personReducer: state.person
    };
}

function mapDispatchToProps(dispatch: Dispatch<object>): DispatchProps {
    return {
        hentPerson: (fodselsnummer: string) => dispatch(hentPerson(fodselsnummer))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Personside));
