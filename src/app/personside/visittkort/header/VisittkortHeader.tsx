import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import NavKontorContainer from './NavKontorContainer';

import { erDød, Person } from '../../../../models/person';
import PersonStatus from './status/PersonStatus';
import EtiketterContainer from './EtiketterContainer';

const mannPath = require('../body/familie/mann.svg');
const kvinnePath = require('../body/familie/kvinne.svg');

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
  flex-grow: 1;
`;

const HøyreFelt = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  text-align: right;
  padding-right: 1em;
  box-sizing: border-box;
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
                    <img src={ikon.path} alt={ikon.alt} title={ikon.alt}/>
                </IkonDiv>
                <InfoDiv>
                    <Navnelinje person={person}/>
                    <PersonStatus person={person}/>
                </InfoDiv>
            </VenstreFelt>

            <HøyreFelt>
                <EtiketterContainer />
                <NavKontorContainer />
            </HøyreFelt>

        </VisittkortHeaderDiv>
    );
}

export default VisittkortHeader;
