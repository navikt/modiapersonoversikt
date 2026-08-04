import {
    useArbeidsoppfolging,
    useOppslagArbeidssoekerregisteret,
    useSykefravaersoppfolging
} from 'src/lib/clients/modiapersonoversikt-api';
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
    const { data: ytelsesData } = oppfolgingResource.useFetch(fraTilDato.fra, fraTilDato.til);

    const { data: arbeidsoppfolging, isError } = useArbeidsoppfolging();
    const { data: syfraversData } = useSykefravaersoppfolging();
    const { data: arbeidssoekerData, isError: isErrorArbeidssoekerRegisteret } = useOppslagArbeidssoekerregisteret();

    return (
        <OppfolgingStyle>
            <DetaljertInfoWrapper>
                <OppfolgingFilter />
                <VisOppfolgingDetaljer
                    detaljertOppfolging={arbeidsoppfolging}
                    isErrorOppfolging={isError}
                    isErrorArbeidssoekerRegisteret={isErrorArbeidssoekerRegisteret}
                    oppslagArbeidssoekerRegisteret={arbeidssoekerData}
                />
            </DetaljertInfoWrapper>
            <SykefraversoppfolgingEkspanderbartPanel syfoPunkter={syfraversData?.sykefravaersoppfolging ?? []} />
            <OppfolgingYtelserEkspanderbartPanel ytelser={ytelsesData?.ytelser ?? []} />
        </OppfolgingStyle>
    );
}

export default OppfolgingContainer;
