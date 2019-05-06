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
import UtbetalingerPVentListe from './utbetalingerpåvent/UtbetalingerPåVentListe';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import VisuallyHiddenAutoFokusHeader from '../../../../../components/VisuallyHiddenAutoFokusHeader';
import { formaterDato } from '../../../../../utils/stringFormatting';

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
            <article>
                <VisuallyHiddenAutoFokusHeader
                    tittel={'Sykepengerrettighet, ID-dato: ' + formaterDato(sykepenger.sykmeldtFom)}
                />
                <FlexOgPadding>
                    <InfoStyle>
                        <Sykepengertilfellet sykepenger={sykepenger} />
                        <Arbeidssituasjon sykepenger={sykepenger} />
                        <Sykemelding sykmeldinger={sykepenger.sykmeldinger} />
                    </InfoStyle>
                    <UtbetalingerStyle aria-label="Utbetlainger sykepenger">
                        <UtbetalingerPVentListe utbetalingerPåVent={sykepenger.utbetalingerPåVent} />
                        <KommendeUtbetalinger kommendeUtbetalinger={sykepenger.kommendeUtbetalinger} />
                        <UtførteUtbetalingerContainer ytelseType={YtelserKeys.Sykepenger} />
                    </UtbetalingerStyle>
                </FlexOgPadding>
            </article>
        </ErrorBoundary>
    );
}

export default Sykepenger;
