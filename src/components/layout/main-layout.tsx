import * as React from 'react';
import styled from 'styled-components';
import ComponentPlaceholder from '../component-placeholder/component-placeholder';
import VisittkortContainer from '../visittkort/visittkort-container';
import { globalStyles } from '../styles/global-styles';

function MainLayout() {

    const Wrapper = styled.div`
        width: 100%;
        flex-grow: 1;
        @media (${globalStyles.media.wideScreen}) {
          display: flex;
          flex-flow: row nowrap;
        }
        padding: ${globalStyles.margin.layoutMargin};
    `;

    const boxShaddow = 'box-shadow: 0 0.2em 1.5em rgba(150, 150, 150, 0.7);';

    const OversiktsPanel = styled.div`
        display: flex;
        flex-direction: column;
        @media (${globalStyles.media.smallScreen}) {
          margin-bottom: ${globalStyles.margin.layoutMargin};
        }
        @media (${globalStyles.media.wideScreen}) {
          flex: 1 0.1 60%;
          margin-right: ${globalStyles.margin.layoutMargin};
        }
        > * {
          ${boxShaddow}
        }
        > *:not(:last-child){
          margin-bottom: ${globalStyles.margin.layoutMargin};
        }
        &> *:not(:first-child){
          flex-grow: 1;
        }
    `;

    const DialogPanel = styled.div`
        @media (${globalStyles.media.smallScreen}) {
          min-height: 500px;
          display: flex;
          flex-direction: column;
        }
        @media(${globalStyles.media.wideScreen}) {
          flex: 1 0.1 20%;
        }        
        padding: 1%;
        box-sizing: border-box;
        background-color: white;
        ${boxShaddow}
    `;

    return (
        <Wrapper>
            <OversiktsPanel>
                <VisittkortContainer />
            </OversiktsPanel>
            <DialogPanel>
                <ComponentPlaceholder name={'Dialog Panel'} />
            </DialogPanel>
        </Wrapper>
    );
}

export default MainLayout;
