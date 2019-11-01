import * as React from 'react';
import PilKnapp from '../../components/pilknapp';
import { toggleDialogpanel } from '../../redux/uiReducers/UIReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import styled from 'styled-components';
import theme, { pxToRem } from '../../styles/personOversiktTheme';

const Style = styled.div`
    padding: 0.4rem;
    background-color: white;
    border-top: ${theme.border.skilleSvak};
`;

function EkspanderDilaogpanelKnapp() {
    const dialogpanelErEkspandert = useSelector((state: AppState) => state.ui.dialogPanel.ekspandert);
    const dispatch = useDispatch();
    return (
        <Style>
            <PilKnapp
                width={pxToRem(30)}
                beskrivelse={dialogpanelErEkspandert ? 'Skjul oppgavepanel' : 'Vis oppgavepanel'}
                direction={dialogpanelErEkspandert ? 'right' : 'left'}
                onClick={() => dispatch(toggleDialogpanel())}
            />
        </Style>
    );
}

export default EkspanderDilaogpanelKnapp;
