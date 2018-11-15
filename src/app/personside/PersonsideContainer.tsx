import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { AppState } from '../../redux/reducers';
import { hentAllPersonData } from '../../redux/restReducers/personinformasjon';
import renderDecoratorHead from '../../decorator';
import Personside from './Personside';

interface RouteProps {
    fodselsnummer: string;
}

interface StateProps {
    fodselsnummer: string;
}

interface DispatchProps {
    hentPerson: (fødselsnummer: string) => void;
}

type PersonsideProps = RouteComponentProps<RouteProps> & StateProps & DispatchProps;

class PersonsideContainer extends React.PureComponent<PersonsideProps> {

    constructor(props: PersonsideProps) {
        super(props);
    }

    componentDidMount() {
        this.hentPersonData(this.props.fodselsnummer);
        renderDecoratorHead(this.props.fodselsnummer);
    }

    componentDidUpdate(prevProps: PersonsideProps, prevState: PersonsideProps) {
        if (prevProps.fodselsnummer !== this.props.fodselsnummer) {
            this.hentPersonData(this.props.fodselsnummer);
            renderDecoratorHead(this.props.fodselsnummer);
        }
    }

    hentPersonData(fødselsnummer: string) {
        this.props.hentPerson(fødselsnummer);
    }

    render() {
        return (
            <Personside/>
        );
    }
}

function mapStateToProps(state: AppState, routeProps: RouteComponentProps<RouteProps>): StateProps {
    const fodselsnummer = routeProps.match.params.fodselsnummer;
    return {
        fodselsnummer
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentPerson: (fødselsnummer: string) => hentAllPersonData(dispatch, fødselsnummer)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (PersonsideContainer));
