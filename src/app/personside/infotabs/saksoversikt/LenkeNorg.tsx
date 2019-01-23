import { BaseUrlsResponse } from '../../../../models/baseurls';
import { hentBaseUrl } from '../../../../redux/restReducers/baseurls';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import { sakstemakodeAlle } from './SakstemaListe';
import { DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import * as React from 'react';
import { isLoaded, RestReducer } from '../../../../redux/restReducers/restReducer';
import { Person, PersonRespons } from '../../../../models/person/person';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';

function lenkeNorg2Frontend(props: StateProps): string {
    const temakodeTilNorgoppslag = props.valgtSakstema ? byggSøkestrengTilNorgTemaOppslag(props.valgtSakstema) : '';
    return `${props.baseUrl}/#/startsok?tema=${temakodeTilNorgoppslag}&gt=${props.geografistTilknytning}`;
}

function byggSøkestrengTilNorgTemaOppslag(sakstema: Sakstema) {
    if (sakstema.temakode !== sakstemakodeAlle) {
        return sakstema.temakode;
    }
    const temaArray: string[] = sakstema.dokumentMetadata.reduce(
        (acc: string[], dok: DokumentMetadata) => {
            const tema = dok.temakode;
            if (acc.includes(tema)) {
                return acc;
            } else {
                return [...acc, tema];
            }
        },
        []
    );
    return temaArray.join();
}

function hentNorg2Url(baseUrlReducer: RestReducer<BaseUrlsResponse>) {
    return isLoaded(baseUrlReducer) ? hentBaseUrl(baseUrlReducer.data, 'norg2-frontend') : '';
}

function hentGeografiskTilknytning(personReducer: RestReducer<PersonRespons>) {
    return isLoaded(personReducer) ? (personReducer.data as Person).geografiskTilknytning : '';
}

interface StateProps {
    valgtSakstema?: Sakstema;
    baseUrl: string;
    geografistTilknytning?: string;
}

function LenkeNorg(props: StateProps) {
    const norgUrl = lenkeNorg2Frontend(props);

    return (
        <a
            className="lenke"
            target={'_blank'}
            rel={'noopener noreferrer'}
            href={norgUrl}
        >
            Oversikt over enheter og tema de behandler
        </a>

    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtSakstema: state.saksoversikt.valgtSakstema,
        baseUrl: hentNorg2Url(state.restEndepunkter.baseUrlReducer),
        geografistTilknytning: hentGeografiskTilknytning(state.restEndepunkter.personinformasjon)
    };
}

export default connect(mapStateToProps)(LenkeNorg);