import * as React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import UtropstegnIkon from '../../../../../svg/Utropstegn';
import {
    Kodeverk,
    TilrettelagtKommunikasjonMapper,
    TilrettelagtKommunikasjonType
} from '../../../../../models/kodeverk';
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
    if (!tilrettelagtKommunikasjon.type) {
        return (
            <Normaltekst key={tilrettelagtKommunikasjon.kodeRef}>{tilrettelagtKommunikasjon.beskrivelse}</Normaltekst>
        );
    }

    const erTegnspraktolk = tilrettelagtKommunikasjon.type === TilrettelagtKommunikasjonType.TEGNSPRAK;
    if (erTegnspraktolk) {
        return (
            <Normaltekst key={tilrettelagtKommunikasjon.kodeRef}>
                {TilrettelagtKommunikasjonMapper[tilrettelagtKommunikasjon.type]}
            </Normaltekst>
        );
    } else {
        return (
            <Normaltekst key={tilrettelagtKommunikasjon.kodeRef}>
                {TilrettelagtKommunikasjonMapper[tilrettelagtKommunikasjon.type]}:{' '}
                {tilrettelagtKommunikasjon.beskrivelse} ({tilrettelagtKommunikasjon.kodeRef})
            </Normaltekst>
        );
    }
}

export default TilrettelagtKommunikasjon;
