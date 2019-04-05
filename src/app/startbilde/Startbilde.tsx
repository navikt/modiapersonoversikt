import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { History } from 'history';
import KnappBase from 'nav-frontend-knapper';

import { AppState } from '../../redux/reducers';
import { plukkOppgaver, selectFodselsnummerfraOppgaver } from '../../redux/restReducers/oppgaver';
import StartBildeLayout from './StartBildeLayout';
import ResourceFeilmelding from '../../components/feilmelding/ResourceFeilmelding';
import { Oppgave } from '../../models/oppgave';
import { paths, setNyBrukerIPath } from '../routes/routing';
import { isLoading, DeprecatedRestResource } from '../../redux/restReducers/deprecatedRestResource';
import { AsyncDispatch } from '../../redux/ThunkTypes';
import { aremark } from '../../mock/person/aremark';
import { moss } from '../../mock/person/moss';

interface StartbildeStateProps {
    valgtEnhet: string;
    valgtTemagruppe: string;
    oppgaveResource: DeprecatedRestResource<Oppgave[]>;
    routeHistory: History;
}

interface DispatchProps {
    plukkOppgaver: (enhet: string, temagruppe: string) => Promise<Oppgave[]>;
}

type StartbildeProps = StartbildeStateProps & DispatchProps & RouteComponentProps<{}>;

class Startbilde extends React.Component<StartbildeProps> {
    constructor(props: StartbildeProps) {
        super(props);
        this.onPlukkOppgaveKlikk = this.onPlukkOppgaveKlikk.bind(this);
    }

    onPlukkOppgaveKlikk() {
        this.props.plukkOppgaver(this.props.valgtEnhet, this.props.valgtTemagruppe).then((oppgaver: Oppgave[]) => {
            const fødselsnummer = selectFodselsnummerfraOppgaver(oppgaver);
            if (!fødselsnummer) {
                throw new Error('Ingen oppgave ble returnert når oppgaver ble plukket');
            }
            setNyBrukerIPath(this.props.history, fødselsnummer);
        });
    }

    snarveiTilAremark() {
        setNyBrukerIPath(this.props.history, aremark.fødselsnummer);
    }

    snarveiTilMoss() {
        setNyBrukerIPath(this.props.history, moss.fødselsnummer);
    }

    render() {
        return (
            <StartBildeLayout>
                <KnappBase onClick={() => this.snarveiTilAremark()} type="hoved">
                    Snarvei til Aremark!
                </KnappBase>
                <KnappBase onClick={() => this.snarveiTilMoss()} type="hoved">
                    Snarvei til Moss!
                </KnappBase>
                <KnappBase onClick={() => this.props.history.push(paths.standaloneKomponenter)} type="hoved">
                    Snarvei til standalone-komponenter
                </KnappBase>
                <KnappBase
                    type="hoved"
                    onClick={this.onPlukkOppgaveKlikk}
                    spinner={isLoading(this.props.oppgaveResource)}
                >
                    Hent oppgave
                </KnappBase>
                <ResourceFeilmelding resource={this.props.oppgaveResource} />
            </StartBildeLayout>
        );
    }
}

function mapStateToProps(state: AppState, routeProps: RouteComponentProps<{}>): StartbildeStateProps {
    return {
        valgtEnhet: '4100',
        valgtTemagruppe: '',
        oppgaveResource: state.restResources.oppgaver,
        routeHistory: routeProps.history
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        plukkOppgaver: () => dispatch(plukkOppgaver(''))
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Startbilde)
);
