import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { YtelserKeys } from '../ytelserKeys';
import { Sykepenger as ISykepenger } from '../../../../../models/ytelse/sykepenger';
import Sykepengertilfellet from './sykepengertilfellet/Sykepengertilfellet';
import Sykemelding from './sykemelding/Sykemelding';
import Arbeidssituasjon from '../arbeidsforhold/Arbeidssituasjon';
import KommendeUtbetalinger from '../utbetalinger/kommendeUtbetalinger/KommendeUtbetalinger';
import UtførteUtbetalingerContainer from '../utbetalinger/utførteUtbetalinger/UtførteUtbetalingerContainer';
import UtbetalingerPVentListe from './utbetalingerpåvent/UtbetalingerPåVent';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import VisuallyHiddenAutoFokusHeader from '../../../../../components/VisuallyHiddenAutoFokusHeader';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { datoSynkende } from '../../../../../utils/dateUtils';

interface Props {
    sykepenger: ISykepenger;
}

const Wrapper = styled.article`
    padding: ${theme.margin.layout};
`;

const OversiktStyling = styled.div`
    display: flex;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        flex-grow: 1;
    }
`;

const SpaceBetween = styled.div``;

function Sykepenger({ sykepenger }: Props) {
    const aktuellSykmelding = sykepenger.sykmeldinger.sort(datoSynkende(sykmelding => sykmelding.sykmeldt.til))[0];
    return (
        <ErrorBoundary boundaryName="Sykepenger">
            <Wrapper>
                <VisuallyHiddenAutoFokusHeader
                    tittel={'Sykepengerrettighet, ID-dato: ' + formaterDato(sykepenger.sykmeldtFom)}
                />
                <OversiktStyling>
                    <Flex>
                        <Sykepengertilfellet sykepenger={sykepenger} />
                        <Sykemelding sykmelding={aktuellSykmelding} />
                    </Flex>
                    <Arbeidssituasjon sykepenger={sykepenger} />
                </OversiktStyling>
                <SpaceBetween>
                    <UtbetalingerPVentListe utbetalingerPåVent={sykepenger.utbetalingerPåVent} />
                    <KommendeUtbetalinger kommendeUtbetalinger={sykepenger.kommendeUtbetalinger} />
                    <UtførteUtbetalingerContainer ytelseType={YtelserKeys.Sykepenger} />
                </SpaceBetween>
            </Wrapper>
        </ErrorBoundary>
    );
}

export default Sykepenger;
