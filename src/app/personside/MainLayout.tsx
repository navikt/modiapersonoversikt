import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ComponentPlaceholder from '../../components/component-placeholder/ComponentPlaceHolder';
import VisittkortContainer from './visittkort/VisittkortContainer';
import Lameller from './lameller/Lameller';
import { personOversiktTheme } from '../../themes/personOversiktTheme';
import DialogPanel from './dialogpanel/DialogPanel';

const Wrapper = styled.div`
        width: 100%;
        flex-grow: 1;
        @media (${props => props.theme.media.wideScreen}) {
          display: flex;
          flex-flow: row nowrap;
        }
        padding: ${props => props.theme.margin.layout};
    `;

const PersonOversiktsPanel = styled.section`
        display: flex;
        flex-direction: column;
        @media (${props => props.theme.media.smallScreen}) {
          margin-bottom: ${props => props.theme.margin.layout};
        }
        @media (${props => props.theme.media.wideScreen}) {
          flex: 1 0.1 60%;
          margin-right: ${props => props.theme.margin.layout};
        }
        > * {
          box-shadow: ${props => props.theme.boxShadow.layout};
        }
        > *:not(:last-child){
          margin-bottom: ${props => props.theme.margin.layout};
        }
        &> *:not(:first-child){
          flex-grow: 1;
        }
    `;

const DialogPanelWrapper = styled.section`
        @media (${props => props.theme.media.smallScreen}) {
          min-height: 500px;
          display: flex;
          flex-direction: column;
        }
        @media(${props => props.theme.media.wideScreen}) {
          flex: 1 0.1 20%;
        }        
        box-sizing: border-box;
        background-color: white;
        box-shadow: ${props => props.theme.boxShadow.layout};
    `;

function MainLayout() {
    return (
        <ThemeProvider theme={personOversiktTheme}>
            <Wrapper>
                <PersonOversiktsPanel>
                    <VisittkortContainer/>
                    <Lameller />
                </PersonOversiktsPanel>
                <DialogPanelWrapper>
                    <DialogPanel/>
                    <ComponentPlaceholder name={'Dialog Panel'}/>
                </DialogPanelWrapper>
            </Wrapper>
        </ThemeProvider>
    );
}

export default MainLayout;
