import * as React from 'react';
import { Link } from 'react-router-dom';
import { useInfotabsDyplenker } from '../dyplenker';
import styled from 'styled-components';
import LenkepanelPersonoversikt from '../../../../utils/LenkepanelPersonoversikt';
import theme from '../../../../styles/personOversiktTheme';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import { Dokument } from '../../../../models/saksoversikt/journalpost';

const StyledLenkepanelPersonoversikt = styled(LenkepanelPersonoversikt)`
    margin-bottom: ${theme.margin.layout};
`;

function reactrouterLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    const { href, ...rest } = props;
    return <Link to={href!} {...rest} target="_blank" />;
}

interface Props {
    valgtSakstema: Sakstema;
    valgtSaksdokument?: Dokument; // TODO: Ikke optional
}

function SakerFullscreenLenke(props: Props) {
    const dyplenker = useInfotabsDyplenker();

    return (
        <StyledLenkepanelPersonoversikt
            linkCreator={reactrouterLink}
            url={dyplenker.saker.link(props.valgtSakstema, props.valgtSaksdokument, true)}
        >
            Åpne i fullscreen
        </StyledLenkepanelPersonoversikt>
    );
}

export default SakerFullscreenLenke;
