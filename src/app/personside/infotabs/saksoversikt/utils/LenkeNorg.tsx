import { BaseUrlsResponse } from '../../../../../models/baseurls';
import { hentBaseUrl } from '../../../../../redux/restReducers/baseurls';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { sakstemakodeAlle } from '../sakstemaliste/SakstemaListe';
import { Journalpost } from '../../../../../models/saksoversikt/journalpost';
import * as React from 'react';
import { hasData, RestResource } from '../../../../../rest/utils/restResource';
import { AppState } from '../../../../../redux/reducers';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import { useHentPersondata } from '../../../../../utils/customHooks';
import { hasData as hasDataUseFetch } from '@nutgaard/use-fetch';

interface OwnProps {
    valgtSakstema?: Sakstema;
    geografiskTilknytning?: string | null;
}

interface StateProps {
    baseUrl: string;
}

type Props = OwnProps & StateProps;

function lenkeNorg2Frontend(props: Props): string {
    const temakodeTilNorgoppslag = props.valgtSakstema ? byggSokestrengTilNorgTemaOppslag(props.valgtSakstema) : '';
    return `${props.baseUrl}/#/startsok?tema=${temakodeTilNorgoppslag}&gt=${props.geografiskTilknytning}`;
}

function byggSokestrengTilNorgTemaOppslag(sakstema: Sakstema) {
    if (sakstema.temakode !== sakstemakodeAlle) {
        return sakstema.temakode;
    }
    const temaArray: string[] = sakstema.dokumentMetadata.reduce((acc: string[], dok: Journalpost) => {
        const tema = dok.temakode;
        if (acc.includes(tema)) {
            return acc;
        } else {
            return [...acc, tema];
        }
    }, []);
    return temaArray.join();
}

function hentNorg2Url(baseUrlResource: RestResource<BaseUrlsResponse>) {
    return hasData(baseUrlResource) ? hentBaseUrl(baseUrlResource.data, 'norg2-frontend') : '';
}

function LenkeNorg(props: Props) {
    const persondata = useHentPersondata();
    const geografiskTilknytning = hasDataUseFetch(persondata) ? persondata.data.person.geografiskTilknytning : null;
    const norgUrl = lenkeNorg2Frontend({ geografiskTilknytning: geografiskTilknytning, ...props });

    return (
        <a className="lenke" target={'_blank'} rel={'noopener noreferrer'} href={norgUrl}>
            <Normaltekst>Oversikt over enheter og tema de behandler</Normaltekst>
        </a>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        baseUrl: hentNorg2Url(state.restResources.baseUrl)
    };
}

export default connect(mapStateToProps)(LenkeNorg);
