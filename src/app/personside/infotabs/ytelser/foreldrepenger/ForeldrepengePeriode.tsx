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
}

const Padding = styled.div`
  margin: ${theme.margin.px10} ${theme.margin.px20} ${theme.margin.px40};
`;

const Flex = styled.div`
  display: flex;
`;

const TittelStyling = styled.div`
  padding: 1rem 0.3rem .5rem;
`;

function ForeldrepengePeriode({periode}: Props) {
    const entries = {
        'Midlertidig stans': periode.midlertidigStansDato,
        'Rett til Mødrekvote': periode.rettTilMødrekvote,
        'Rett til Fedrekvote': periode.rettTilFedrekvote,
        'Aleneomsorg Far': periode.harAleneomsorgFar,
        'Aleneomsorg Mor' : periode.harAleneomsorgMor,
        Stansårsak: periode.stansårsak,
        Fedrekvote: periode.erFedrekvote,
        Mødrekvote: periode.erMødrekvote

    };
    return (
        <YtelserPeriode tittel={`Periode - ${formaterDato(periode.foreldrepengerFom)}`}>
            <Flex>
            <Padding>
                <DescriptionList entries={entries}/>
            </Padding>
                <TittelStyling>
            <Utbetalinger
                kommendeUtbetalinger={periode.kommendeUtbetalinger}
                historiskeUtbetalinger={periode.historiskeUtbetalinger}
            />
                </TittelStyling>
            </Flex>
        </YtelserPeriode>
    );
}

export default ForeldrepengePeriode;
