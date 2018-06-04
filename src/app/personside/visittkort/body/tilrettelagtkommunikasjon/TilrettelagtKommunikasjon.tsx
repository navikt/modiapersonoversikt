import * as React from 'react';
import { TilrettelagtKommunikasjon } from '../../../../../models/person/person';
import VisittkortElement from '../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import UtropstegnIkon from '../../../../../svg/Utropstegn';

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
        <VisittkortElement beskrivelse="Tilrettelagt Kommunikasjon" ikon={<UtropstegnIkon />}>
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