import * as React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import UtropstegnIkon from '../../../../../svg/Utropstegn';
import { Kodeverk } from '../../../../../models/kodeverk';
import { VisittkortGruppe } from '../VisittkortStyles';
import VisittkortElement from '../VisittkortElement';

interface TilrettelagtKommunikasjonProps {
    tilrettelagtKommunikasjonsListe: Kodeverk[];
}

function TilrettelagtKommunikasjon({ tilrettelagtKommunikasjonsListe }: TilrettelagtKommunikasjonProps) {
    const tilrettelagtKommunikasjonsTekst = tilrettelagtKommunikasjonsListe.map(tilrettelagtKommunikasjon =>
        tilrettelagtKommunikasjonfo(tilrettelagtKommunikasjon)
    );

    if (tilrettelagtKommunikasjonsListe.length === 0) {
        return null;
    }
    return (
        <VisittkortGruppe tittel="Tilrettelagt kommunikasjon" ikon={<UtropstegnIkon />}>
            <VisittkortElement>{tilrettelagtKommunikasjonsTekst}</VisittkortElement>
        </VisittkortGruppe>
    );
}

function tilrettelagtKommunikasjonfo(tilrettelagtKommunikasjon: Kodeverk) {
    return <Normaltekst key={tilrettelagtKommunikasjon.kodeRef}>{tilrettelagtKommunikasjon.beskrivelse}</Normaltekst>;
}

export default TilrettelagtKommunikasjon;
