import * as React from 'react';
import InfoTabsContainer from './infotabs/InfotabsContainer';
import DialogPanel from './dialogpanel/DialogPanel';
import PilKnapp from '../../components/pilknapp';
import HentOppgaveKnapp from './dialogpanel/HentOppgaveKnapp';
import Visittkort from './visittkort/VisittkortContainer';
import { toggleDialogpanel, UIState } from '../../redux/uiReducers/UIReducer';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { LayoutWrapper } from './MainLayoutStyles';
import { HøyreKolonne, SmallScreenToggleButton, VenstreKolonne } from './ResponsiveMainLayoutStyles';
import { AsyncDispatch } from '../../redux/ThunkTypes';
import Kontrollsporsmal from './kontrollsporsmal/Kontrollsporsmal';

interface StateProps {
    UI: UIState;
}

interface DispatchProps {
    toggleDialogpanel: () => void;
}

type Props = StateProps & DispatchProps;

class MainLayout extends React.Component<Props> {
    render() {
        return (
            <LayoutWrapper role="main">
                <VenstreKolonne dialogPanelEkspandert={this.props.UI.dialogPanel.ekspandert}>
                    <Kontrollsporsmal />
                    <Visittkort />
                    <InfoTabsContainer />
                </VenstreKolonne>
                <HøyreKolonne
                    role="region"
                    aria-label="Oppgavepanel"
                    dialogPanelEkspandert={this.props.UI.dialogPanel.ekspandert}
                >
                    <HentOppgaveKnapp />
                    <DialogPanel />
                    <div>
                        <PilKnapp
                            width="30px"
                            beskrivelse={this.props.UI.dialogPanel.ekspandert ? 'Skjul dialogpanel' : 'Vis dialogpanel'}
                            direction={this.props.UI.dialogPanel.ekspandert ? 'right' : 'left'}
                            onClick={() => this.props.toggleDialogpanel()}
                        />
                    </div>
                </HøyreKolonne>
                <SmallScreenToggleButton UI={this.props.UI} toggleDialogpanel={this.props.toggleDialogpanel} />
            </LayoutWrapper>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        UI: state.ui
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        toggleDialogpanel: () => dispatch(toggleDialogpanel())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainLayout);
