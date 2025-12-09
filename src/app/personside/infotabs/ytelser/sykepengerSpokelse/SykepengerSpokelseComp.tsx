import Panel from 'nav-frontend-paneler';
import YtelserInfoGruppe from 'src/app/personside/infotabs/ytelser/felles-styling/YtelserInfoGruppe';
import DescriptionList from 'src/components/DescriptionList';
import ErrorBoundary from 'src/components/ErrorBoundary';
import type { SykpengerVedtak, Utbetalingsperiode } from 'src/generated/modiapersonoversikt-api';
import theme from 'src/styles/personOversiktTheme';
import { formaterDato, periodeEllerNull, prosentEllerNull } from 'src/utils/string-utils';
import { StyledTable } from 'src/utils/table/StyledTable';
import styled from 'styled-components';

interface Props {
    sykepenger: SykpengerVedtak;
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
    const entries = {
        Vedtaksreferanse: props.sykepenger.vedtaksreferanse,
        Vedtaksdato: props.sykepenger.vedtattTidspunkt
            ? formaterDato(props.sykepenger.vedtattTidspunkt)
            : 'Ukjent vedtaksdato'
    };

    return (
        <ErrorBoundary boundaryName="FpYtelse">
            <article>
                <StyledPanel>
                    <h2 className="sr-only">Sykepenger fra spokelse</h2>
                    <OversiktStyling>
                        <YtelserInfoGruppe tittel="Om sykepenger fra spokelse">
                            <DescriptionList entries={entries} />
                        </YtelserInfoGruppe>
                        <SykepengerPerioder perioder={props.sykepenger.utbetalinger} />
                    </OversiktStyling>
                </StyledPanel>
            </article>
        </ErrorBoundary>
    );
}

export default SykepengerPerioderSpokelse;
