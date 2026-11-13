import EtikettBase from 'nav-frontend-etiketter';
import type { KontaktInformasjon } from 'src/models/person/persondata';

interface Props {
    kontaktInformasjon: KontaktInformasjon | null;
}

function ManuellStatusEtikett(props: Props) {
    const { kontaktInformasjon } = props;
    const erManuell = kontaktInformasjon?.erManuell || kontaktInformasjon?.erReservert?.value;

    if (erManuell) {
        return <EtikettBase type="fokus">Manuell oppfølging</EtikettBase>;
    }
    return null;
}

export default ManuellStatusEtikett;
