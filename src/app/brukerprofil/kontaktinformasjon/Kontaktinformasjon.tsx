import * as React from 'react';
import { Kontaktinformasjon } from '../../../models/kontaktinformasjon';
import { EpostVisning } from '../../personside/visittkort/body/kontaktinformasjon/epost/Epost';
import { MobiltelefonVisning } from '../../personside/visittkort/body/kontaktinformasjon/telefon/Mobiltelefon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import VisittkortElement from '../../personside/visittkort/body/VisittkortElement';
import styled from 'styled-components';
import UndertekstBold from 'nav-frontend-typografi/lib/undertekst-bold';
import Input from 'nav-frontend-skjema/lib/input';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import { Person } from '../../../models/person/person';

const emailPath = require('./email.svg');
const phonePath = require('./phone.svg');

interface Props {
    kontaktinformasjon: Kontaktinformasjon;
    person: Person;
}

const Wrapper = styled.div`
  margin-top: 1em;
`;

function Kontaktinformasjon({kontaktinformasjon, person}: Props) {
    const mobiltelefon = person.kontaktinformasjon.mobil ? person.kontaktinformasjon.mobil.nummer : '';
    return (
        <>
            <Undertittel>Kontaktinformasjon</Undertittel>
            <Wrapper>
                <VisittkortElement beskrivelse="E-post Kontakt- og reservasjonsregisteret" ikonPath={emailPath}>
                    <EpostVisning kontaktinformasjon={kontaktinformasjon}/>
                </VisittkortElement>
                <VisittkortElement beskrivelse="Telefon Kontakt- og reservasjonsregisteret" ikonPath={phonePath}>
                    <MobiltelefonVisning kontaktinformasjon={kontaktinformasjon}/>
                </VisittkortElement>
            </Wrapper>
            <Wrapper>
                <UndertekstBold>Telefonnummer bruker ønsker å bli oppringt på</UndertekstBold>
                <Undertekst>Mobiltelefon</Undertekst>
                <Input
                    label="Landkode"
                    value={mobiltelefon}
                />
                <Input
                    label="Telefonnummer"
                />
            </Wrapper>
        </>);
}

export default Kontaktinformasjon;