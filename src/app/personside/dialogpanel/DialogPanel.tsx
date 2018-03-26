import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';

import { AppState, Reducer } from '../../../redux/reducer';
import { plukkOppgave } from '../../../redux/oppgaver';
import { STATUS } from '../../../redux/utils';
import styled from 'styled-components';
import Feilmelding from '../../../components/feilmelding/Feilmelding';
import { Oppgave } from '../../../models/oppgave';

interface StateProps {
    valgtEnhet: string;
    valgtTemagruppe: string;
    oppgaveReducer: Reducer<Oppgave[]>;
}

interface DispatchProps {
    plukkOppgave: (enhet: string, temagruppe: string) => void;
}

type DialogPanelProps = StateProps & DispatchProps;

const DialogPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
    `;

const KnappWrapper = styled.div`
    justify-content: center;
    display: flex;
    padding-bottom: 15px;

`;

class DialogPanel extends React.Component<DialogPanelProps> {

    constructor(props: DialogPanelProps) {
        super(props);
        this.onPlukkOppgaveKlikk = this.onPlukkOppgaveKlikk.bind(this);
    }

    onPlukkOppgaveKlikk() {
        this.props.plukkOppgave(this.props.valgtEnhet, this.props.valgtTemagruppe);
    }

    render() {
        return (
            <DialogPanelWrapper>
                <KnappWrapper>
                    <KnappBase
                        type="hoved"
                        onClick={this.onPlukkOppgaveKlikk}
                        spinner={this.props.oppgaveReducer.status === STATUS.PENDING}
                    >
                        Plukk oppgaver
                    </KnappBase>
                </KnappWrapper>
                <Feilmelding reducer={this.props.oppgaveReducer}/>
            </DialogPanelWrapper>
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
        plukkOppgave: (enhet: string, temagruppe: string) => dispatch(plukkOppgave(enhet, temagruppe))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogPanel);