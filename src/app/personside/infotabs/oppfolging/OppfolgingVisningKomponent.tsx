import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import OppfolgingDatoPanel from './OppfolgingDatoKomponent';
import VisOppfolgingDetaljer from './OppfolgingDetaljerKomponent';
import SykefraversoppfolgingEkspanderbartPanel from './SykefraversoppfolgingEkspanderbartPanel';
import OppfolgingYtelserEkspanderbartPanel from './OppfolgingYtelserEkspanderbartPanel';
import { FetchResult, hasData } from '@nutgaard/use-fetch';

interface VisningProps {
    detaljertOppfolging: FetchResult<DetaljertOppfolging>;
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
    if (!hasData(props.detaljertOppfolging)) {
        return null;
    }
    return (
        <OppfolgingStyle>
            <DetaljertInfoWrapper>
                <OppfolgingDatoPanel restResource={props.detaljertOppfolging} />
                <VisOppfolgingDetaljer detaljertOppfolging={props.detaljertOppfolging.data} />
            </DetaljertInfoWrapper>
            <SykefraversoppfolgingEkspanderbartPanel
                syfoPunkter={props.detaljertOppfolging.data.sykefraværsoppfølging}
            />
            <OppfolgingYtelserEkspanderbartPanel ytelser={props.detaljertOppfolging.data.ytelser} />
        </OppfolgingStyle>
    );
}

export default OppfolgingVisning;
