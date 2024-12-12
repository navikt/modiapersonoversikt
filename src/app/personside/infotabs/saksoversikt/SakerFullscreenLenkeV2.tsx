import type * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import LenkepanelPersonoversikt from '../../../../utils/LenkepanelPersonoversikt';
import { useInfotabsDyplenker } from '../dyplenker';
import { useHentAlleSakstemaFraResourceV2, useSakstemaURLStateV2 } from './useSakstemaURLState';
import { aggregertSakstemaV2 } from './utils/saksoversiktUtilsV2';

const StyledLenkepanelPersonoversikt = styled(LenkepanelPersonoversikt)`
    margin-bottom: ${theme.margin.layout};
`;

function reactrouterLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    const { href, ...rest } = props;
    return <a href={href} {...rest} target="_blank" rel="noreferrer" />;
}

function SakerFullscreenLenkeV2() {
    const { alleSakstema } = useHentAlleSakstemaFraResourceV2();
    const { valgteSakstemaer, valgtDokument } = useSakstemaURLStateV2(alleSakstema);
    const dyplenker = useInfotabsDyplenker();
    const aggregertSak = aggregertSakstemaV2(alleSakstema, valgteSakstemaer);

    return (
        <StyledLenkepanelPersonoversikt
            linkCreator={reactrouterLink}
            url={dyplenker.saker.link(aggregertSak, valgtDokument, true)}
        >
            Åpne i fullscreen
        </StyledLenkepanelPersonoversikt>
    );
}

export default SakerFullscreenLenkeV2;
