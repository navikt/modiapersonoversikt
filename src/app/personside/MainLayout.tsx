import * as React from 'react';
import styled from 'styled-components';
import VisittkortContainer from './visittkort/VisittkortContainer';
import Lameller from './lameller/Lameller';
import DialogPanel from './dialogpanel/DialogPanel';

const LayoutWrapper = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    padding: ${props => props.theme.margin.layout};
    animation: ${props => props.theme.animation.fadeIn};
    background-color: ${props => props.theme.color.bakgrunn};
    @media (${props => props.theme.media.wideScreen}) {
      display: flex;
      flex-flow: row nowrap;
    }
`;

const Kolonne = styled.section`
    > * {
      margin-bottom: ${props => props.theme.margin.layout};
      background-color: white;
      border-radius: ${props => props.theme.borderRadius.layout};
      overflow: hidden;
    }
`;

const VenstreKolonne = Kolonne.extend`
    @media (${props => props.theme.media.wideScreen}) {
      flex: 1 0.1 60%;
      margin-right: ${props => props.theme.margin.layout};
    }
`;

const HøyreKolonne = Kolonne.extend`
    @media(${props => props.theme.media.wideScreen}) {
      flex: 1 0.1 20%;
    }
`;

function MainLayout() {
    return (
        <LayoutWrapper>
            <VenstreKolonne>
                <VisittkortContainer />
                <Lameller />
            </VenstreKolonne>
            <HøyreKolonne>
                <DialogPanel />
            </HøyreKolonne>
        </LayoutWrapper>
    );
}

export default MainLayout;
