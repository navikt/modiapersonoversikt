import * as React from 'react';
import InfoTabsContainer from './infotabs/InfotabsContainer';
import DialogPanel from './dialogpanel/DialogPanel';
import PilKnapp from '../../components/pilknapp';
import HentOppgaveKnapp from './dialogpanel/HentOppgaveKnapp';
import Visittkort from './visittkort/VisittkortContainer';
import { toggleDialogpanel, UIState } from '../../redux/uiReducers/UIReducer';
import { AppState } from '../../redux/reducers';
import { connect, Dispatch } from 'react-redux';
import { HøyreKolonne, LayoutWrapper, VenstreKolonne } from './MainLayoutStyles';

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
            <LayoutWrapper>
                <VenstreKolonne dialogPanelEkspandert={this.props.UI.dialogPanel.ekspandert}>
                    <Visittkort/>
                    <InfoTabsContainer/>
                </VenstreKolonne>
                <HøyreKolonne dialogPanelEkspandert={this.props.UI.dialogPanel.ekspandert}>
                    <HentOppgaveKnapp/>
                    <DialogPanel/>
                    <div>
                        <PilKnapp
                            width="30px"
                            direction={this.props.UI.dialogPanel.ekspandert ? 'right' : 'left'}
                            onClick={() => this.props.toggleDialogpanel()}
                        />
                    </div>
                </HøyreKolonne>
            </LayoutWrapper>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        UI: state.ui,
    };
}

function mapDispatchToProps(dispatch: Dispatch<{}>): DispatchProps {
    return {
        toggleDialogpanel: () => dispatch(toggleDialogpanel())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
