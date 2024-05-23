import * as React from 'react';
import styled from 'styled-components';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { Link, useLocation } from 'react-router-dom';
import { Dokument, DokumentStatus, Journalpost } from '../../../../../models/saksoversikt/journalpost';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { paths } from '../../../../routes/routing';
import { useFodselsnummer } from '../../../../../utils/customHooks';
import { getSaksdokumentUrl } from '../dokumentvisning/getSaksdokumentUrl';
import { erSakerFullscreen } from '../utils/erSakerFullscreen';
import { useInfotabsDyplenker } from '../../dyplenker';
import SvgDownload from './../../../../../svg/download.svg';
import theme from '../../../../../styles/personOversiktTheme';

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

function getUrlSaksdokumentEgetVindu(
    fodselsnummer: string,
    journalpostId: string | null,
    dokumentReferanse: string | null
) {
    const saksdokumentUrl = getSaksdokumentUrl(fodselsnummer, journalpostId, dokumentReferanse);

    return `${paths.saksdokumentEgetVindu}?${saksdokumentUrl}`;
}

function DokumentLenke(props: Props) {
    const pathname = useLocation().pathname;
    const fodselsnummer = useFodselsnummer();
    const dyplenker = useInfotabsDyplenker();

    if (!props.kanVises) {
        return <Element>{dokumentTekst(props.dokument)}</Element>;
    }

    const apneDokumentINyttVindu = !erSakerFullscreen(pathname);
    const journalpostId = props.journalPost.journalpostId;
    const dokumentReferanse = props.dokument.dokumentreferanse;

    if (journalpostId === null || dokumentReferanse === null) {
        return (
            <>
                {dokumentTekst(props.dokument)} <Undertekst>(Dokument er ikke tilgjengelig)</Undertekst>
            </>
        );
    }

    const url = apneDokumentINyttVindu
        ? getUrlSaksdokumentEgetVindu(fodselsnummer, journalpostId, dokumentReferanse)
        : dyplenker.saker.link(props.valgtSakstema, props.dokument);

    const saksdokumentUrl = getSaksdokumentUrl(fodselsnummer, journalpostId, dokumentReferanse);
    return (
        <>
            <Link to={url} target={apneDokumentINyttVindu ? '_blank' : undefined} className="lenke typo-element">
                {dokumentTekst(props.dokument)}
            </Link>
            <LastNedLenke href={saksdokumentUrl} className="lenke typo-element" download title="Last ned">
                <SvgDownload aria-hidden width={20} height={20} />
                <span className="sr-only">Last ned pdf</span>
            </LastNedLenke>
        </>
    );
}

export default DokumentLenke;
