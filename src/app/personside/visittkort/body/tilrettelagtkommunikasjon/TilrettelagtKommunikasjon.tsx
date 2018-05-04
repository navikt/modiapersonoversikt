import * as React from 'react';
import { TilrettelagtKommunikasjon } from '../../../../../models/person';
import VisittkortElement from '../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

const ikonPath = require('../vergemaal.svg');

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
        <VisittkortElement beskrivelse="Tilrettelagt Kommunikasjon" ikonPath={ikonPath}>
            {tilrettelagtKommunikasjonsTekst}
        </VisittkortElement>

    );
}

function tilrettelagtKommunikasjonfo(tilrettelagtKommunikasjon: TilrettelagtKommunikasjon) {
    return (
        <Undertekst key={tilrettelagtKommunikasjon.behovKode}>
                 {tilrettelagtKommunikasjon.beskrivelse}
            </Undertekst>
    );
}

export default TilrettelagtKommunikasjon;