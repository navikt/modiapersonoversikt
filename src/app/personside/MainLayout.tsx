import * as React from 'react';
import styled from 'styled-components';
import ComponentPlaceholder from '../../components/component-placeholder/ComponentPlaceHolder';
import VisittkortContainer from './visittkort/VisittkortContainer';
import Lameller from './lameller/Lameller';

const Wrapper = styled.div`
        width: 100%;
        flex-grow: 1;
        display: flex;
        flex-flow: row nowrap;
    `;

const PersonOversiktsPanel = styled.section`
        overflow-y: scroll;
        flex: 1 0.1 60%;
        padding: ${props => props.theme.margin.layout};
        > * {
          box-shadow: ${props => props.theme.boxShadow.layout};
          margin-bottom: ${props => props.theme.margin.layout};
        }
    `;

const DialogPanel = styled.section`
        overflow-y: scroll;
        flex: 1 0.1 20%;
        > * {
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
                <ComponentPlaceholder height={'120vh'} name={'Dialog Panel'}/>
            </DialogPanel>
        </Wrapper>
    );
}

export default MainLayout;
