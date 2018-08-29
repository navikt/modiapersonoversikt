import * as React from 'react';
import styled from 'styled-components';
import { TotaltUtbetaltProps } from './TotaltUtbetalt';
import { Undertekst } from 'nav-frontend-typografi';
import { Utbetaling, Ytelse, Ytelseskomponent } from '../../../../models/utbetalinger';
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
import { Fragment } from 'react';
import ErrorBoundary from '../../../../components/ErrorBoundary';

const Wrapper = styled.div`
  margin: 1.5rem 0 .5rem;
  th {
    font-weight: bold;
  }
  tr {
    display: flex;
    flex-flow: row wrap;
    > *:first-child {
      flex-grow: 1;
    }
    > *:nth-child(4) {
      font-weight: bold;
    }
    > *:nth-child(n+5) {
      flex-basis: 100%;
      opacity: .7;
    }
    > *:nth-child(5) {
      text-align: left;
    }
    > *:last-child {
      flex-grow: 1;
      text-align: right;
    }
    dl {
      margin-right: 12rem;
      display: flex;
      flex-flow: row wrap;
      text-align: right;
      dt {
        flex-basis: 50%;
        flex-grow: 1;
      }
      dd {
        padding-left: 1rem;
        flex-basis: 7rem;
      }
    }
  }
  tbody tr > *:nth-last-child(n+3) {
      padding-top: .5rem;
      margin-top: .5rem;
      border-top: 2px solid ${theme.color.bakgrunn};
  }
`;

function getAlleYtelsesKomponenterFraYtelser(ytelser: Ytelse[]) {
    return ytelser.reduce(
        (acc: Ytelseskomponent[], ytelse: Ytelse) => {
            if (!ytelse.ytelseskomponentListe) {
                throw new Error('Ytelse mangler ytelseskomponenter');
            }
            return [...acc, ...ytelse.ytelseskomponentListe];
        },
        []
    );
}

function getYtelsesKomponentSammendragListe(ytelser: Ytelse[]) {
    const alleYtelsesKomponenter = getAlleYtelsesKomponenterFraYtelser(ytelser);
    const ytelsesKomponenterGruppertPåType = groupArray(
        alleYtelsesKomponenter,
        ytelseskomponent => ytelseskomponent.ytelseskomponenttype
    );
    const listeKomponenter = ytelsesKomponenterGruppertPåType.map(gruppe => {
        const sum = gruppe.array.reduce((acc, ytelsesKomponent) => acc + ytelsesKomponent.ytelseskomponentbeløp, 0);
        return (
            <Fragment key={gruppe.category}>
                <dt>{gruppe.category}</dt>
                <dd>{formaterNOK(sum)}</dd>
            </Fragment>
        );
    });
    return <dl>{listeKomponenter}</dl>;
}

function getAlleUtbetalteYtelserFraUtbetalinger(utbetalinger: Utbetaling[]) {
    return utbetalinger
        .filter(filtrerBortUtbetalingerSomIkkeErUtbetalt)
        .reduce(
            (acc: Ytelse[], utbetaling: Utbetaling) => {
                if (!utbetaling.ytelser) {
                    throw new Error('Utbetaling mangler ytelser');
                }
                return [...acc, ...utbetaling.ytelser];
            },
            []);
}

function getYtelserSammendrag(utbetalinger: Utbetaling[]) {
    const alleUtbetalteYtelser: Ytelse[] = getAlleUtbetalteYtelserFraUtbetalinger(utbetalinger);
    const ytelserGruppertPåTema = groupArray(
        alleUtbetalteYtelser,
        ytelse => ytelse.type || 'Mangler type'
    );
    const ytelsesSammendrag = ytelserGruppertPåTema.map(gruppe => {
        const ytelser = gruppe.array;
        const type = gruppe.category;
        const periode = getPeriodeFromYtelser(ytelser);
        const ytelsesKomponentSammendragListe = getYtelsesKomponentSammendragListe(ytelser);
        return (
            <tr key={type}>
                <th>{type}</th>
                <td>{formaterNOK(getBruttoSumYtelser(ytelser))}</td>
                <td>{formaterNOK(getTrekkSumYtelser(ytelser))}</td>
                <td>{formaterNOK(getNettoSumYtelser(ytelser))}</td>
                <td>{formaterDato(periode.fra)} - {formaterDato(periode.til)}</td>
                <td>{ytelsesKomponentSammendragListe}</td>
            </tr>
        );
    });
    return ytelsesSammendrag;
}

function TotaltUtbetaltDetaljer(props: TotaltUtbetaltProps) {
    const ytelserSammendrag = getYtelserSammendrag(props.utbetalinger);
    return (
        <ErrorBoundary>
            <Wrapper>
                <Undertekst tag="span">
                    <h2>Sammendrag</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Ytelse</th>
                            <th>Brutto</th>
                            <th>Trekk</th>
                            <th>Utbetalt</th>
                            <th className="visually-hidden">Periode</th>
                            <th className="visually-hidden">Detaljer</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ytelserSammendrag}
                        </tbody>
                    </table>
                </Undertekst>
            </Wrapper>
        </ErrorBoundary>
    );
}

export default TotaltUtbetaltDetaljer;
