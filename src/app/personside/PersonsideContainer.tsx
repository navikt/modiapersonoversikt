import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';

import { AppState } from '../../redux/reducer';
import { hentAllPersonData } from '../../redux/personinformasjon';
import renderDecoratorHead from '../../decorator';
import Personside from './Personside';
import { fjernPersonFraKontekst, settNyPersonIKontekst } from '../routes/routing';

interface RouteProps {
    fodselsnummer: string;
}

interface StateProps {
    fodselsnummer: string;
}

interface DispatchProps {
    hentPerson: (fødselsnummer: string) => void;
    fjernPersonFraContext: () => void;
    personOppsokt: (fodselsnummer: string) => void;
}

type PersonsideProps = RouteComponentProps<RouteProps> & StateProps & DispatchProps;

class PersonsideContainer extends React.PureComponent<PersonsideProps> {

    constructor(props: PersonsideProps) {
        super(props);
        this.handlePersonsok = this.handlePersonsok.bind(this);
    }

    componentDidMount() {
        this.hentPersonData(this.props.fodselsnummer);
        renderDecoratorHead(this.props.fodselsnummer);

        document.addEventListener('dekorator-hode-fjernperson', this.props.fjernPersonFraContext);
        document.addEventListener('dekorator-hode-personsok', this.handlePersonsok);
    }

    componentWillUnmount() {
        document.removeEventListener('dekorator-hode-fjernperson', this.props.fjernPersonFraContext);
        document.removeEventListener('dekorator-hode-personsok', this.handlePersonsok);
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

    handlePersonsok(event: object) {
        const personsokEvent = event as DecoratorPersonsokEvent;
        this.props.personOppsokt(personsokEvent.fodselsnummer);
    }

    render() {
        return (
            <Personside/>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: RouteComponentProps<RouteProps>): StateProps {
    const routeParams = ownProps.match.params;
    const fodselsnummer = routeParams.fodselsnummer;

    return {
        fodselsnummer
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentPerson: (fødselsnummer: string) => hentAllPersonData(dispatch, fødselsnummer),
        fjernPersonFraContext: () => fjernPersonFraKontekst(dispatch),
        personOppsokt: (fødselsnummer: string) => {
            settNyPersonIKontekst(dispatch, fødselsnummer);
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (PersonsideContainer));
