import * as React from 'react';
import { Link } from 'react-router-dom';
import { useInfotabsDyplenker } from '../dyplenker';
import styled from 'styled-components';
import LenkepanelPersonoversikt from '../../../../utils/LenkepanelPersonoversikt';
import theme from '../../../../styles/personOversiktTheme';
import { SaksoversiktValg } from './utils/useSaksoversiktValg';

const StyledLenkepanelPersonoversikt = styled(LenkepanelPersonoversikt)`
    margin-bottom: ${theme.margin.layout};
`;

function reactrouterLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    const { href, ...rest } = props;
    return <Link to={href!} {...rest} target="_blank" />;
}

function SakerFullscreenLenke(props: SaksoversiktValg) {
    const dyplenker = useInfotabsDyplenker();

    return (
        <StyledLenkepanelPersonoversikt
            linkCreator={reactrouterLink}
            url={dyplenker.saker.link(props.sakstema, props.saksdokument, true)}
        >
            Åpne i fullscreen
        </StyledLenkepanelPersonoversikt>
    );
}

export default SakerFullscreenLenke;
