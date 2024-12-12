import { Link, useLocation } from '@tanstack/react-router';
import { Element, Undertekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { type Dokument, DokumentStatus, type Journalpost } from '../../../../../models/saksoversikt/journalpost';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import theme from '../../../../../styles/personOversiktTheme';
import { getSaksdokumentUrl } from '../dokumentvisning/getSaksdokumentUrl';
import { erSakerFullscreen } from '../utils/erSakerFullscreen';
import SvgDownload from './../../../../../svg/download.svg';

interface Props {
    dokument: Dokument;
    valgtSakstema: Sakstema;
    kanVises: boolean;
    journalPost: Journalpost;
}

const LastNedLenke = styled.a`
    margin-left: 0.5rem;

    svg {
        position: relative;
        top: 2px;
    }

    &:hover {
        color: ${theme.color.lenkeSelected};
    }
`;

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

    const saksdokumentUrl = getSaksdokumentUrl(journalpostId, dokumentReferanse);
    return (
        <>
            {apneDokumentINyttVindu ? (
                <Link
                    to="/dokument"
                    search={{ dokument: dokumentReferanse, journalpost: journalpostId }}
                    target={'_blank'}
                    className="lenke typo-element"
                >
                    {dokumentTekst(props.dokument)}
                </Link>
            ) : (
                <Link
                    to={erFullScreen ? '/saker' : '/person/saker'}
                    search={{ sakstema: props.valgtSakstema.temakode, dokument: dokumentReferanse }}
                    className="lenke typo-element"
                >
                    {dokumentTekst(props.dokument)}
                </Link>
            )}
            <LastNedLenke href={saksdokumentUrl} className="lenke typo-element" download title="Last ned">
                <SvgDownload aria-hidden width={20} height={20} />
                <span className="sr-only">Last ned pdf</span>
            </LastNedLenke>
        </>
    );
}

export default DokumentLenke;
