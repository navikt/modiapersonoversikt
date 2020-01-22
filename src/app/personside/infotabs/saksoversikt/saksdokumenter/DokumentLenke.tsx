import { Element } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Dokument, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { paths } from '../../../../routes/routing';
import { useFødselsnummer } from '../../../../../utils/customHooks';
import { getSaksdokumentUrl } from '../dokumentvisning/getSaksdokumentUrl';
import { erSakerFullscreen } from '../utils/erSakerFullscreen';
import { useInfotabsDyplenker } from '../../dyplenker';
import useFeatureToggle from '../../../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../../../components/featureToggle/toggleIDs';

interface Props {
    dokument: Dokument;
    valgtSakstema: Sakstema;
    kanVises: boolean;
    journalPost: Journalpost;
}

const dokumentTekst = (dokument: Dokument) => {
    return dokument.tittel + (dokument.skjerming ? ' (Skjermet)' : '');
};

export function getUrlSaksdokumentEgetVindu(fødselsnummer: string, journalpostId: string, dokumentReferanse: string) {
    const saksdokumentUrl = getSaksdokumentUrl(fødselsnummer, journalpostId, dokumentReferanse);

    return `${paths.saksdokumentEgetVindu}/${fødselsnummer}?dokumenturl=${saksdokumentUrl}`;
}

function DokumentLenke(props: Props) {
    const fødselsnummer = useFødselsnummer();
    const dyplenker = useInfotabsDyplenker();
    const svaksyntModus = useFeatureToggle(FeatureToggles.SvaksyntModus).isOn;

    if (!props.kanVises) {
        return <Element>{dokumentTekst(props.dokument)}</Element>;
    }

    const apneDokumentINyttVindu = !erSakerFullscreen();
    const journalpostId = props.journalPost.journalpostId;
    const dokumentReferanse = props.dokument.dokumentreferanse;
    const url = apneDokumentINyttVindu
        ? getUrlSaksdokumentEgetVindu(fødselsnummer, journalpostId, dokumentReferanse)
        : dyplenker.saker.link(props.valgtSakstema, props.dokument);
    const saksdokumentUrl = getSaksdokumentUrl(fødselsnummer, journalpostId, dokumentReferanse);

    return (
        <>
            <Link
                to={url}
                target={apneDokumentINyttVindu ? '_blank' : undefined}
                aria-disabled={!props.dokument.kanVises}
                className="lenke typo-element"
            >
                {dokumentTekst(props.dokument)}
            </Link>
            {svaksyntModus && (
                <a href={saksdokumentUrl} download>
                    Last ned dokument
                </a>
            )}
        </>
    );
}

export default DokumentLenke;
