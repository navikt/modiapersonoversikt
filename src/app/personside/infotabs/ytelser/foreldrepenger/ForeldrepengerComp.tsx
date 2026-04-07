import { capitalize } from 'lodash';
import Panel from 'nav-frontend-paneler';
import YtelserInfoGruppe from 'src/app/personside/infotabs/ytelser/felles-styling/YtelserInfoGruppe';
import DescriptionList from 'src/components/DescriptionList';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { type Foreldrepenger, ForeldrepengerYtelse } from 'src/generated/modiapersonoversikt-api';
import type { ForeldrepengerPerioder } from 'src/models/ytelse/foreldrepenger';
import theme from 'src/styles/personOversiktTheme';
import { formaterDato, periodeEllerNull, prosentEllerNull } from 'src/utils/string-utils';
import { StyledTable } from 'src/utils/table/StyledTable';
import styled from 'styled-components';

interface Props {
    foreldrepenger: Foreldrepenger;
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

function ForeldrepengerPerioder({ perioder }: { perioder: ForeldrepengerPerioder[] }) {
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

function ForeldrepengerComp(props: Props) {
    const erEngangstonad = props.foreldrepenger.ytelse === ForeldrepengerYtelse.ENGANGSST_NAD;

    const perioder = {
        'Fra og med': props.foreldrepenger.fom ? formaterDato(props.foreldrepenger.fom) : '',
        'Til og med': props.foreldrepenger.tom ? formaterDato(props.foreldrepenger.tom) : ''
    };

    const entries = {
        Saksnummer: props.foreldrepenger.saksnummer,
        Ytelsetype: capitalize(props.foreldrepenger.ytelse),
        ...(erEngangstonad ? { Dato: formaterDato(props.foreldrepenger.fom) } : perioder)
    };

    return (
        <ErrorBoundary boundaryName="FpYtelse">
            <article>
                <StyledPanel>
                    <h2 className="sr-only">{props.foreldrepenger.ytelse}</h2>
                    <OversiktStyling>
                        <YtelserInfoGruppe tittel={`Om ${props.foreldrepenger.ytelse.toLowerCase()}`}>
                            <DescriptionList entries={entries} />
                        </YtelserInfoGruppe>
                        {!erEngangstonad && <ForeldrepengerPerioder perioder={props.foreldrepenger.perioder} />}
                    </OversiktStyling>
                </StyledPanel>
            </article>
        </ErrorBoundary>
    );
}

export default ForeldrepengerComp;
