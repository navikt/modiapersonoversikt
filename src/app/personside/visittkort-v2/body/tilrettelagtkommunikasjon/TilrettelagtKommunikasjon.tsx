import * as React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import UtropstegnIkon from '../../../../../svg/Utropstegn';
import { VisittkortGruppe } from '../VisittkortStyles';
import VisittkortElement from '../VisittkortElement';
import { TilrettelagtKommunikasjon as TilrettelagtKommunikasjonInterface } from '../../PersondataDomain';

interface Props {
    tilrettelagtKommunikasjon: TilrettelagtKommunikasjonInterface;
}

function TilrettelagtKommunikasjon({ tilrettelagtKommunikasjon }: Props) {
    if (tilrettelagtKommunikasjon.tegnsprak.isEmpty() && tilrettelagtKommunikasjon.talesprak.isEmpty()) {
        return null;
    }

    const tilrettelagtKommunikasjonTegnsprakTekst = tilrettelagtKommunikasjon.tegnsprak.map(tegnsprak => (
        <Normaltekst key={tegnsprak.kode}>
            Tegnspråktolk: {tegnsprak.beskrivelse} ({tegnsprak.kode})
        </Normaltekst>
    ));

    const tilrettelagtKommunikasjonTalesprakTekst = tilrettelagtKommunikasjon.talesprak.map(talesprak => (
        <Normaltekst key={talesprak.kode}>
            Talespråktolk: {talesprak.beskrivelse} ({talesprak.kode})
        </Normaltekst>
    ));

    return (
        <VisittkortGruppe tittel="Tilrettelagt kommunikasjon" ikon={<UtropstegnIkon />}>
            <VisittkortElement>
                {tilrettelagtKommunikasjonTegnsprakTekst} {tilrettelagtKommunikasjonTalesprakTekst}
            </VisittkortElement>
        </VisittkortGruppe>
    );
}

export default TilrettelagtKommunikasjon;
