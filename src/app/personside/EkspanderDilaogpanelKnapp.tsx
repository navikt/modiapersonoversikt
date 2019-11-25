import * as React from 'react';
import PilKnapp from '../../components/pilknapp';
import { toggleDialogpanel } from '../../redux/uiReducers/UIReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import styled from 'styled-components';
import theme, { pxToRem } from '../../styles/personOversiktTheme';
import { loggEvent } from '../../utils/frontendLogger';

const Style = styled.div`
    padding: 0.4rem;
    background-color: white;
    border-top: ${theme.border.skilleSvak};
`;

function EkspanderDilaogpanelKnapp() {
    const dialogpanelErEkspandert = useSelector((state: AppState) => state.ui.dialogPanel.ekspandert);
    const dispatch = useDispatch();

    const handleClick = () => {
        loggEvent('Toggle', 'MinimerDialogpanel');
        return dispatch(toggleDialogpanel());
    };

    return (
        <Style>
            <PilKnapp
                width={pxToRem(30)}
                beskrivelse={dialogpanelErEkspandert ? 'Skjul oppgavepanel' : 'Vis oppgavepanel'}
                direction={dialogpanelErEkspandert ? 'right' : 'left'}
                onClick={handleClick}
            />
        </Style>
    );
}

export default EkspanderDilaogpanelKnapp;
