import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';

import { AppState, Reducer } from '../../../redux/reducer';
import { plukkOppgave } from '../../../redux/oppgaver';
import { STATUS } from '../../../redux/utils';
import styled from 'styled-components';
import Feilmelding from '../../../components/feilmelding/Feilmelding';
import { Oppgave } from '../../../models/oppgave';
import ComponentPlaceholder from '../../../components/component-placeholder/ComponentPlaceHolder';

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
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.margin.layout};
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.margin.layout};
  }
`;

class DialogPanel extends React.Component<DialogPanelProps> {

    constructor(props: DialogPanelProps) {
        super(props);
        this.onPlukkOppgaver = this.onPlukkOppgaver.bind(this);
    }

    onPlukkOppgaver() {
        this.props.plukkOppgave(this.props.valgtEnhet, this.props.valgtTemagruppe);
    }

    render() {
        return (
            <DialogPanelWrapper>
                <KnappBase
                    type="hoved"
                    onClick={this.onPlukkOppgaver}
                    spinner={this.props.oppgaveReducer.status === STATUS.PENDING}
                >
                    Plukk oppgaver
                </KnappBase>
                <ComponentPlaceholder height={'800px'} name={'Dialog Panel'}/>
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