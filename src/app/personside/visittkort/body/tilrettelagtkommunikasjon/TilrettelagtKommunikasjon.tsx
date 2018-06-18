import * as React from 'react';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../VisittkortElement';
import UtropstegnIkon from '../../../../../svg/Utropstegn';
import { Kodeverk } from '../../../../../models/kodeverk';

interface TilrettelagtKommunikasjonProps {
    tilrettelagtKommunikasjonsListe: Kodeverk[];
}

function TilrettelagtKommunikasjon({tilrettelagtKommunikasjonsListe}: TilrettelagtKommunikasjonProps) {
    const tilrettelagtKommunikasjonsTekst = tilrettelagtKommunikasjonsListe.map(tilrettelagtKommunikasjon =>
        tilrettelagtKommunikasjonfo(tilrettelagtKommunikasjon));

    if (tilrettelagtKommunikasjonsListe.length === 0) {
        return null;
    }
    return (
        <VisittkortElement
            beskrivelse="Tilrettelagt Kommunikasjon"
            ikon={<UtropstegnIkon />}
            type={'header'}
        >
            {tilrettelagtKommunikasjonsTekst}
        </VisittkortElement>

    );
}

function tilrettelagtKommunikasjonfo(tilrettelagtKommunikasjon: Kodeverk) {
    return (
        <Undertekst key={tilrettelagtKommunikasjon.kodeRef}>
            {tilrettelagtKommunikasjon.beskrivelse}
        </Undertekst>
    );
}

export default TilrettelagtKommunikasjon;