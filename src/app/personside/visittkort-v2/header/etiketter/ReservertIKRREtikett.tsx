import EtikettBase from 'nav-frontend-etiketter';
import type { KontaktInformasjon } from '../../PersondataDomain';

interface Props {
    kontaktInformasjon: KontaktInformasjon | null;
}

function ReservertIKRREtikett(props: Props) {
    const { kontaktInformasjon } = props;
    if (kontaktInformasjon?.erReservert?.value === true) {
        return <EtikettBase type="fokus">Reservert i KRR</EtikettBase>;
    }
    if (kontaktInformasjon && !kontaktInformasjon.epost?.value && !kontaktInformasjon.mobil?.value) {
        return <EtikettBase type="fokus">Ikke registrert i KRR</EtikettBase>;
    }
    return null;
}

export default ReservertIKRREtikett;
