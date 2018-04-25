import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';

import { AppState, Reducer } from '../../redux/reducer';
import { plukkOppgaver } from '../../redux/oppgaver';
import { settNyPersonIKontekst } from '../routes/routing';
import renderDecoratorHead from '../../decorator';
import { STATUS } from '../../redux/utils';
import StartBildeLayout from './StartBildeLayout';
import Feilmelding from '../../components/feilmelding/Feilmelding';
import { Oppgave } from '../../models/oppgave';

interface StartbildeStateProps {
    valgtEnhet: string;
    valgtTemagruppe: string;
    oppgaveReducer: Reducer<Oppgave[]>;
}

interface DispatchProps {
    plukkOppgaver: (enhet: string, temagruppe: string) => void;
    personOppsokt: (fodselsnummer: string) => void;
}

type StartbildeProps = StartbildeStateProps & DispatchProps;

class Startbilde extends React.Component<StartbildeProps> {

    constructor(props: StartbildeProps) {
        super(props);
        this.onPlukkOppgaveKlikk = this.onPlukkOppgaveKlikk.bind(this);
        this.handlePersonsok = this.handlePersonsok.bind(this);
    }

    componentDidMount() {
        document.addEventListener('dekorator-hode-personsok', this.handlePersonsok);
    }

    componentWillUnmount() {
        document.removeEventListener('dekorator-hode-personsok', this.handlePersonsok);
    }

    onPlukkOppgaveKlikk() {
        this.props.plukkOppgaver(this.props.valgtEnhet, this.props.valgtTemagruppe);
    }

    handlePersonsok(event: object) {
        const personsokEvent = event as DecoratorPersonsokEvent;
        this.props.personOppsokt(personsokEvent.fodselsnummer);
        renderDecoratorHead(personsokEvent.fodselsnummer);
    }

    snarveiTilAremark() {
        this.props.personOppsokt('10108000398');
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
                    spinner={this.props.oppgaveReducer.status === STATUS.PENDING}
                >
                    Plukk en oppgave!
                </KnappBase>
                <Feilmelding reducer={this.props.oppgaveReducer}/>
            </StartBildeLayout>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        valgtEnhet: '4100',
        valgtTemagruppe: 'ARBD',
        oppgaveReducer: state.oppgaver
    };
}

function mapDispatchToProps(dispatch: Dispatch<object>): DispatchProps {
    return {
        plukkOppgaver: () => plukkOppgaver(dispatch, '1337', 'ARB'),
        personOppsokt: (fodselsnummer: string) => settNyPersonIKontekst(dispatch, fodselsnummer)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Startbilde);