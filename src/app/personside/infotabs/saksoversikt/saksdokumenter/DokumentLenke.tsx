import { Link, useLocation } from '@tanstack/react-router';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { trackingEvents } from 'src/utils/analytics';
import { type Dokument, DokumentStatus, type Journalpost } from '../../../../../models/saksoversikt/journalpost';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { erSakerFullscreen } from '../utils/erSakerFullscreen';

interface Props {
    dokument: Dokument;
    valgtSakstema: Sakstema;
    kanVises: boolean;
    journalPost: Journalpost;
}

const dokumentTekst = (dokument: Dokument) => {
    return (
        dokument.tittel +
        (dokument.skjerming ? ' (Skjermet)' : '') +
        (dokument.dokumentStatus === DokumentStatus.KASSERT ? ' (Kassert)' : '')
    );
};

function DokumentLenke(props: Props) {
    const pathname = useLocation().pathname;

    if (!props.kanVises) {
        return <Element>{dokumentTekst(props.dokument)}</Element>;
    }

    const erFullScreen = erSakerFullscreen(pathname);
    const apneDokumentINyttVindu = !erFullScreen;
    const journalpostId = props.journalPost.journalpostId;
    const dokumentReferanse = props.dokument.dokumentreferanse;

    if (journalpostId === null || dokumentReferanse === null) {
        return (
            <>
                {dokumentTekst(props.dokument)} <Undertekst>(Dokument er ikke tilgjengelig)</Undertekst>
            </>
        );
    }

    //  const saksdokumentUrl = getSaksdokumentUrl(journalpostId, dokumentReferanse);
    return (
        <>
            {apneDokumentINyttVindu ? (
                <Link
                    to="/dokument"
                    data-umami-event={trackingEvents.detaljvisningKlikket}
                    data-umami-event-fane="saker"
                    data-umami-event-tekst="åpnet dokument"
                    search={{ dokument: dokumentReferanse, journalpost: journalpostId }}
                    target="blank"
                    className="lenke typo-element"
                >
                    {dokumentTekst(props.dokument)}
                </Link>
            ) : (
                <Link
                    to={erFullScreen ? '/saker' : '/person/saker'}
                    search={{
                        sakstema: props.valgtSakstema.temakode,
                        dokument: dokumentReferanse
                    }}
                    className="lenke typo-element"
                >
                    {dokumentTekst(props.dokument)}
                </Link>
            )}

            {/*
            // Disabled as the link is wrong and does not work

            <LastNedLenke href={saksdokumentUrl} className="lenke typo-element" download title="Last ned">
                <SvgDownload aria-hidden width={20} height={20} />
                <span className="sr-only">Last ned pdf</span>
            </LastNedLenke>
              */}
        </>
    );
}

export default DokumentLenke;
