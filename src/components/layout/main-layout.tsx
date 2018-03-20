import * as React from 'react';
import styled from 'styled-components';
import ComponentPlaceholder from '../component-placeholder/component-placeholder';
import VisittkortContainer from '../visittkort/visittkort-container';
import Lameller from '../lameller/lameller';
import { globalStyles } from '../styles/global-styles';

function MainLayout() {

    const Wrapper = styled.div`
        width: 100%;
        flex-grow: 1;
        padding: ${globalStyles.margin.layoutMargin};
        @media (${globalStyles.media.wideScreen}) {
          display: flex;
          flex-flow: row nowrap;
        }
        @media (${globalStyles.media.smallScreen}) {
          flex-flow: column nowrap;
        }
    `;

    const OversiktsPanel = styled.div`
        display: flex;
        flex-direction: column;
        &> *:not(:first-child){
          flex-grow: 1;
        }
        @media (${globalStyles.media.smallScreen}) {
          margin-bottom: ${globalStyles.margin.layoutMargin};
        }
        @media (${globalStyles.media.wideScreen}) {
          flex: 1 0.1 60%;
          margin-right: ${globalStyles.margin.layoutMargin};
        }
        > * {
          box-shadow: ${globalStyles.boxShadow.layoutShadow};
        }
        > *:not(:last-child){
          margin-bottom: ${globalStyles.margin.layoutMargin};
        }
    `;

    const DialogPanel = styled.div`
        @media (${globalStyles.media.smallScreen}) {
          min-height: 300px;
          display: flex;
          flex-direction: column;
        }
        @media(${globalStyles.media.wideScreen}) {
          flex: 1 0.1 20%;
        }        
        padding: 1%;
        box-sizing: border-box;
        background-color: white;
        box-shadow: ${globalStyles.boxShadow.layoutShadow};
    `;

    return (
        <Wrapper>
            <OversiktsPanel>
                <VisittkortContainer />
                <Lameller />
            </OversiktsPanel>
            <DialogPanel>
                <ComponentPlaceholder name={'Dialog Panel'} />
            </DialogPanel>
        </Wrapper>
    );
}

export default MainLayout;
