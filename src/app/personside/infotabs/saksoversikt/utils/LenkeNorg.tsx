import { Normaltekst } from 'nav-frontend-typografi';
import type { Journalpost } from '../../../../../models/saksoversikt/journalpost';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import baseurls from '../../../../../rest/resources/baseurlsResource';
import persondataResource from '../../../../../rest/resources/persondataResource';
import { sakstemakodeAlle } from './saksoversiktUtilsV2';

interface Props {
    valgtSakstema?: Sakstema;
    geografiskTilknytning?: string | null;
}

function lenkeNorg2Frontend(baseUrl: string, props: Props): string {
    const temakodeTilNorgoppslag = props.valgtSakstema ? byggSokestrengTilNorgTemaOppslag(props.valgtSakstema) : '';
    return `${baseUrl}/#/startsok?tema=${temakodeTilNorgoppslag}&gt=${props.geografiskTilknytning}`;
}

function byggSokestrengTilNorgTemaOppslag(sakstema: Sakstema) {
    if (sakstema.temakode !== sakstemakodeAlle) {
        return sakstema.temakode;
    }
    const temaArray: string[] = sakstema.dokumentMetadata.reduce((acc: string[], dok: Journalpost) => {
        const tema = dok.temakode;
        if (acc.includes(tema)) {
            return acc;
        }
        return [...acc, tema];
    }, []);
    return temaArray.join();
}

function LenkeNorg(props: Props) {
    const persondata = persondataResource.useFetch();
    const geografiskTilknytning = persondata.data?.person?.geografiskTilknytning ?? null;

    return baseurls.useRenderer((baseUrls) => {
        const norgUrl = lenkeNorg2Frontend(baseUrls.norg2Frontend, {
            geografiskTilknytning: geografiskTilknytning,
            ...props
        });
        return (
            <a className="lenke" target={'_blank'} rel={'noopener noreferrer'} href={norgUrl}>
                <Normaltekst>Oversikt over enheter og tema de behandler</Normaltekst>
            </a>
        );
    });
}

export default LenkeNorg;
