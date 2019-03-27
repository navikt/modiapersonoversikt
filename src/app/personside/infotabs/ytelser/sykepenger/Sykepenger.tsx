import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { YtelserKeys } from '../ytelserKeys';
import { Sykepenger as ISykepenger } from '../../../../../models/ytelse/sykepenger';
import Sykepengertilfellet from './info/Sykepengertilfellet';
import Sykemelding from './info/Sykemelding';
import Arbeidsforhold from './arbeidsforhold/Arbeidsforhold';
import KommendeUtbetalinger from '../utbetalinger/kommendeUtbetalinger/KommendeUtbetalinger';
import UtførteUtbetalingerContainer from '../utbetalinger/utførteUtbetalinger/UtførteUtbetalingerContainer';
import UtbetalingerPVentListe from './utbetalingerpåvent/UtbetalingerPåVentListe';

interface Props {
    sykepenger: ISykepenger;
    sykepengenr: number;
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

function Sykepenger({ sykepenger, sykepengenr }: Props) {
    return (
        <YtelserPeriode tittel={`Periode ${sykepengenr} - ${formaterDato(sykepenger.sykmeldtFom)}`}>
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
        </YtelserPeriode>
    );
}

export default Sykepenger;
