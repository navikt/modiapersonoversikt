import type { DetaljertOppfolging } from 'src/models/oppfolging';
import { useOppfolgingFilter } from 'src/redux/oppfolging/reducer';
import styled from 'styled-components';
import oppfolgingResource from '../../../../rest/resources/oppfolgingResource';
import theme from '../../../../styles/personOversiktTheme';
import VisOppfolgingDetaljer from './OppfolgingDetaljerKomponent';
import OppfolgingFilter from './OppfolgingFilter';
import OppfolgingYtelserEkspanderbartPanel from './OppfolgingYtelserEkspanderbartPanel';
import SykefraversoppfolgingEkspanderbartPanel from './SykefraversoppfolgingEkspanderbartPanel';

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
    const periode = useOppfolgingFilter();
    const fraTilDato = periode.egendefinertPeriode;
    const oppfolgingResponse = oppfolgingResource.useFetch(fraTilDato.fra, fraTilDato.til);
    const oppfolging = oppfolgingResponse.data as DetaljertOppfolging;

    return (
        <OppfolgingStyle>
            <DetaljertInfoWrapper>
                <OppfolgingFilter />
                <VisOppfolgingDetaljer detaljertOppfolging={oppfolging ?? {}} isError={oppfolgingResponse.isError} />
            </DetaljertInfoWrapper>
            <SykefraversoppfolgingEkspanderbartPanel syfoPunkter={oppfolging?.sykefravaersoppfolging ?? []} />
            <OppfolgingYtelserEkspanderbartPanel ytelser={oppfolging?.ytelser ?? []} />
        </OppfolgingStyle>
    );
}

export default OppfolgingContainer;
