import { Element } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Dokument, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { useInfotabsDyplenker } from '../../dyplenker';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { paths } from '../../../../routes/routing';
import { useFødselsnummer } from '../../../../../utils/customHooks';
import { getSaksdokumentUrl } from '../dokumentvisning/getSaksdokumentUrl';
import IfFeatureToggleOff from '../../../../../components/featureToggle/IfFeatureToggleOff';
import { FeatureToggles } from '../../../../../components/featureToggle/toggleIDs';
import IfFeatureToggleOn from '../../../../../components/featureToggle/IfFeatureToggleOn';

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
    if (!props.kanVises) {
        return <Element>{dokumentTekst(props.dokument)}</Element>;
    }

    return (
        <>
            <IfFeatureToggleOff toggleID={FeatureToggles.ApneSaksdokumentiEgetVindu}>
                <Link
                    to={dyplenker.saker.link(props.valgtSakstema, props.dokument)}
                    aria-disabled={!props.dokument.kanVises}
                    className="lenke typo-element"
                >
                    {dokumentTekst(props.dokument)}
                </Link>
            </IfFeatureToggleOff>
            <IfFeatureToggleOn toggleID={FeatureToggles.ApneSaksdokumentiEgetVindu}>
                <a
                    href={`${paths.saksdokumentEgetVindu}/${fødselsnummer}?dokumenturl=${saksdokumentUrl}`}
                    target={'_blank'}
                    className="lenke typo-element"
                >
                    {dokumentTekst(props.dokument)}
                </a>
            </IfFeatureToggleOn>
        </>
    );
}

export default DokumentLenke;
