import * as React from 'react';
import styled from 'styled-components';
import { Person } from '../../../../models/person';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import EtikettBase from 'nav-frontend-etiketter';
import NavKontorContainer from './NavKontorContainer';

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

const EtikettContainer = styled.div`
  > * {
    margin: 3px;
  }
`;

const PadLeft = styled.span`
  margin-left: 2em;
`;

const NoWrap = styled.span`
  white-space: nowrap;
`;

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
                    <Undertittel>
                        {person.navn.sammensatt} ({person.alder})
                    </Undertittel>
                    <Undertekst>
                        <NoWrap>
                            {person.fødselsnummer} <PadLeft>Alle er Norsk / Gift / 2 barn (under 21)</PadLeft>
                        </NoWrap>
                    </Undertekst>
                </InfoDiv>
            </VenstreFelt>

            <HøyreFelt>
                <EtikettContainer>
                    <EtikettBase type={'info'}>
                        Dette er en etikett
                    </EtikettBase>
                    <EtikettBase type={'fokus'}>
                        Dette er en til
                    </EtikettBase>
                    <EtikettBase type={'advarsel'}>
                        Enda en
                    </EtikettBase>
                </EtikettContainer>
                <NavKontorContainer />
            </HøyreFelt>

        </VisittkortHeaderDiv>
    );
}

export default VisittkortHeader;
