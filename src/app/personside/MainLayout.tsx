import * as React from 'react';
import styled from 'styled-components';
import VisittkortContainer from './visittkort/VisittkortContainer';
import Lameller from './lameller/Lameller';
import DialogPanel from './dialogpanel/DialogPanel';

export enum DialogPanelSize {
    Normal,
    Stor
}

const LayoutWrapper = styled.div`
    flex-grow: 1;
    padding: ${props => props.theme.margin.layout};
    animation: ${props => props.theme.animation.fadeIn};
    @media (${props => props.theme.media.wideScreen}) {
      display: flex;
      flex-flow: row nowrap;
    }
`;

const VenstreKolonne = styled.section`
    > * {
      margin-bottom: ${props => props.theme.margin.layout};
      background-color: white;
      border-radius: ${props => props.theme.borderRadius.layout};
    }
    @media (${props => props.theme.media.wideScreen}) {
      flex: 1 1 50%;
      margin-right: ${props => props.theme.margin.layout};
    }
`;

const HøyreKolonne = styled<{ DialogPanelSize?: DialogPanelSize; }, 'section'>('section')`
    > * {
      margin-bottom: ${props => props.theme.margin.layout};
      background-color: white;
      border-radius: ${props => props.theme.borderRadius.layout};
    }
    transition: 1s;
    @media(${props => props.theme.media.wideScreen}) {
      flex: 0 1 ${props => {
        if (props.DialogPanelSize === DialogPanelSize.Normal) {
            return '25%';
        } else {
            return '50%';
        }}}
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
            ? this.setState({dialogPanelSize: DialogPanelSize.Stor})
            : this.setState({dialogPanelSize: DialogPanelSize.Normal});
    }

    render() {
        return (
            <LayoutWrapper>
                <VenstreKolonne>
                    <VisittkortContainer/>
                    <Lameller/>
                </VenstreKolonne>
                <HøyreKolonne DialogPanelSize={this.state.dialogPanelSize}>
                    <DialogPanel
                        onToggleDialogpanel={() => this.handleDialogPanelToggle()}
                        dialogPanelSize={this.state.dialogPanelSize}
                    />
                </HøyreKolonne>
            </LayoutWrapper>
        );
    }
}

export default MainLayout;
