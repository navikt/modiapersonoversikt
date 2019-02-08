import * as React from 'react';
import { Foreldrepengerperiode } from '../../../../../models/ytelse/foreldrepenger';
import Utbetalinger from '../utbetalinger/Utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import DescriptionList from '../felles-styling/DescriptionList';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import { formaterDato } from '../../../../../utils/dateUtils';

interface Props {
    periode: Foreldrepengerperiode;
    periodenr: number;
}

const Padding = styled.div`
    margin: ${theme.margin.px10} ${theme.margin.px20} ${theme.margin.px40};
`;

const Flex = styled.div`
    display: flex;
`;

const Big = styled.div`
    flex-basis: 55%;
`;

const Small = styled.div`
    flex-basis: 45%;
`;

export function convertBoolTilJaNei(verdi: boolean | null): string | null {
    switch (verdi) {
        case true:
            return 'Ja';
        case false:
            return 'Nei';
        default:
            return null;
    }
}

function ForeldrepengePeriode({ periode, periodenr }: Props) {
    const entries = {
        'Midlertidig stans': periode.midlertidigStansDato,
        Stansårsak: periode.stansårsak,
        Mødrekvote: convertBoolTilJaNei(periode.erMødrekvote),
        'Aleneomsorg Mor': convertBoolTilJaNei(periode.harAleneomsorgMor),
        'Rett til Mødrekvote': periode.rettTilMødrekvote,
        Fedrekvote: convertBoolTilJaNei(periode.erFedrekvote),
        'Aleneomsorg Far': convertBoolTilJaNei(periode.harAleneomsorgFar),
        'Rett til Fedrekvote': periode.rettTilFedrekvote,
    };
    return (
        <YtelserPeriode tittel={`Periode ${periodenr} - ${formaterDato(periode.foreldrepengerFom)}`}>
            <Flex>
                <Small>
                    <Padding>
                        <DescriptionList entries={entries} />
                    </Padding>
                </Small>
                <Big>
                    <Utbetalinger
                        kommendeUtbetalinger={periode.kommendeUtbetalinger}
                        historiskeUtbetalinger={periode.historiskeUtbetalinger}
                    />
                </Big>
            </Flex>
        </YtelserPeriode>
    );
}

export default ForeldrepengePeriode;
