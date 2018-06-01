import * as React from 'react';
import { TilrettelagtKommunikasjon } from '../../../../../models/person/person';
import VisittkortElement from '../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

const vergmaalPath = require('../vergemal/vergemaal.svg');

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
        <VisittkortElement beskrivelse="Tilrettelagt Kommunikasjon" ikonPath={vergmaalPath}>
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