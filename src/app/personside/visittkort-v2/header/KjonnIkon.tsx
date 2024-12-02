import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Kvinne from '../../../../svg/Kvinne';
import Mann from '../../../../svg/Mann';
import UkjentKjonn from '../../../../svg/UkjentKjonn';
import { Kjonn } from '../PersondataDomain';

const IkonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    margin-right: 0.5rem;
    svg {
        height: ${theme.margin.px40};
        width: auto;
    }
`;

interface Props {
    kjonn: Kjonn;
}

function KjonnIkon({ kjonn }: Props) {
    let kjonnIkon;
    if (kjonn === Kjonn.M) {
        kjonnIkon = <Mann />;
    } else if (kjonn === Kjonn.K) {
        kjonnIkon = <Kvinne />;
    } else {
        kjonnIkon = <UkjentKjonn />;
    }

    return <IkonDiv>{kjonnIkon}</IkonDiv>;
}

export default KjonnIkon;
