import * as React from 'react';
import styled from 'styled-components';
import { TilrettelagtKommunikasjon } from '../../../../../models/person';
import VisittkortElement from '../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

const phonePath = require('../telefon/phone.svg');

const StyledTilrettelagtKommunikasjon = styled.span`
  span:not(:last-child):after {
    content: ' og ';
  }
`;

interface TilrettelagtKommunikasjonProps {
    tilrettelagtKommunikasjonsListe: TilrettelagtKommunikasjon[];
}

function TilrettelagtKommunikasjon({tilrettelagtKommunikasjonsListe}: TilrettelagtKommunikasjonProps) {
    const tilrettelagtKommunikasjonsTekst = tilrettelagtKommunikasjonsListe.map(tilrettelagtKommunikasjon =>
        tilrettelagtKommunikasjonfo(tilrettelagtKommunikasjon));

    if (tilrettelagtKommunikasjonsListe.length === 0) {
        return null;
    }
    return (
        <VisittkortElement beskrivelse="Tilrettelagt Kommunikasjon" ikonPath={phonePath}>
            <Undertekst>
                <StyledTilrettelagtKommunikasjon>
                    {tilrettelagtKommunikasjonsTekst}
                </StyledTilrettelagtKommunikasjon>
            </Undertekst>
        </VisittkortElement>
    );
}

function tilrettelagtKommunikasjonfo(tilrettelagtKommunikasjon: TilrettelagtKommunikasjon) {
    return (
        <span key={tilrettelagtKommunikasjon.behovKode}>
                 {tilrettelagtKommunikasjon.beskrivelse}
            </span>
    );
}

export default TilrettelagtKommunikasjon;