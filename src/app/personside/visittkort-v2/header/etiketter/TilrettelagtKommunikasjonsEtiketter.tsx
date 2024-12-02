import EtikettBase from 'nav-frontend-etiketter';
import { TilrettelagtKommunikasjon } from './../../PersondataDomain';

interface Props {
    tilrettelagtKommunikasjon: TilrettelagtKommunikasjon;
}

function TilrettelagtKommunikasjonsEtiketter({ tilrettelagtKommunikasjon }: Props) {
    const talesprakEtikett = !tilrettelagtKommunikasjon.talesprak.isEmpty() ? (
        <EtikettBase type={'fokus'}>Talespråktolk</EtikettBase>
    ) : null;
    const tegnsprakEtikett = !tilrettelagtKommunikasjon.tegnsprak.isEmpty() ? (
        <EtikettBase type={'fokus'}>Tegnspråktolk</EtikettBase>
    ) : null;

    return (
        <>
            {talesprakEtikett}
            {tegnsprakEtikett}
        </>
    );
}

export default TilrettelagtKommunikasjonsEtiketter;
