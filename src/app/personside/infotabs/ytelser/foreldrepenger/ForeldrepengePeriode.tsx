import * as React from 'react';
import { Foreldrepengerperiode } from '../../../../../models/ytelse/foreldrepenger';
import Utbetalinger from '../utbetalinger/Utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import DescriptionList from '../../../../../components/DescriptionList';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import { formaterDato } from '../../../../../utils/dateUtils';
import { YtelserKeys } from '../ytelserKeys';

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

const Stor = styled.div`
    flex-basis: 55%;
`;

const Liten = styled.div`
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
        'Rett til Fedrekvote': periode.rettTilFedrekvote
    };
    return (
        <YtelserPeriode tittel={`Periode ${periodenr} - ${formaterDato(periode.foreldrepengerFom)}`}>
            <Flex>
                <Liten>
                    <Padding>
                        <DescriptionList entries={entries} />
                    </Padding>
                </Liten>
                <Stor>
                    <Utbetalinger
                        kommendeUtbetalinger={periode.kommendeUtbetalinger}
                        historiskeUtbetalinger={periode.historiskeUtbetalinger}
                        ytelsesType={YtelserKeys.Foreldrepenger}
                    />
                </Stor>
            </Flex>
        </YtelserPeriode>
    );
}

export default ForeldrepengePeriode;
