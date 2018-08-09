import * as React from 'react';
import styled from 'styled-components';
import VisittkortContainer from './visittkort/VisittkortContainer';
import InfoTabsContainer from './infotabs/InfotabsContainer';
import DialogPanel from './dialogpanel/DialogPanel';
import PilKnapp from '../../components/pilknapp';
import HentOppgaveKnapp from './dialogpanel/HentOppgaveKnapp';

enum DialogPanelSize {
    Normal,
    Stor
}

const LayoutWrapper = styled.div`
    width: 100vw;
    flex-grow: 1;
    animation: ${props => props.theme.animation.fadeIn};
    display: flex;
    flex-flow: row nowrap;
`;

const VenstreKolonne = styled<{ dialogPanelSize?: DialogPanelSize; }, 'section'>('section')`
    width: ${props => props.dialogPanelSize === DialogPanelSize.Normal ? '70%' : '50%' };
    transition: .5s ease-out;
    padding: ${props => props.theme.margin.layout};
    overflow-y: scroll;
    > * {
      margin-bottom: ${props => props.theme.margin.layout};
      border-radius: ${props => props.theme.borderRadius.layout};
    }
`;

const HøyreKolonne = styled<{ dialogPanelSize?: DialogPanelSize; }, 'section'>('section')`
    width: ${props => props.dialogPanelSize === DialogPanelSize.Normal ? '30%' : '50%' };
    transition: .5s ease-out;
    overflow-y: scroll;
    background-color: #d8d8d8;
    display: flex;
    flex-flow: column nowrap;
    > * {
        padding: ${props => props.theme.margin.layout};
        flex-shrink: 0;
    }
`;

interface Props {
}

interface State {
    dialogPanelSize: DialogPanelSize;
}

class MainLayout extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            dialogPanelSize: DialogPanelSize.Normal
        };
    }

    handleDialogPanelToggle() {
        this.state.dialogPanelSize === DialogPanelSize.Normal
            ? this.setState({ dialogPanelSize: DialogPanelSize.Stor })
            : this.setState({ dialogPanelSize: DialogPanelSize.Normal });
    }

    render() {
        return (
            <LayoutWrapper>
                <VenstreKolonne dialogPanelSize={this.state.dialogPanelSize}>
                    <VisittkortContainer/>
                    <InfoTabsContainer/>
                </VenstreKolonne>
                <HøyreKolonne dialogPanelSize={this.state.dialogPanelSize}>
                    <HentOppgaveKnapp/>
                    <DialogPanel/>
                    <div>
                        <PilKnapp
                            width="30px"
                            direction={this.state.dialogPanelSize === DialogPanelSize.Normal ? 'left' : 'right'}
                            onClick={() => this.handleDialogPanelToggle()}
                        />
                    </div>
                </HøyreKolonne>
            </LayoutWrapper>
        );
    }
}

export default MainLayout;
