import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ComponentPlaceholder from '../component-placeholder/component-placeholder';
import VisittkortContainer from '../visittkort/visittkort-container';
import Lameller from '../lameller/Lameller';
import { personOversiktTheme } from '../themes/personOversiktTheme';

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

const DialogPanel = styled.section`
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
                <DialogPanel>
                    <ComponentPlaceholder name={'Dialog Panel'}/>
                </DialogPanel>
            </Wrapper>
        </ThemeProvider>
    );
}

export default MainLayout;
