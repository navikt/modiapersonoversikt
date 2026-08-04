import {
    useArbeidsoppfolging,
    useOppslagArbeidssoekerregisteret,
    useSykefravaersoppfolging
} from 'src/lib/clients/modiapersonoversikt-api';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import VisOppfolgingDetaljer from './OppfolgingDetaljerKomponent';
import SykefraversoppfolgingEkspanderbartPanel from './SykefraversoppfolgingEkspanderbartPanel';

const OppfolgingStyle = styled.div`
    > *:not(:last-child) {
        margin-bottom: ${theme.margin.layout};
    }
    padding: ${theme.margin.layout};
`;

function OppfolgingContainer() {
    const { data: arbeidsoppfolging, isError } = useArbeidsoppfolging();
    const { data: syfraversData } = useSykefravaersoppfolging();
    const { data: arbeidssoekerData, isError: isErrorArbeidssoekerRegisteret } = useOppslagArbeidssoekerregisteret();

    return (
        <OppfolgingStyle>
            <VisOppfolgingDetaljer
                detaljertOppfolging={arbeidsoppfolging}
                isErrorOppfolging={isError}
                isErrorArbeidssoekerRegisteret={isErrorArbeidssoekerRegisteret}
                oppslagArbeidssoekerRegisteret={arbeidssoekerData}
            />
            <SykefraversoppfolgingEkspanderbartPanel
                syfoPunkter={syfraversData?.sykefravaersoppfolging ?? []}
            />
        </OppfolgingStyle>
    );
}

export default OppfolgingContainer;
