import * as React from 'react';
import styled from 'styled-components';
import { TotaltUtbetaltProps } from './TotaltUtbetalt';
import { Undertekst } from 'nav-frontend-typografi';
import { Utbetaling, Ytelse } from '../../../../models/utbetalinger';
import { groupArray } from '../../../../utils/groupArray';
import theme from '../../../../styles/personOversiktTheme';
import {
    filtrerBortUtbetalingerSomIkkeErUtbetalt,
    formaterNOK,
    getBruttoSumYtelser,
    getNettoSumYtelser,
    getPeriodeFromYtelser,
    getTrekkSumYtelser
} from './utbetalingerUtils';
import { formaterDato } from '../../../../utils/dateUtils';

const Wrapper = styled.div`
  margin: 1.5rem 0 .5rem;
  th {
    font-weight: bold;
  }
  tbody:not(:last-child), thead {
   &> tr:last-child > * {
        padding-bottom: .5rem;
        border-bottom: 2px solid ${theme.color.bakgrunn};
    }
  }
  tbody:not(:first-child) {
   &> tr:first-child > * {
        padding-top: .5rem;
    }
  }`;

function getDetaljer(utbetalinger: Utbetaling[]) {
    const alleUtbetalteYtelser: Ytelse[] = utbetalinger
        .filter(filtrerBortUtbetalingerSomIkkeErUtbetalt)
        .reduce(
        (acc: Ytelse[], utbetaling: Utbetaling) => {
            if (!utbetaling.ytelser) {
                throw new Error('Utbetaling mangler ytelser');
            }
            return [...acc, ...utbetaling.ytelser];
        },
        []);
    const ytelserGruppertPåTema = groupArray(
        alleUtbetalteYtelser,
        ytelse => ytelse.type || 'Mangler tema'
    );
    const detaljer = ytelserGruppertPåTema.map(gruppe => {
        console.log(gruppe);
        const ytelser = gruppe.array;
        const periode = getPeriodeFromYtelser(ytelser);
        return (
            <tbody key={gruppe.category}>
            <tr>
                <th>
                    {gruppe.category} <br/>
                    <Undertekst tag="span">{formaterDato(periode.fra)} - {formaterDato(periode.til)}</Undertekst>
                </th>
                <td>{formaterNOK(getBruttoSumYtelser(ytelser))}</td>
                <td>{formaterNOK(getTrekkSumYtelser(ytelser))}</td>
                <td>{formaterNOK(getNettoSumYtelser(ytelser))}</td>
            </tr>
            </tbody>
        );
    });
    return detaljer;
}

function TotaltUtbetaltDetaljer(props: TotaltUtbetaltProps) {

    const detaljer = getDetaljer(props.utbetalinger);
    return (
        <Wrapper>
            <Undertekst tag="span">
                <table>
                    <thead>
                    <tr>
                        <th>Detaljer</th>
                        <th>Brutto</th>
                        <th>Trekk</th>
                        <th>Utbetalt</th>
                    </tr>
                    </thead>
                    {detaljer}
                </table>
            </Undertekst>
        </Wrapper>
    );
}

export default TotaltUtbetaltDetaljer;
