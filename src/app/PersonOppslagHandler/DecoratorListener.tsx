import { RouteComponentProps, withRouter } from 'react-router';
import * as React from 'react';

import { fjernBrukerFraPath, setNyBrukerIPath } from '../routes/routing';

type Props = RouteComponentProps<{}>;

class DecoratorListener extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);

        this.handlePersonsok = this.handlePersonsok.bind(this);
        this.handleFjernPerson = this.handleFjernPerson.bind(this);
    }

    componentDidMount() {
        document.addEventListener('dekorator-hode-fjernperson', this.handleFjernPerson);
        document.addEventListener('dekorator-hode-personsok', this.handlePersonsok);
    }

    componentWillUnmount() {
        document.removeEventListener('dekorator-hode-fjernperson', this.handleFjernPerson);
        document.removeEventListener('dekorator-hode-personsok', this.handlePersonsok);
    }

    handlePersonsok(event: object) {
        const personsokEvent = event as DecoratorPersonsokEvent;
        setNyBrukerIPath(this.props.history, personsokEvent.fodselsnummer);
    }

    handleFjernPerson() {
        fjernBrukerFraPath(this.props.history);
    }

    render() {
        return null;
    }
}

export default withRouter(DecoratorListener);
