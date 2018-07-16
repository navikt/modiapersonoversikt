import * as React from 'react';
import styled from 'styled-components';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';

import { Person } from '../../../models/person/person';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import ErrorBoundary from '../../../components/ErrorBoundary';
import ShortcutListener from './ShortcutListener';

interface VisittkortProps {
    person: Person;
}

const VisittKortDiv = styled.article`
  .ekspanderbartPanel__hode {
      // For å lage en "strek" mellom visittkorthode og visittkortkropp:
      border-bottom: ${props => props.theme.color.bakgrunn} 2px solid;
      &:hover { color: inherit; }
  }
`;

function Visittkort({ person }: VisittkortProps) {

    const visittkortheader = <VisittkortHeader person={person}/>;

    return (
        <ErrorBoundary>
            <ShortcutListener fødselsnummer={person.fødselsnummer} />
            <VisittKortDiv>
                <EkspanderbartpanelBase apen={false} heading={visittkortheader} ariaTittel="Visittkort">
                    <VisittkortBody person={person}/>
                </EkspanderbartpanelBase>
            </VisittKortDiv>
        </ErrorBoundary>
    );
}

export default Visittkort;
