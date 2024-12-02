import EtikettBase from 'nav-frontend-etiketter';
import { KontaktInformasjon } from '../../PersondataDomain';

interface Props {
    kontaktInformasjon: KontaktInformasjon | null;
}

function ManuellStatusEtikett(props: Props) {
    const { kontaktInformasjon } = props;
    const erManuell = kontaktInformasjon?.erManuell || kontaktInformasjon?.erReservert;

    if (erManuell) {
        return <EtikettBase type="fokus">Manuell oppfølging</EtikettBase>;
    } else {
        return null;
    }
}

export default ManuellStatusEtikett;
