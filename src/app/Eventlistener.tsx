import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { History } from 'history';
import * as React from 'react';

import { paths, settPersonIKontekst } from './routes/routing';
import { AppState } from '../redux/reducers';

interface StateProps {
    history: History;
}

type Props = StateProps & RouteComponentProps<{}>;

class Eventlistener extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);

        this.handlePersonsok = this.handlePersonsok.bind(this);
        this.fjernPersonFraContext = this.fjernPersonFraContext.bind(this);
    }

    componentDidMount() {
        document.addEventListener('dekorator-hode-fjernperson', this.fjernPersonFraContext);
        document.addEventListener('dekorator-hode-personsok', this.handlePersonsok);
    }

    componentWillUnmount() {
        document.removeEventListener('dekorator-hode-fjernperson', this.fjernPersonFraContext);
        document.removeEventListener('dekorator-hode-personsok', this.handlePersonsok);
    }

    handlePersonsok(event: object) {
        const personsokEvent = event as DecoratorPersonsokEvent;
        settPersonIKontekst(this.props.history, personsokEvent.fodselsnummer);
    }

    fjernPersonFraContext() {
        this.props.history.push(`${paths.basePath}`);
    }

    render() {
        return null;
    }
}

function mapStateToProps(state: AppState, routeProps: RouteComponentProps<{}>): StateProps {
    return {
        history: routeProps.history
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(Eventlistener)
);
