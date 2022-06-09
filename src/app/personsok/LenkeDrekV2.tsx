import * as React from 'react';
import { hasData, RestResource } from '../../rest/utils/restResource';
import { BaseUrlsResponse } from '../../models/baseurls';
import { hentBaseUrl } from '../../redux/restReducers/baseurls';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { formaterDato } from '../../utils/string-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { beholdKunBokstaverOgMellomrom, splitNavn } from './navn/navnUtils';

export interface DrekPropsV2 {
    navn?: string;
    fodselsdatoFra?: string;
    kjonn?: string;
}
function hentDrekUrl(baseUrlResource: RestResource<BaseUrlsResponse>) {
    return hasData(baseUrlResource) ? hentBaseUrl(baseUrlResource.data, 'drek') : '';
}

function LenkeDrekV2({ props }: { props: DrekPropsV2 }) {
    const baseUrlResource = useSelector((appstate: AppState) => appstate.restResources.baseUrl);
    const drekUrl = hentDrekUrl(baseUrlResource);
    const navn = splitNavn(beholdKunBokstaverOgMellomrom(props.navn));

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
