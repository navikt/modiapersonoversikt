import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface Props {
    fødselsnummer: string;
}

const ArenaLenkePanel = styled.nav`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  padding: ${theme.margin.px20};
  margin-bottom: ${theme.margin.layout};
`;

const utbetalingUrlPart = '?oppstart_skj=UB_22_MELDEHISTORIKK&fodselsnr=';

const finnMiljoStreng = () => {
    const host = window.location.host;
    const bindestrekIndex = host.indexOf('-');
    if (bindestrekIndex === -1) {
        return '';
    }
    const dotIndex = host.indexOf('.');
    return host.substring(bindestrekIndex, dotIndex);
};

const arenaURL = (fnr: string) => {
    const domainUrlPart =  `http://arena${finnMiljoStreng()}.adeo.no/`;
    const standardArenaUrlPart = `forms/arenaMod${finnMiljoStreng().replace('-', '_')}.html`;

    return domainUrlPart + standardArenaUrlPart + utbetalingUrlPart + fnr;
};

function Arenalenke(props: Props) {

    return (
        <ArenaLenkePanel>
            <Normaltekst>
                <a className="lenke" href={arenaURL(props.fødselsnummer)} target={'_blank'}>
                    Meldinger/utbetalinger i Arena
                </a>
            </Normaltekst>
        </ArenaLenkePanel>
    );
}

export default Arenalenke;