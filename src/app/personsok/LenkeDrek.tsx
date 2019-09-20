import * as React from 'react';
import { PersonSokFormState } from './PersonsokSkjema';
import { hasData, RestResource } from '../../rest/utils/restResource';
import { BaseUrlsResponse } from '../../models/baseurls';
import { hentBaseUrl } from '../../redux/restReducers/baseurls';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { formaterDato } from '../../utils/stringFormatting';
import { Normaltekst } from 'nav-frontend-typografi';

function hentDrekUrl(baseUrlResource: RestResource<BaseUrlsResponse>) {
    return hasData(baseUrlResource) ? hentBaseUrl(baseUrlResource.data, 'drek') : '';
}

function LenkeDrek({ props }: { props: PersonSokFormState }) {
    const baseUrlResource = useSelector((appstate: AppState) => appstate.restResources.baseUrl);
    const drekUrl = hentDrekUrl(baseUrlResource);

    const ferdigDrekUrl = `${drekUrl}?fornavn=${props.fornavn}&etternavn=${props.etternavn}&foedselsdato=${
        props.fodselsdatoFra ? formaterDato(props.fodselsdatoFra) : ''
    }&kjoenn=${props.kjonn}`;

    return (
        <a className="lenke" target={'_blank'} rel={'noopener noreferrer'} href={ferdigDrekUrl}>
            <Normaltekst>Rekvirer D-nummer fra Folkeregisteret</Normaltekst>
        </a>
    );
}

export default LenkeDrek;
