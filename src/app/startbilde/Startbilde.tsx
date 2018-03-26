import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';

import { AppState, Reducer } from '../../redux/reducer';
import { plukkOppgave } from '../../redux/oppgaver';
import { paths } from '../routes/routing';
import { push } from 'react-router-redux';
import renderDecoratorHead from '../../menyConfig';
import { STATUS } from '../../redux/utils';
import Feilmelding from '../../components/feilmelding/Feilmelding';
import { Oppgave } from '../../models/oppgave';

interface StartbildeStateProps {
    valgtEnhet: string;
    valgtTemagruppe: string;
    oppgaveReducer: Reducer<Oppgave[]>;
}

interface DispatchProps {
    plukkOppgave: (enhet: string, temagruppe: string) => void;
    personOppsokt: (fodselsnummer: string) => void;
}

type StartbildeProps = StartbildeStateProps & DispatchProps;

function snarveiTilAremark() {
    location.href = location.href + 'person/10108000398';
}

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
        this.props.plukkOppgave(this.props.valgtEnhet, this.props.valgtTemagruppe);
    }

    handlePersonsok(event: object) {
        const personsokEvent = event as DecoratorPersonsokEvent;
        this.props.personOppsokt(personsokEvent.fodselsnummer);
        renderDecoratorHead(personsokEvent.fodselsnummer);
    }

    render() {
        return (
            <div className="startbilde">
                <KnappBase onClick={() => snarveiTilAremark()} type="hoved">
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
            </div>
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
        plukkOppgave: (enhet: string, temagruppe: string) => dispatch(plukkOppgave(enhet, temagruppe)),
        personOppsokt: (fodselsnummer: string) => dispatch(push(`${paths.personUri}/${fodselsnummer}`))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Startbilde);