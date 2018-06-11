import * as React from 'react';
import styled from 'styled-components';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import { Person } from '../../../models/person/person';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import ErrorBoundary from '../../../components/ErrorBoundary';

interface VisittkortProps {
    person: Person;
}

const VisittKortDiv = styled.article`
  // For å lage en "strek" mellom visittkorthode og visittkortkropp:
  .ekspanderbartPanel__hode {
      border-bottom: ${props => props.theme.color.bakgrunn} 2px solid;
  }
`;

function Visittkort({ person }: VisittkortProps) {

    const visittkortheader = <VisittkortHeader person={person}/>;

    return (
        <ErrorBoundary>
            <VisittKortDiv>
                <EkspanderbartpanelBase apen={false} heading={visittkortheader} ariaTittel="Visittkort">
                    <VisittkortBody person={person}/>
                </EkspanderbartpanelBase>
            </VisittKortDiv>
        </ErrorBoundary>
    );
}

export default Visittkort;
