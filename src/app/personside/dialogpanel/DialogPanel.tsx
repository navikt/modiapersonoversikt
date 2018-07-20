import * as React from 'react';
import styled from 'styled-components';
import PilKnapp from '../../../components/pilknapp';
import { DialogPanelSize } from '../MainLayout';
import HentOppgaveKnapp from './HentOppgaveKnapp';

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
  justify-content: space-between;
`;

interface DialogPanelProps {
    onToggleDialogpanel: (event: React.MouseEvent<HTMLButtonElement>) => void;
    dialogPanelSize: DialogPanelSize;
}

class DialogPanel extends React.Component<DialogPanelProps> {

    render() {
        return (
            <DialogPanelWrapper>
                <Knapperad>
                    <PilKnapp
                        width="30px"
                        direction={this.props.dialogPanelSize === DialogPanelSize.Normal ? 'left' : 'right'}
                        onClick={this.props.onToggleDialogpanel}
                    />
                    <HentOppgaveKnapp/>
                </Knapperad>
            </DialogPanelWrapper>
        );
    }
}

export default DialogPanel;