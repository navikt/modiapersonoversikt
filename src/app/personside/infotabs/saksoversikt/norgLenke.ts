import { BaseUrlsResponse } from '../../../../models/baseurls';
import { hentBaseUrl } from '../../../../redux/restReducers/baseurls';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import { sakstemakodeAlle } from './SakstemaVisning';
import { DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';

export function lenkeNorg2Frontend(
    baseUrlsResponse: BaseUrlsResponse,
    geografiskTilknytning?: string,
    sakstema?: Sakstema): string {
  const temakodeTilNorgoppslag = sakstema ? byggSøkestrengTilNorgTemaOppslag(sakstema) : '';
  const baseUrl = hentNorg2Url(baseUrlsResponse);
  return `${baseUrl}/#/startsok?tema=${temakodeTilNorgoppslag}&gt=${geografiskTilknytning}`;
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

function hentNorg2Url(baseUrlsResponse: BaseUrlsResponse) {
    return hentBaseUrl(baseUrlsResponse, 'norg2-frontend');
}
