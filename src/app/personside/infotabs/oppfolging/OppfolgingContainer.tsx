import * as React from 'react';
import oppfolgingResource from '../../../../rest/resources/oppfolgingResource';
import { useAppState } from '../../../../utils/customHooks';
import OppfolgingFilter from './OppfolgingFilter';
import VisOppfolgingDetaljer from './OppfolgingDetaljerKomponent';
import SykefraversoppfolgingEkspanderbartPanel from './SykefraversoppfolgingEkspanderbartPanel';
import OppfolgingYtelserEkspanderbartPanel from './OppfolgingYtelserEkspanderbartPanel';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { DetaljertOppfolging } from '../../../../models/oppfolging';

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

function OppfolgingContainer() {
    const periode = useAppState((appState) => appState.oppfolging.periode);
    const fraTilDato = periode.egendefinertPeriode;
    const oppfolgingResponse = oppfolgingResource.useFetch(fraTilDato.fra, fraTilDato.til);
    const oppfolging = oppfolgingResponse.data as DetaljertOppfolging;

    return (
        <OppfolgingStyle>
            <DetaljertInfoWrapper>
                <OppfolgingFilter />
                <VisOppfolgingDetaljer detaljertOppfolging={oppfolging ?? {}} isError={oppfolgingResponse.isError} />
            </DetaljertInfoWrapper>
            <SykefraversoppfolgingEkspanderbartPanel syfoPunkter={oppfolging?.sykefraværsoppfølging ?? []} />
            <OppfolgingYtelserEkspanderbartPanel ytelser={oppfolging?.ytelser ?? []} />
        </OppfolgingStyle>
    );
}

export default OppfolgingContainer;
