import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { YtelserKeys } from '../ytelserKeys';
import { Sykepenger as ISykepenger } from '../../../../../models/ytelse/sykepenger';
import Sykepengertilfellet from './info/Sykepengertilfellet';
import Sykemelding from './info/Sykemelding';
import Arbeidsforhold from './arbeidsforhold/Arbeidsforhold';
import KommendeUtbetalinger from '../utbetalinger/kommendeUtbetalinger/KommendeUtbetalinger';
import UtførteUtbetalingerContainer from '../utbetalinger/utførteUtbetalinger/UtførteUtbetalingerContainer';
import UtbetalingerPVentListe from './utbetalingerpåvent/UtbetalingerPåVentListe';
import ErrorBoundary from '../../../../../components/ErrorBoundary';

interface Props {
    sykepenger: ISykepenger;
}

const FlexOgPadding = styled.div`
    display: flex;
    padding: ${theme.margin.layout};
`;

const UtbetalingerStyle = styled.section`
    flex-basis: 55%;
`;

const InfoStyle = styled.div`
    flex-basis: 45%;
    padding: ${theme.margin.layout};
    > * {
        margin-bottom: 3rem;
    }
`;

function Sykepenger({ sykepenger }: Props) {
    return (
        <ErrorBoundary boundaryName="Sykepenger">
            <FlexOgPadding>
                <InfoStyle>
                    <Sykepengertilfellet sykepenger={sykepenger} />
                    <Sykemelding sykmeldinger={sykepenger.sykmeldinger} />
                    <Arbeidsforhold sykepenger={sykepenger} />
                </InfoStyle>
                <UtbetalingerStyle aria-label="UTbetlainger sykepenger">
                    <UtbetalingerPVentListe utbetalingerPåVent={sykepenger.utbetalingerPåVent} />
                    <KommendeUtbetalinger kommendeUtbetalinger={sykepenger.kommendeUtbetalinger} />
                    <UtførteUtbetalingerContainer ytelseType={YtelserKeys.Sykepenger} />
                </UtbetalingerStyle>
            </FlexOgPadding>
        </ErrorBoundary>
    );
}

export default Sykepenger;
