import * as React from 'react';
import { Person } from '../../../models/person';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import styled from 'styled-components';
import {Egenansatt} from "../../../models/egenansatt";

interface VisittkortProps {
    person: Person;
    egenAnsatt: Egenansatt;
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
        <VisittKortDiv>
            <EkspanderbartpanelBase apen={false} heading={visittkortheader} ariaTittel="Visittkort">
                <VisittkortBody person={person}/>
            </EkspanderbartpanelBase>
        </VisittKortDiv>
    );
}

export default Visittkort;
