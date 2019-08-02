import * as React from 'react';
import styled from 'styled-components';
import PilKnapp from '../../components/pilknapp';
import { HøyreKolonne as HøyreKolonneBase, VenstreKolonne as VenstreKolonneBase } from './MainLayoutStyles';
import { Undertittel } from 'nav-frontend-typografi';
import theme from '../../styles/personOversiktTheme';
import { UIState } from '../../redux/uiReducers/UIReducer';
// const Typo = require('nav-frontend-typografi');
//
// console.log('Undertittel IMPOT', Typo);

export const VenstreKolonne = styled(VenstreKolonneBase)`
    @media (${theme.media.smallScreen}) {
        ${props => (props.dialogPanelEkspandert ? theme.visuallyHidden : 'flex-grow: 1;')}
    }
    order: 1;
`;

export const HøyreKolonne = styled(HøyreKolonneBase)`
    @media (${theme.media.smallScreen}) {
        ${props => (props.dialogPanelEkspandert ? 'flex-grow: 1;' : theme.visuallyHidden)}
        > *:last-child {
            display: none;
        }
    }
    order: 2;
`;

const SideKnappContainer = styled.nav<{ stickToRight: boolean }>`
    display: flex;
    @media not all and (${theme.media.smallScreen}) {
        display: none;
    }
    @media print {
        display: none;
    }
    order: ${props => (props.stickToRight ? 4 : 0)};
    align-items: center;
    background-color: #7f7f7f;
    padding: 0.5em;
    overflow: hidden;
    cursor: pointer;
`;

const KnappWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

const Tittel = styled.div`
    writing-mode: vertical-rl;
    text-transform: uppercase;
    text-orientation: mixed;
    margin-bottom: 1em;
`;

export function SmallScreenToggleButton(props: { UI: UIState; toggleDialogpanel: Function }) {
    console.log('Test', Undertittel);
    return (
        <SideKnappContainer onClick={() => props.toggleDialogpanel()} stickToRight={!props.UI.dialogPanel.ekspandert}>
            <KnappWrapper>
                <Tittel>
                    <Undertittel>{props.UI.dialogPanel.ekspandert ? 'Oversikt' : 'Dialogpanel'}</Undertittel>
                </Tittel>
                <PilKnapp
                    width="30px"
                    beskrivelse={props.UI.dialogPanel.ekspandert ? 'Vis oversikt' : 'Vis dialogpanel'}
                    direction={props.UI.dialogPanel.ekspandert ? 'right' : 'left'}
                    onClick={() => () => null}
                />
            </KnappWrapper>
        </SideKnappContainer>
    );
}
