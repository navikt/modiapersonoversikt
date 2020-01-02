import * as React from 'react';
import LenkepanelPersonoversikt from '../../../../../utils/LenkepanelPersonoversikt';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { finnMiljoStreng } from '../../../../../utils/urlUtils';

const StyledLenkepanelPersonoversikt = styled(LenkepanelPersonoversikt)`
    margin-bottom: ${theme.margin.layout};
`;

const utbetalingUrlPart = '?oppstart_skj=UB_22_MELDEHISTORIKK&fodselsnr=';

const arenaURL = (fnr: string) => {
    const domainUrlPart = `http://arena${finnMiljoStreng()}.adeo.no/`;
    const standardArenaUrlPart = `forms/arenaMod${finnMiljoStreng().replace('-', '_')}.html`;

    return domainUrlPart + standardArenaUrlPart + utbetalingUrlPart + fnr;
};

function Arenalenke() {
    const fødselsnummer = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const url = arenaURL(fødselsnummer);
    return <StyledLenkepanelPersonoversikt url={url}>Meldekort i Arena</StyledLenkepanelPersonoversikt>;
}

export default Arenalenke;
