import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import { AlignTextRight } from '../../../../components/common-styled-components';
import { FilterState, FraTilDato } from './Filter';
import { Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import PrintKnapp from '../../../../components/PrintKnapp';
import { formaterDato } from '../../../../utils/dateUtils';
import {
    getBruttoSumYtelser,
    getFraDateFromFilter,
    getNettoSumYtelser,
    getTilDateFromFilter,
    getTrekkSumYtelser, summertBelløpStringFraUtbetalinger
}
    from './utbetalingerUtils';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

interface Props {
    utbetalinger: Utbetaling[];
    filter: FilterState;
}

const Style = styled.div`
  margin: 1.2rem;
  table {
    width: 100%;
    text-align: right;
  }
  th {
    font-weight: normal;
  }
  td {
    font-weight: bold;
  }
  tr {
    > *:first-child {
      text-align: left;
    }
  }
`;

function TotaltUtbetalt(props: Props) {

    const periode: FraTilDato = {
        fra: getFraDateFromFilter(props.filter),
        til: getTilDateFromFilter(props.filter)
    };
    const brutto: string = summertBelløpStringFraUtbetalinger(props.utbetalinger, getBruttoSumYtelser);
    const trekk: string = summertBelløpStringFraUtbetalinger(props.utbetalinger, getTrekkSumYtelser);
    const utbetalt: string = summertBelløpStringFraUtbetalinger(props.utbetalinger, getNettoSumYtelser);

    return (
        <Style>
            <Undertittel>Totalt utbetalt for perioden</Undertittel>
            <AlignTextRight><PrintKnapp onClick={() => console.log('ikke implementert')}/></AlignTextRight>
            <Undertekst tag="span">
                <table>
                    <thead>
                    <tr>
                        <th>Totalt Utbetalt</th>
                        <th>Brutto</th>
                        <th>Trekk</th>
                        <th>Utbetalt</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{formaterDato(periode.fra)} - {formaterDato(periode.til)}</td>
                        <td>{brutto}</td>
                        <td>{trekk}</td>
                        <td>{utbetalt}</td>
                    </tr>
                    </tbody>
                </table>
            </Undertekst>
        </Style>
    );
}

export default TotaltUtbetalt;
