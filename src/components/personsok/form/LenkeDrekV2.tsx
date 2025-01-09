import { Link } from '@navikt/ds-react';
import { pickBy } from 'lodash';
import baseurls from 'src/rest/resources/baseurlsResource';
import { formaterDato } from 'src/utils/string-utils';
import { fjernAnforselstegn, splitNavn } from './utils';

type Props = {
    birthDateFrom?: string;
    gender?: string;
    name?: string;
};

function LenkeDrekV2({ birthDateFrom, gender, name }: Props) {
    const baseUrlResource = baseurls.useFetch();
    const drekUrl = baseUrlResource.data?.drek ?? '';
    const { fornavn, etternavn } = splitNavn(fjernAnforselstegn(name));

    const searchParams = pickBy({
        fornavn,
        etternavn,
        kjoenn: gender,
        foedselsdato: birthDateFrom ? formaterDato(birthDateFrom) : undefined
    }) as Record<string, string>;

    const ferdigDrekUrl = `${drekUrl}?${new URLSearchParams(searchParams).toString()}`;

    return (
        <Link className="lenke" target={'_blank'} rel={'noopener noreferrer'} href={ferdigDrekUrl}>
            Rekvirer D-nummer fra Folkeregisteret
        </Link>
    );
}

export default LenkeDrekV2;
