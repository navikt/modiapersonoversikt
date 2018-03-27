import * as React from 'react';
import styled from 'styled-components';
import ComponentPlaceholder from '../../components/component-placeholder/ComponentPlaceHolder';
import VisittkortContainer from './visittkort/VisittkortContainer';
import Lameller from './lameller/Lameller';

const Wrapper = styled.div`
        width: 100%;
        flex-grow: 1;
        @media (${props => props.theme.media.wideScreen}) {
          display: flex;
          flex-flow: row nowrap;
        }
        padding: ${props => props.theme.margin.layout};
        overflow-y: scroll;
    `;

const PersonOversiktsPanel = styled.section`
        margin-bottom: ${props => props.theme.margin.layout};
        @media (${props => props.theme.media.wideScreen}) {
          flex: 1 0.1 60%;
          margin-right: ${props => props.theme.margin.layout};
        }
        > * {
          box-shadow: ${props => props.theme.boxShadow.layout};
          margin-bottom: ${props => props.theme.margin.layout};
        }
    `;

const DialogPanel = styled.section`
        min-height: 700px;
        display: flex;
        flex-flow: column nowrap;
        @media(${props => props.theme.media.wideScreen}) {
          flex: 1 0.1 20%;
        }        
        > * {
          box-shadow: ${props => props.theme.boxShadow.layout};
          background-color: white;
        }
    `;

function MainLayout() {
    return (
        <Wrapper>
            <PersonOversiktsPanel>
                <VisittkortContainer/>
                <Lameller/>
            </PersonOversiktsPanel>
            <DialogPanel>
                <ComponentPlaceholder height={'100%'} name={'Dialog Panel'}/>
            </DialogPanel>
        </Wrapper>
    );
}

export default MainLayout;
