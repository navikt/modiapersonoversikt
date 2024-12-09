import EtikettBase from 'nav-frontend-etiketter';
import { AdresseBeskyttelse, type KodeBeskrivelse } from '../../PersondataDomain';

interface Props {
    adressebeskyttelser: KodeBeskrivelse<AdresseBeskyttelse>[];
}

function DiskresjonskodeEtikett({ adressebeskyttelser }: Props) {
    const adressebeskyttelse = adressebeskyttelser.firstOrNull();
    if (
        !adressebeskyttelse?.kode ||
        adressebeskyttelse?.kode === AdresseBeskyttelse.UGRADERT ||
        adressebeskyttelse?.kode === AdresseBeskyttelse.UKJENT
    ) {
        return null;
    }
    return <EtikettBase type={'advarsel'}>{adressebeskyttelse?.beskrivelse}</EtikettBase>;
}

export default DiskresjonskodeEtikett;
