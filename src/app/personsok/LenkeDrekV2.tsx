import { Normaltekst } from 'nav-frontend-typografi';
import type { UseFormWatch } from 'react-hook-form';
import baseurls from '../../rest/resources/baseurlsResource';
import { formaterDato } from '../../utils/string-utils';
import { fjernAnforselstegn, splitNavn } from './navn/navnUtils';
import type { PersonSokFormStateV3 } from './personsokUtils';
interface DrekPropsV2 {
    watch: UseFormWatch<PersonSokFormStateV3>;
}

function buildQueryParam(params: Record<string, string | number | boolean | undefined>): string {
    const res: string[] = [];
    for (const [key, value] of Object.entries(params)) {
        if (!value) {
            continue;
        }
        res.push(`${key}=${value}`);
    }

    return res.join('&');
}

function LenkeDrekV2({ watch }: DrekPropsV2) {
    const fodselsdatoFra = watch('fodselsdatoFra');
    const kjoenn = watch('kjonn');
    const navn = watch('navn');

    const baseUrlResource = baseurls.useFetch();
    const drekUrl = baseUrlResource.data?.drek ?? '';
    const { fornavn, etternavn } = splitNavn(fjernAnforselstegn(navn));

    const searchDict = {
        fornavn,
        etternavn,
        kjoenn,
        foedselsdato: fodselsdatoFra ? formaterDato(fodselsdatoFra) : undefined
    };

    const ferdigDrekUrl = `${drekUrl}?${buildQueryParam(searchDict)}`;

    return (
        <a className="lenke" target={'_blank'} rel={'noopener noreferrer'} href={ferdigDrekUrl}>
            <Normaltekst>Rekvirer D-nummer fra Folkeregisteret</Normaltekst>
        </a>
    );
}

export default LenkeDrekV2;
