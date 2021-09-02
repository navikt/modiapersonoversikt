import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import OppfolgingDatoPanel from './OppfolgingDatoKomponent';
import VisOppfolgingDetaljer from './OppfolgingDetaljerKomponent';
import SykefravarsoppfolgingEkspanderbartPanel from './SykefravarsoppfolgingEkspanderbartPanel';
import OppfolgingYtelserEkspanderbartPanel from './OppfolgingYtelserEkspanderbartPanel';

interface VisningProps {
    detaljertOppfolging: DetaljertOppfolging;
}

const OppfolgingStyle = styled.div`
    > *:not(:last-child) {
        margin-bottom: ${theme.margin.layout};
    }
    padding: ${theme.margin.layout};
`;

const DetaljertInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    > *:last-child {
        margin-left: ${theme.margin.layout};
        flex-basis: 75%;
    }
`;

function OppfolgingVisning(props: VisningProps) {
    return (
        <OppfolgingStyle>
            <DetaljertInfoWrapper>
                <OppfolgingDatoPanel />
                <VisOppfolgingDetaljer detaljertOppfolging={props.detaljertOppfolging} />
            </DetaljertInfoWrapper>
            <SykefravarsoppfolgingEkspanderbartPanel syfoPunkter={props.detaljertOppfolging.sykefravaersoppfolging} />
            <OppfolgingYtelserEkspanderbartPanel ytelser={props.detaljertOppfolging.ytelser} />
        </OppfolgingStyle>
    );
}

export default OppfolgingVisning;
