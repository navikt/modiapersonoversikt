import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';

import { AppState, Reducer } from '../../../redux/reducer';
import { plukkOppgaver } from '../../../redux/oppgaver';
import { STATUS } from '../../../redux/utils';
import styled from 'styled-components';
import Feilmelding from '../../../components/feilmelding/Feilmelding';
import { Oppgave } from '../../../models/oppgave';
import ComponentPlaceholder from '../../../components/component-placeholder/ComponentPlaceHolder';
import PilKnapp from '../../../components/pilknapp';
import { DialogPanelSize } from '../MainLayout';

interface StateProps {
    valgtEnhet: string;
    valgtTemagruppe: string;
    oppgaveReducer: Reducer<Oppgave[]>;
}

interface OwnProps {
    onToggleDialogpanel: (event: React.MouseEvent<HTMLButtonElement>) => void;
    dialogPanelSize: DialogPanelSize;
}

interface DispatchProps {
    plukkOppgaver: (enhet: string, temagruppe: string) => void;
}

type DialogPanelProps = StateProps & DispatchProps & OwnProps;

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

const Knapperad = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > *:last-child {
    flex-grow: 1;
    margin-left: 2em;
  }
`;

class DialogPanel extends React.Component<DialogPanelProps> {

    constructor(props: DialogPanelProps) {
        super(props);
        this.onPlukkOppgaver = this.onPlukkOppgaver.bind(this);
    }

    onPlukkOppgaver() {
        this.props.plukkOppgaver(this.props.valgtEnhet, this.props.valgtTemagruppe);
    }

    render() {
        return (
            <DialogPanelWrapper>
                <Knapperad>
                    <PilKnapp
                        width="30px"
                        direction={this.props.dialogPanelSize === DialogPanelSize.Normal ? 'left' : 'right'}
                        onClick={this.props.onToggleDialogpanel}
                    />
                    <KnappBase
                        type="hoved"
                        onClick={this.onPlukkOppgaver}
                        spinner={this.props.oppgaveReducer.status === STATUS.PENDING}
                    >
                        Hent oppgave
                    </KnappBase>
                </Knapperad>
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
        plukkOppgaver: (enhet, temagruppe) => plukkOppgaver(dispatch, enhet, temagruppe)
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(DialogPanel);