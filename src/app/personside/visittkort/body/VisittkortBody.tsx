import * as React from 'react';
import styled from 'styled-components';
import VisittkortElement from './VisittkortElement';
import { Person } from '../../../../models/person';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import NavKontorContainer from './navkontor/NavKontorContainer';

const emailPath = require('../../../../resources/svg/email.svg');
const heartPath = require('../../../../resources/svg/heart.svg');
const coinsPath = require('../../../../resources/svg/coins.svg');
const locationPath = require('../../../../resources/svg/location-pin.svg');
const phonePath = require('../../../../resources/svg/phone.svg');
const jentePath = require('../../../../resources/svg/jentebarn.svg');
const guttPath = require('../../../../resources/svg/guttebarn.svg');

interface VisittkortBodyProps {
    person: Person;
}

const VisittkortBodyDiv = styled.div`
  display: flex;
`;

const Kolonne = styled.div`
  flex: 0 0 50%;
  > *:not(:last-child) {
    margin-bottom: 60px;
  }
`;

const GruppeDiv = styled.div`
  > *:not(:last-child):not(:first-child) {
    margin-bottom: 30px;
  }
`;

const PadLeft = styled.span`
  margin-left: 50px;
`;

function InfoGruppe(props: { children: string | JSX.Element | JSX.Element[]; tittel: string; }) {
    return (
        <GruppeDiv>
            <Undertittel>
                <PadLeft>{props.tittel}</PadLeft>
            </Undertittel>
            {props.children}
        </GruppeDiv>
    );
}

function VisittkortBody({ person }: VisittkortBodyProps) {
    return (
        <VisittkortBodyDiv>
            <Kolonne>
                <InfoGruppe tittel={'Kontakt'}>
                    <VisittkortElement beskrivelse="Postadresse Folkeregistrert" ikonPath={locationPath}>
                        <Undertekst>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Facilis neque nobis sint tempora. Quos, tenetur!
                        </Undertekst>
                    </VisittkortElement>
                    <VisittkortElement beskrivelse="Postadresse Midlertidig Norge" ikonPath={locationPath}>
                        <Undertekst>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Et, ipsum.
                        </Undertekst>
                    </VisittkortElement>
                    <VisittkortElement beskrivelse="Epost" ikonPath={emailPath}>
                        <Undertekst>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Exercitationem facere facilis perspiciatis.
                        </Undertekst>
                    </VisittkortElement>
                    <VisittkortElement beskrivelse="Telefon" ikonPath={phonePath}>
                        <Undertekst>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Blanditiis illo in laboriosam magni mollitia quae?
                        </Undertekst>
                    </VisittkortElement>
                    <VisittkortElement beskrivelse="Kontonummer" ikonPath={coinsPath}>
                        <Undertekst>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </Undertekst>
                    </VisittkortElement>
                </InfoGruppe>
            </Kolonne>
            <Kolonne>
                <InfoGruppe tittel={'Familie'}>
                    <VisittkortElement utenTittel={true} beskrivelse="Sivilstatus" ikonPath={heartPath}>
                        <Undertekst>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Adipisci dignissimos eius modi natus praesentium unde velit.
                        </Undertekst>
                    </VisittkortElement>
                    <VisittkortElement utenTittel={true} beskrivelse="Barn" ikonPath={jentePath}>
                        <Undertekst>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </Undertekst>
                    </VisittkortElement>
                    <VisittkortElement utenTittel={true} beskrivelse="Barn" ikonPath={guttPath}>
                        <Undertekst>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </Undertekst>
                    </VisittkortElement>
                </InfoGruppe>
                <InfoGruppe tittel={'Brukers NavKontor'}>
                    <NavKontorContainer />
                </InfoGruppe>
            </Kolonne>
        </VisittkortBodyDiv>
    );
}

export default VisittkortBody;
