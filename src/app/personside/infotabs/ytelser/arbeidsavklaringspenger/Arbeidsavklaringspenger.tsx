import Panel from 'nav-frontend-paneler';
import YtelserInfoGruppe from 'src/app/personside/infotabs/ytelser/felles-styling/YtelserInfoGruppe';
import DescriptionList from 'src/components/DescriptionList';
import ErrorBoundary from 'src/components/ErrorBoundary';
import type { Arbeidsavklaringspenger } from 'src/models/ytelse/arbeidsavklaringspenger';
import theme from 'src/styles/personOversiktTheme';
import { useOnMount } from 'src/utils/customHooks';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import { formaterDato } from 'src/utils/string-utils';
import styled from 'styled-components';

interface Props {
    arbeidsavklaringspenger: Arbeidsavklaringspenger;
}

const StyledPanel = styled(Panel)`
    padding: ${theme.margin.layout};
`;

const OversiktStyling = styled.div`
    display: flex;
    flex-wrap: wrap;
    > * {
        flex-basis: 40%;
        flex-grow: 1;
    }
`;

const BarneTillegg = (props: Props) => {
    const entries = {
        'Barn med stønad': props.arbeidsavklaringspenger.barnMedStonad ?? 0,
        Barnetillegg: props.arbeidsavklaringspenger.barnetillegg ?? ''
    };

    return (
        <YtelserInfoGruppe tittel="Barnetillegg">
            <DescriptionList entries={entries} />
        </YtelserInfoGruppe>
    );
};

function Arbeidsavklaringspenger(props: Props) {
    useOnMount(() => {
        loggEvent('Visning', 'Arbeidsavklaringspenger');
    });

    const ArbeidsavklaringspengerEntries = {
        VedtakId: props.arbeidsavklaringspenger.vedtakId,
        Vedtaksdato: props.arbeidsavklaringspenger.vedtaksdato
            ? formaterDato(props.arbeidsavklaringspenger.vedtaksdato)
            : '',
        'Fra og med': props.arbeidsavklaringspenger.periode.fraOgMedDato
            ? formaterDato(props.arbeidsavklaringspenger.periode.fraOgMedDato)
            : '',
        'Til og med': props.arbeidsavklaringspenger.periode.tilOgMedDato
            ? formaterDato(props.arbeidsavklaringspenger.periode.tilOgMedDato)
            : '',
        Rettighet: props.arbeidsavklaringspenger.rettighetsType ?? '',
        Status: props.arbeidsavklaringspenger.status ?? '',
        Kilde: props.arbeidsavklaringspenger.kildesystem ?? '',
        Dagsats: props.arbeidsavklaringspenger.dagsats ?? '',
        ...(props.arbeidsavklaringspenger.opphorsAarsak
            ? { Opphørsårsak: props.arbeidsavklaringspenger.opphorsAarsak }
            : {})
    };

    return (
        <ErrorBoundary boundaryName="Arbeidsavklaringspenger">
            <article>
                <StyledPanel>
                    <h2 className="sr-only">Arbeidsavklaringspenger</h2>
                    <OversiktStyling>
                        <YtelserInfoGruppe tittel="Om arbeidsavklaringspenger">
                            <DescriptionList entries={ArbeidsavklaringspengerEntries} />
                        </YtelserInfoGruppe>
                        <BarneTillegg arbeidsavklaringspenger={props.arbeidsavklaringspenger} />
                    </OversiktStyling>
                </StyledPanel>
            </article>
        </ErrorBoundary>
    );
}

export default Arbeidsavklaringspenger;
