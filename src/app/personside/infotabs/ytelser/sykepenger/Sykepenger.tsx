import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { useRef } from 'react';
import { useOnMount } from 'src/utils/customHooks';
import { datoSynkende } from 'src/utils/date-utils';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import styled from 'styled-components';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import type { Sykepenger as ISykepenger } from '../../../../../models/ytelse/sykepenger';
import theme from '../../../../../styles/personOversiktTheme';
import Arbeidssituasjon from '../arbeidsforhold/Arbeidssituasjon';
import KommendeUtbetalinger from '../utbetalinger/kommendeUtbetalinger/KommendeUtbetalinger';
import Sykemelding from './sykemelding/Sykemelding';
import Sykepengertilfellet from './sykepengertilfellet/Sykepengertilfellet';
import UtbetalingerPVentListe from './utbetalingerpåvent/UtbetalingerPåVent';

interface Props {
    sykepenger: ISykepenger;
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

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        flex-grow: 1;
    }
`;

function Sykepenger(props: Props) {
    const titleId = useRef(guid());
    useOnMount(() => {
        loggEvent('Visning', 'Sykepenger');
    });

    const aktuellSykmelding = props.sykepenger.sykmeldinger.sort(
        datoSynkende((sykmelding) => sykmelding.sykmeldt.til)
    )[0];
    return (
        <ErrorBoundary boundaryName="Sykepenger">
            <article>
                <StyledPanel aria-labelledby={titleId.current}>
                    <h2 className="sr-only" id={titleId.current}>
                        Sykepengerrettighet
                    </h2>
                    <OversiktStyling>
                        <Flex>
                            <Sykepengertilfellet sykepenger={props.sykepenger} />
                            <Sykemelding sykmelding={aktuellSykmelding} />
                        </Flex>
                        <Arbeidssituasjon sykepenger={props.sykepenger} />
                    </OversiktStyling>
                    <UtbetalingerPVentListe utbetalingerPaaVent={props.sykepenger.utbetalingerPaaVent} />
                    <KommendeUtbetalinger kommendeUtbetalinger={props.sykepenger.kommendeUtbetalinger} />
                </StyledPanel>
            </article>
        </ErrorBoundary>
    );
}

export default Sykepenger;
