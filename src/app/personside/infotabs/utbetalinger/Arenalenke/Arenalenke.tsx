import * as React from 'react';
import LenkepanelPersonoversikt from '../../../../../utils/LenkepanelPersonoversikt';
import { finnMiljoStreng } from '../../../../../utils/miljo';

interface Props {
    fødselsnummer: string;
}

const utbetalingUrlPart = '?oppstart_skj=UB_22_MELDEHISTORIKK&fodselsnr=';

const arenaURL = (fnr: string) => {
    const domainUrlPart = `http://arena${finnMiljoStreng()}.adeo.no/`;
    const standardArenaUrlPart = `forms/arenaMod${finnMiljoStreng().replace('-', '_')}.html`;

    return domainUrlPart + standardArenaUrlPart + utbetalingUrlPart + fnr;
};

function Arenalenke(props: Props) {
    const url = arenaURL(props.fødselsnummer);
    return <LenkepanelPersonoversikt url={url}>Meldekort i Arena</LenkepanelPersonoversikt>;
}

export default Arenalenke;
