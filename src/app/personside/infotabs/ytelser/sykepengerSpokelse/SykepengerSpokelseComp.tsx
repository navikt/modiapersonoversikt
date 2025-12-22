import Panel from 'nav-frontend-paneler';
import YtelserInfoGruppe from 'src/app/personside/infotabs/ytelser/felles-styling/YtelserInfoGruppe';
import ErrorBoundary from 'src/components/ErrorBoundary';
import type { Utbetalingsperiode, Utbetalingsperioder } from 'src/generated/modiapersonoversikt-api';
import theme from 'src/styles/personOversiktTheme';
import { periodeEllerNull, prosentEllerNull } from 'src/utils/string-utils';
import { StyledTable } from 'src/utils/table/StyledTable';
import styled from 'styled-components';

interface Props {
    sykepenger: Utbetalingsperioder;
}

const StyledPanel = styled(Panel)`
    padding: 0!important;
`;

const OversiktStyling = styled.div`
    padding: ${theme.margin.layout};
    display: flex;
    flex-wrap: wrap;
    > * {
        flex-basis: 40%;
        flex-grow: 1;
    }
`;

function SykepengerPerioder({ perioder }: { perioder: Utbetalingsperiode[] }) {
    if (perioder.length === 0) {
        return <></>;
    }
    const tittelRekke = ['Utbetalingsperiode', 'Grad'];
    const rows = perioder.map((periode) => [
        periodeEllerNull({ fra: periode.fom, til: periode.tom }),
        prosentEllerNull(periode.grad)
    ]);
    return (
        <YtelserInfoGruppe tittel="Perioder">
            <StyledTable tittelRekke={tittelRekke} rows={rows} />
        </YtelserInfoGruppe>
    );
}

function SykepengerPerioderSpokelse(props: Props) {
    return (
        <ErrorBoundary boundaryName="SykepengerSpokelse">
            <article>
                <StyledPanel>
                    <h2 className="sr-only">Sykepenger</h2>
                    <OversiktStyling>
                        <SykepengerPerioder perioder={props.sykepenger.utbetaltePerioder} />
                    </OversiktStyling>
                </StyledPanel>
            </article>
        </ErrorBoundary>
    );
}

export default SykepengerPerioderSpokelse;
