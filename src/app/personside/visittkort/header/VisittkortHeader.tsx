import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import NavKontorContainer from './NavKontorContainer';

import { erDød, Person } from '../../../../models/person';
import Etiketter from './Etiketter';
import PersonStatus from './status/PersonStatus';
const mannPath = require('../../../../resources/svg/mann.svg');
const kvinnePath = require('../../../../resources/svg/kvinne.svg');

interface VisittkortHeaderProps {
    person: Person;
}

const VisittkortHeaderDiv = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const VenstreFelt = styled.div`
  display: flex;
  flex: 1 0 auto;
`;

const IkonDiv = styled.div`
  flex: 0 0 50px;
  text-align: center;
  > img {
    width: 40px;
  }
`;

const InfoDiv = styled.div`
  flex: 1 1;
  text-align: left;
`;

const HøyreFelt = styled.div`
  flex: 0 1 auto;
  text-align: right;
  padding-right: 1em;
  box-sizing: border-box;
`;

interface PersonProps {
    person: Person;
}

function Navnelinje({person}: PersonProps) {
    const alder = erDød(person.personstatus) ? 'Død' : person.alder;
    return (
        <Undertittel>
            {person.navn.sammensatt} ({alder})
        </Undertittel>
    );
}

function VisittkortHeader({ person }: VisittkortHeaderProps) {
    const ikon = {
        path: person.kjønn === 'M' ? mannPath : kvinnePath,
        alt: person.kjønn === 'M' ? 'Mann' : 'Kvinne'
    };
    return (
        <VisittkortHeaderDiv>

            <VenstreFelt>
                <IkonDiv>
                    <img src={ikon.path} alt={ikon.alt}/>
                </IkonDiv>
                <InfoDiv>
                    <Navnelinje person={person}/>
                    <PersonStatus person={person}/>
                </InfoDiv>
            </VenstreFelt>

            <HøyreFelt>
                <Etiketter person={person}/>
                <NavKontorContainer />
            </HøyreFelt>

        </VisittkortHeaderDiv>
    );
}

export default VisittkortHeader;
