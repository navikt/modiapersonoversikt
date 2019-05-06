import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { YtelserKeys } from '../ytelserKeys';
import { Sykepenger as ISykepenger } from '../../../../../models/ytelse/sykepenger';
import Sykepengertilfellet from './sykepengertilfellet/Sykepengertilfellet';
import Sykemelding from './sykemelding/Sykemelding';
import Arbeidssituasjon from './arbeidsforhold/Arbeidssituasjon';
import KommendeUtbetalinger from '../utbetalinger/kommendeUtbetalinger/KommendeUtbetalinger';
import UtførteUtbetalingerContainer from '../utbetalinger/utførteUtbetalinger/UtførteUtbetalingerContainer';
import UtbetalingerPVentListe from './utbetalingerpåvent/UtbetalingerPåVent';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import VisuallyHiddenAutoFokusHeader from '../../../../../components/VisuallyHiddenAutoFokusHeader';
import { formaterDato } from '../../../../../utils/stringFormatting';

interface Props {
    sykepenger: ISykepenger;
}

const Wrapper = styled.article`
    padding: ${theme.margin.layout};
`;

const OversiktStyling = styled.div`
    margin: ${theme.margin.layout};
    display: flex;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        flex-grow: 1;
    }
`;

const SpaceBetween = styled.div`
    > * {
        margin-top: 2rem;
    }
`;

function Sykepenger({ sykepenger }: Props) {
    return (
        <ErrorBoundary boundaryName="Sykepenger">
            <Wrapper>
                <VisuallyHiddenAutoFokusHeader
                    tittel={'Sykepengerrettighet, ID-dato: ' + formaterDato(sykepenger.sykmeldtFom)}
                />
                <OversiktStyling>
                    <Flex>
                        <Sykepengertilfellet sykepenger={sykepenger} />
                        <Sykemelding sykmeldinger={sykepenger.sykmeldinger} />
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
