import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router';

import KnappBase from 'nav-frontend-knapper';

import { AppState } from '../../redux/reducers';
import { selectFodselsnummerfraOppgaver, plukkOppgaver } from '../../redux/restReducers/oppgaver';
import { STATUS } from '../../redux/restReducers/utils';
import StartBildeLayout from './StartBildeLayout';
import ReducerFeilmelding from '../../components/feilmelding/ReducerFeilmelding';
import { Oppgave } from '../../models/oppgave';
import { settPersonIKontekst } from '../routes/routing';
import { RestReducer } from '../../redux/restReducers/restReducer';

interface StartbildeStateProps {
    valgtEnhet: string;
    valgtTemagruppe: string;
    oppgaveReducer: RestReducer<Oppgave[]>;
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
            settPersonIKontekst(this.props.history, fødselsnummer);
        });
    }

    snarveiTilAremark() {
        settPersonIKontekst(this.props.history, '10108000398');
    }

    render() {
        return (
            <StartBildeLayout>
                <KnappBase onClick={() => this.snarveiTilAremark()} type="hoved">
                    Snarvei til Aremark!
                </KnappBase>
                <KnappBase
                    type="hoved"
                    onClick={this.onPlukkOppgaveKlikk}
                    spinner={this.props.oppgaveReducer.status === STATUS.LOADING}
                >
                    Hent oppgave
                </KnappBase>
                <ReducerFeilmelding reducer={this.props.oppgaveReducer}/>
            </StartBildeLayout>
        );
    }
}

function mapStateToProps(state: AppState, routeProps: RouteComponentProps<{}>): StartbildeStateProps {
    return {
        valgtEnhet: '4100',
        valgtTemagruppe: state.valgtTemagruppe,
        oppgaveReducer: state.restEndepunkter.oppgaver,
        routeHistory: routeProps.history
    };
}

function mapDispatchToProps(dispatch: Dispatch<Oppgave[]>): DispatchProps {
    return {
        plukkOppgaver: () => dispatch(plukkOppgaver('')),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Startbilde));