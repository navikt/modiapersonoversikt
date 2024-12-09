import { Normaltekst } from 'nav-frontend-typografi';

import UtropstegnIkon from '../../../../../svg/Utropstegn';
import type {
    KodeBeskrivelse,
    TilrettelagtKommunikasjon as TilrettelagtKommunikasjonInterface
} from '../../PersondataDomain';
import VisittkortElement from '../VisittkortElement';
import { VisittkortGruppe } from '../VisittkortStyles';

interface Props {
    tilrettelagtKommunikasjon: TilrettelagtKommunikasjonInterface;
}

function tilrettelagtKommunikasjonTekst(beskrivelse: string, tilrettelagtKommunikasjon: KodeBeskrivelse<string>[]) {
    return tilrettelagtKommunikasjon.map((element) => (
        <Normaltekst key={element.kode}>
            {beskrivelse}: {element.beskrivelse} ({element.kode})
        </Normaltekst>
    ));
}

function TilrettelagtKommunikasjon({ tilrettelagtKommunikasjon }: Props) {
    if (tilrettelagtKommunikasjon.tegnsprak.isEmpty() && tilrettelagtKommunikasjon.talesprak.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe tittel="Tilrettelagt kommunikasjon" ikon={<UtropstegnIkon />}>
            <VisittkortElement>
                {tilrettelagtKommunikasjonTekst('Tegnspråk', tilrettelagtKommunikasjon.tegnsprak)}
                {tilrettelagtKommunikasjonTekst('Talespråk', tilrettelagtKommunikasjon.talesprak)}
            </VisittkortElement>
        </VisittkortGruppe>
    );
}

export default TilrettelagtKommunikasjon;
