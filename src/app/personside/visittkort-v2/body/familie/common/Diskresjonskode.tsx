import { Normaltekst } from 'nav-frontend-typografi';
import { AdresseBeskyttelse, KodeBeskrivelse } from '../../../PersondataDomain';
import { harDiskresjonskode } from '../../../visittkort-utils';

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
