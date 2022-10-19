import * as React from 'react';
import { formaterDato } from '../../utils/string-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { fjernAnforselstegn, splitNavn } from './navn/navnUtils';
import baseurls, { hentBaseUrl } from '../../rest/resources/baseurlsResource';

export interface DrekPropsV2 {
    navn?: string;
    fodselsdatoFra?: string;
    kjonn?: string;
}
function LenkeDrekV2({ props }: { props: DrekPropsV2 }) {
    const baseUrlResource = baseurls.useFetch();
    const drekUrl = baseUrlResource.data ? hentBaseUrl(baseUrlResource.data, 'drek') : '';
    const navn = splitNavn(fjernAnforselstegn(props.navn));

    const ferdigDrekUrl = `${drekUrl}?fornavn=${navn.fornavn}&etternavn=${navn.etternavn}&foedselsdato=${
        props.fodselsdatoFra ? formaterDato(props.fodselsdatoFra) : ''
    }&kjoenn=${props.kjonn}`;

    return (
        <a className="lenke" target={'_blank'} rel={'noopener noreferrer'} href={ferdigDrekUrl}>
            <Normaltekst>Rekvirer D-nummer fra Folkeregisteret</Normaltekst>
        </a>
    );
}

export default LenkeDrekV2;
