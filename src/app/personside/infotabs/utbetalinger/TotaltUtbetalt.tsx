import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import { AlignTextRight } from '../../../../components/common-styled-components';
import { FilterState, FraTilDato } from './Filter';
import { Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import PrintKnapp from '../../../../components/PrintKnapp';
import { formaterDato } from '../../../../utils/dateUtils';
import {
    formaterNOK, getBruttoSumUtbetaling, getFraDateFromFilter, getTilDateFromFilter, getTrekkSumUtbetaling
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
    const brutto: number = props.utbetalinger
        .reduce((acc: number, utbetaling: Utbetaling) => acc + getBruttoSumUtbetaling(utbetaling), 0);
    const trekk: number = props.utbetalinger
        .reduce((acc: number, utbetaling: Utbetaling) => acc + getTrekkSumUtbetaling(utbetaling), 0);

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
                        <td>{formaterNOK(brutto)}</td>
                        <td>{formaterNOK(trekk)}</td>
                        <td>{formaterNOK(brutto - (-trekk))}</td>
                    </tr>
                    </tbody>
                </table>
            </Undertekst>
        </Style>
    );
}

export default TotaltUtbetalt;
