import { Normaltekst } from 'nav-frontend-typografi';
import type { AdresseBeskyttelse, KodeBeskrivelse } from 'src/models/person/persondata';
import { harDiskresjonskode } from 'src/utils/persondata-utils';

interface Props {
    adressebeskyttelse: KodeBeskrivelse<AdresseBeskyttelse>[];
}

function Diskresjonskode({ adressebeskyttelse }: Props) {
    const beskyttelse = adressebeskyttelse.firstOrNull();
    if (!beskyttelse || !harDiskresjonskode(adressebeskyttelse)) {
        return null;
    }

    return <Normaltekst>{beskyttelse.beskrivelse}</Normaltekst>;
}

export default Diskresjonskode;
