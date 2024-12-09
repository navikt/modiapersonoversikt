import styled from 'styled-components';
import PilKnapp from '../../components/pilknapp';
import { useDialogpanelState } from '../../context/dialogpanel-state';
import theme, { pxToRem } from '../../styles/personOversiktTheme';
import { loggEvent } from '../../utils/logger/frontendLogger';
import CogKnapp from '../innstillinger/cogknapp';

const Style = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
    background-color: white;
    border-top: ${theme.border.skilleSvak};
`;

function EkspanderDilaogpanelKnapp() {
    const dialogpanel = useDialogpanelState();
    const dialogpanelErEkspandert = dialogpanel.apent;

    const handleClick = () => {
        loggEvent('Toggle', 'MinimerDialogpanel');
        dialogpanel.toggle();
    };

    return (
        <Style>
            <PilKnapp
                width={pxToRem(30)}
                beskrivelse={dialogpanelErEkspandert ? 'Skjul oppgavepanel' : 'Vis oppgavepanel'}
                direction={dialogpanelErEkspandert ? 'right' : 'left'}
                onClick={handleClick}
            />
            <CogKnapp width={pxToRem(30)} beskrivelse="Vis innstillinger" />
        </Style>
    );
}

export default EkspanderDilaogpanelKnapp;
