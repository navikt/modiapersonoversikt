import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';

import VisittkortContainer from '../visittkort/visittkort-container';
import Innholdslaster from '../../innholdslaster';
import { AppState, Reducer } from '../../redux/reducer';
import { Person } from '../../models/person';
import { hentPerson } from '../../ducks/person';

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
            <div className="content">
                <Innholdslaster avhengigheter={[this.props.personReducer]}><VisittkortContainer/></Innholdslaster>
            </div>
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
