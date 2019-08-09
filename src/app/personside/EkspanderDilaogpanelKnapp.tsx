import * as React from 'react';
import PilKnapp from '../../components/pilknapp';
import { toggleDialogpanel } from '../../redux/uiReducers/UIReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import styled from 'styled-components';

const Style = styled.div`
    padding: 0.4rem;
    background-color: white;
`;

function EkspanderDilaogpanelKnapp() {
    const dialogpanelErEkspandert = useSelector((state: AppState) => state.ui.dialogPanel.ekspandert);
    const dispatch = useDispatch();
    return (
        <Style>
            <PilKnapp
                width="30px"
                beskrivelse={dialogpanelErEkspandert ? 'Skjul dialogpanel' : 'Vis dialogpanel'}
                direction={dialogpanelErEkspandert ? 'right' : 'left'}
                onClick={() => dispatch(toggleDialogpanel())}
            />
        </Style>
    );
}

export default EkspanderDilaogpanelKnapp;
