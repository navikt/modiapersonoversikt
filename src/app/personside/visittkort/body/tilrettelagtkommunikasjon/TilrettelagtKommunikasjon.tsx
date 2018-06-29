import * as React from 'react';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import UtropstegnIkon from '../../../../../svg/Utropstegn';
import { Kodeverk } from '../../../../../models/kodeverk';
import { VisittkortGruppe } from '../VisittkortStyles';
import VisittkortElement from '../VisittkortElement';

interface TilrettelagtKommunikasjonProps {
    tilrettelagtKommunikasjonsListe: Kodeverk[];
}

function TilrettelagtKommunikasjon({ tilrettelagtKommunikasjonsListe }: TilrettelagtKommunikasjonProps) {
    const tilrettelagtKommunikasjonsTekst = tilrettelagtKommunikasjonsListe.map(tilrettelagtKommunikasjon =>
        tilrettelagtKommunikasjonfo(tilrettelagtKommunikasjon));

    if (tilrettelagtKommunikasjonsListe.length === 0) {
        return null;
    }
    return (
        <VisittkortGruppe
            tittel="Tilrettelagt Kommunikasjon"
            ikon={<UtropstegnIkon/>}
        >
            <VisittkortElement>
                {tilrettelagtKommunikasjonsTekst}
            </VisittkortElement>
        </VisittkortGruppe>

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