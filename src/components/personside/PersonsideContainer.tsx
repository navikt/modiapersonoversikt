import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';

import { AppState } from '../../redux/reducer';
import { hentPerson } from '../../ducks/personinformasjon';
import renderDecoratorHead from '../../menyConfig';
import { paths } from '../../routes/routing';
import Personside from './Personside';

interface RouteProps {
    fodselsnummer: string;
}

interface StateProps {
    fodselsnummer: string;
}

interface DispatchProps {
    hentPerson: (fodselsnummer: string) => void;
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
        this.props.hentPerson(this.props.fodselsnummer);
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
            this.props.hentPerson(this.props.fodselsnummer);
        }
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

function mapDispatchToProps(dispatch: Dispatch<object>): DispatchProps {
    return {
        hentPerson: (fodselsnummer: string) => dispatch(hentPerson(fodselsnummer)),
        fjernPersonFraContext: () => dispatch(push('/')),
        personOppsokt: (fodselsnummer: string) => {
            dispatch(push(`${paths.personUri}/${fodselsnummer}`));
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (PersonsideContainer));
