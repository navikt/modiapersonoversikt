import * as React from 'react';
import LenkepanelPersonoversikt from '../../../../../utils/LenkepanelPersonoversikt';
import { finnMiljoStreng } from '../../../../../utils/url-utils';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';

const utbetalingUrlPart = '?oppstart_skj=UB_22_MELDEHISTORIKK&fodselsnr=';

const arenaURL = (fnr: string) => {
    const domainUrlPart = `http://arena${finnMiljoStreng()}.adeo.no/`;
    const standardArenaUrlPart = `forms/arenaMod${finnMiljoStreng().replace('-', '_')}.html`;

    return domainUrlPart + standardArenaUrlPart + utbetalingUrlPart + fnr;
};

function Arenalenke() {
    const fødselsnummer = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const url = arenaURL(fødselsnummer);
    return <LenkepanelPersonoversikt url={url}>Meldekort i Arena</LenkepanelPersonoversikt>;
}

export default Arenalenke;
