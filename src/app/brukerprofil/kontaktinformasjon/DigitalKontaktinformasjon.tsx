import * as React from 'react';
import styled from 'styled-components';

import { MobiltelefonVisning } from '../../personside/visittkort/body/kontaktinformasjon/telefon/Mobiltelefon';
import VisittkortElement from '../../personside/visittkort/body/VisittkortElement';
import { EpostVisning } from '../../personside/visittkort/body/kontaktinformasjon/epost/Epost';
import { Kontaktinformasjon } from '../../../models/kontaktinformasjon';

const Border = styled.div`
  border-radius: 5px;
  border-style: groove;
  padding: 15px;
`;

const emailPath = require('./email.svg');
const phonePath = require('./phone.svg');

const DigitalKontaktinformasjonWrapper = styled.div`
  margin-top: 1em;
`;

interface Props {
    kontaktinformasjon: Kontaktinformasjon;
}

function DigitalKontaktinformasjon ({kontaktinformasjon}: Props) {
    return (
        <DigitalKontaktinformasjonWrapper>
            <Border>
                <VisittkortElement beskrivelse="E-post Kontakt- og reservasjonsregisteret" ikonPath={emailPath}>
                    <EpostVisning kontaktinformasjon={kontaktinformasjon}/>
                </VisittkortElement>
                <VisittkortElement beskrivelse="Telefon Kontakt- og reservasjonsregisteret" ikonPath={phonePath}>
                    <MobiltelefonVisning kontaktinformasjon={kontaktinformasjon}/>
                </VisittkortElement>
            </Border>
        </DigitalKontaktinformasjonWrapper>
    );
}

export default DigitalKontaktinformasjon;