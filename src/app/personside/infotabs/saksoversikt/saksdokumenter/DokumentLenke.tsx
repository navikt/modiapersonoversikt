import { Element } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Dokument, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { useInfotabsDyplenker } from '../../dyplenker';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { paths } from '../../../../routes/routing';
import { useFødselsnummer } from '../../../../../utils/customHooks';
import { getSaksdokumentUrl } from '../dokumentvisning/getSaksdokumentUrl';

interface Props {
    dokument: Dokument;
    valgtSakstema: Sakstema;
    kanVises: boolean;
    journalPost: Journalpost;
}

const dokumentTekst = (dokument: Dokument) => {
    return dokument.tittel + (dokument.skjerming ? ' (Skjermet)' : '');
};

function DokumentLenke(props: Props) {
    const fødselsnummer = useFødselsnummer();
    const dyplenker = useInfotabsDyplenker();
    const saksdokumentUrl = getSaksdokumentUrl(
        fødselsnummer,
        props.journalPost.journalpostId,
        props.dokument.dokumentreferanse
    );
    return (
        <li>
            {!props.kanVises ? (
                <Element>{dokumentTekst(props.dokument)}</Element>
            ) : (
                <div>
                    <Link
                        to={dyplenker.saker.link(props.valgtSakstema, props.dokument)}
                        aria-disabled={!props.dokument.kanVises}
                        className="lenke typo-element"
                    >
                        {dokumentTekst(props.dokument)}
                    </Link>
                    <a
                        href={`${paths.saksdokumentEgetVindu}/${fødselsnummer}?dokumenturl=${saksdokumentUrl}`}
                        target={'_blank'}
                        className="lenke typo-element"
                    >
                        {' '}
                        Åpne{' '}
                    </a>
                </div>
            )}
        </li>
    );
}

export default DokumentLenke;
