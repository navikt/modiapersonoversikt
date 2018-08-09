import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import NavKontorContainer from './navkontor/NavKontorContainer';

import { erDød, Navn, Person } from '../../../../models/person/person';
import PersonStatus from './status/PersonStatus';
import EtiketterContainer from './EtiketterContainer';
import Mann from '../../../../svg/Mann.js';
import Kvinne from '../../../../svg/Kvinne.js';

interface VisittkortHeaderProps {
    person: Person;
}

const VisittkortHeaderDiv = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding-right: 0.5em;
`;

const VenstreFelt = styled.div`
  display: flex;
  flex-grow: 1;
  margin-right: 1em;
`;

const HøyreFelt = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: column nowrap;
  justify-content: flex-end;
  text-align: right;
  box-sizing: border-box;
`;

const IkonDiv = styled.div`
  flex: 0 0 50px;
  text-align: left;
  svg {
    height: 40px;
    width: auto;
  }
`;

const GrunninfoDiv = styled.div`
  flex: 1 1;
  text-align: left;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  > *:first-child {
    margin-bottom: 0.2em !important;
  };
`;

interface PersonProps {
    person: Person;
}

function Navnelinje({person}: PersonProps) {
    const alder = erDød(person.personstatus) ? 'Død' : person.alder;
    return (
        <Undertittel tag="h1">
            {hentNavn(person.navn)} ({alder})
        </Undertittel>
    );
}

function hentNavn(navn: Navn) {
    return navn.fornavn +
        (navn.mellomnavn ? ' ' + navn.mellomnavn + ' ' : ' ')
        + navn.etternavn;
}

function VisittkortHeader({person}: VisittkortHeaderProps) {
    const ikon = {
        ikon: person.kjønn === 'M' ? <Mann /> : <Kvinne />,
        alt: person.kjønn === 'M' ? 'Mann' : 'Kvinne'
    };
    return (
        <VisittkortHeaderDiv>

            <VenstreFelt>
                <IkonDiv title={ikon.alt}>
                    {ikon.ikon}
                </IkonDiv>
                <GrunninfoDiv>
                    <Navnelinje person={person}/>
                    <PersonStatus person={person}/>
                </GrunninfoDiv>
            </VenstreFelt>

            <HøyreFelt>
                <EtiketterContainer/>
                <NavKontorContainer person={person}/>
            </HøyreFelt>

        </VisittkortHeaderDiv>
    );
}

export default VisittkortHeader;
