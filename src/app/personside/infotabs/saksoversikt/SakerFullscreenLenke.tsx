import * as React from 'react';
import { useInfotabsDyplenker } from '../dyplenker';
import styled from 'styled-components';
import LenkepanelPersonoversikt from '../../../../utils/LenkepanelPersonoversikt';
import theme from '../../../../styles/personOversiktTheme';
import { SaksoversiktValg } from './utils/useSaksoversiktValg';

const StyledLenkepanelPersonoversikt = styled(LenkepanelPersonoversikt)`
    margin-bottom: ${theme.margin.layout};
`;

function SakerFullscreenLenke(props: SaksoversiktValg) {
    const dyplenker = useInfotabsDyplenker();

    return (
        <StyledLenkepanelPersonoversikt url={dyplenker.saker.link(props.sakstema, props.saksdokument, true)}>
            Åpne i fullscreen
        </StyledLenkepanelPersonoversikt>
    );
}

export default SakerFullscreenLenke;
