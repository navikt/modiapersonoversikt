import * as React from 'react';
import styled from 'styled-components';

import { MobiltelefonVisning } from '../../personside/visittkort/body/kontaktinformasjon/telefon/Mobiltelefon';
import VisittkortElement from '../../personside/visittkort/body/VisittkortElement';
import { EpostVisning } from '../../personside/visittkort/body/kontaktinformasjon/epost/Epost';
import { Kontaktinformasjon } from '../../../models/kontaktinformasjon';
import Email from '../../../svg/Email';
import Phone from '../../../svg/Phone';

const Border = styled.div`
  border-radius: 5px;
  border-style: groove;
  padding: 15px;
`;

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
                <VisittkortElement beskrivelse="E-post Kontakt- og reservasjonsregisteret" ikon={<Email />}>
                    <EpostVisning kontaktinformasjon={kontaktinformasjon}/>
                </VisittkortElement>
                <VisittkortElement beskrivelse="Telefon Kontakt- og reservasjonsregisteret" ikon={<Phone />}>
                    <MobiltelefonVisning kontaktinformasjon={kontaktinformasjon}/>
                </VisittkortElement>
            </Border>
        </DigitalKontaktinformasjonWrapper>
    );
}

export default DigitalKontaktinformasjon;