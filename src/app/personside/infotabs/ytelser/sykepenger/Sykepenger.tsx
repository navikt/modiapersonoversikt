import * as React from 'react';
import { useRef } from 'react';
import styled from 'styled-components/macro';
import theme from '../../../../../styles/personOversiktTheme';
import { Sykepenger as ISykepenger } from '../../../../../models/ytelse/sykepenger';
import Sykepengertilfellet from './sykepengertilfellet/Sykepengertilfellet';
import Sykemelding from './sykemelding/Sykemelding';
import Arbeidssituasjon from '../arbeidsforhold/Arbeidssituasjon';
import KommendeUtbetalinger from '../utbetalinger/kommendeUtbetalinger/KommendeUtbetalinger';
import UtbetalingerPVentListe from './utbetalingerpåvent/UtbetalingerPåVent';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import VisuallyHiddenAutoFokusHeader from '../../../../../components/VisuallyHiddenAutoFokusHeader';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { datoSynkende } from '../../../../../utils/dateUtils';
import { erModiabrukerdialog } from '../../../../../utils/erNyPersonoversikt';
import { useOnMount } from '../../../../../utils/customHooks';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    sykepenger: ISykepenger;
}

const StyledArticle = styled.article`
    ${theme.hvittPanel};
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
        datoSynkende(sykmelding => sykmelding.sykmeldt.til)
    )[0];
    return (
        <ErrorBoundary boundaryName="Sykepenger">
            <StyledArticle aria-labelledby={titleId.current}>
                <h2 className="sr-only" id={titleId.current}>
                    Sykepengerrettighet
                </h2>
                {erModiabrukerdialog() && (
                    <VisuallyHiddenAutoFokusHeader
                        tittel={'Sykepengerrettighet, ID-dato: ' + formaterDato(props.sykepenger.sykmeldtFom)}
                    />
                )}
                <OversiktStyling>
                    <Flex>
                        <Sykepengertilfellet sykepenger={props.sykepenger} />
                        <Sykemelding sykmelding={aktuellSykmelding} />
                    </Flex>
                    <Arbeidssituasjon sykepenger={props.sykepenger} />
                </OversiktStyling>
                <UtbetalingerPVentListe utbetalingerPåVent={props.sykepenger.utbetalingerPåVent} />
                <KommendeUtbetalinger kommendeUtbetalinger={props.sykepenger.kommendeUtbetalinger} />
            </StyledArticle>
        </ErrorBoundary>
    );
}

export default Sykepenger;
