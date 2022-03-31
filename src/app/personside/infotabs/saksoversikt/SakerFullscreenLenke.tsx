import * as React from 'react';
import { Link } from 'react-router-dom';
import { useInfotabsDyplenker } from '../dyplenker';
import styled from 'styled-components';
import LenkepanelPersonoversikt from '../../../../utils/LenkepanelPersonoversikt';
import theme from '../../../../styles/personOversiktTheme';
import { useHentAlleSakstemaFraResource, useSakstemaURLState } from './useSakstemaURLState';
import { aggregertSakstema } from './utils/saksoversiktUtils';

const StyledLenkepanelPersonoversikt = styled(LenkepanelPersonoversikt)`
    margin-bottom: ${theme.margin.layout};
`;

function reactrouterLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    const { href, ...rest } = props;
    return <Link to={href!} {...rest} target="_blank" />;
}

function SakerFullscreenLenke() {
    const alleSakstema = useHentAlleSakstemaFraResource();
    const { valgteSakstemaer, valgtDokument } = useSakstemaURLState(alleSakstema);
    const dyplenker = useInfotabsDyplenker();
    const aggregertSak = aggregertSakstema(alleSakstema, valgteSakstemaer);

    return (
        <StyledLenkepanelPersonoversikt
            linkCreator={reactrouterLink}
            url={dyplenker.saker.link(aggregertSak, valgtDokument, true)}
        >
            Åpne i fullscreen
        </StyledLenkepanelPersonoversikt>
    );
}

export default SakerFullscreenLenke;
