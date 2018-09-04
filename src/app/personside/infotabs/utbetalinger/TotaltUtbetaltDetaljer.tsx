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
    getTrekkSumYtelser, getTypeFromYtelse, reduceUtbetlingerTilYtelser
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
    position: relative; /* IE11 */
    > *:first-child {
      flex-grow: 1;
      display: block; /* IE11 */
    }
    .sumBrutto, .sumNetto, .sumTrekk {
      position: absolute; /* IE11 */
    }
    .sumBrutto {
      right: 12rem; /* IE11 */
    }
    .sumTrekk {
      right: 6rem; /* IE11 */
    }
    .sumNetto {
      right: 0; /* IE11 */
      font-weight: bold;
    }
    .periodeForYtelse, .ytelseDetaljer {
      flex-basis: 100%;
      opacity: .7;
    }
    .periodeForYtelse {
      display: block; /* IE11 */
      text-align: left;
    }
    .visually-hidden {
      ${theme.visuallyHidden}
    }
    .ytelseDetaljer {
      display: block; /* IE11 */
      flex-grow: 1;
      text-align: right;
      margin-right: 12rem;
      dl {
        display: flex;
        flex-flow: row wrap;
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
  }
  tbody tr {
    margin-top: .5rem;
    > *:nth-last-child(n+3) {
        padding-top: .5rem;
        border-top: 2px solid ${theme.color.bakgrunn};
    }
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
    const utbetalteUtbetalinger = utbetalinger.filter(filtrerBortUtbetalingerSomIkkeErUtbetalt);
    return reduceUtbetlingerTilYtelser(utbetalteUtbetalinger);
}

function getYtelserSammendrag(utbetalinger: Utbetaling[]) {
    const alleUtbetalteYtelser: Ytelse[] = getAlleUtbetalteYtelserFraUtbetalinger(utbetalinger);
    const ytelserGruppertPåTema = groupArray(
        alleUtbetalteYtelser,
        getTypeFromYtelse
    );
    const ytelsesSammendrag = ytelserGruppertPåTema.map(gruppe => {
        const ytelser = gruppe.array;
        const ytelsesType = gruppe.category;
        const periode = getPeriodeFromYtelser(ytelser);
        const ytelsesKomponentSammendragListe = getYtelsesKomponentSammendragListe(ytelser);
        return (
            <tr key={ytelsesType}>
                <th>{ytelsesType}</th>
                <td className="sumBrutto">{formaterNOK(getBruttoSumYtelser(ytelser))}</td>
                <td className="sumTrekk">{formaterNOK(getTrekkSumYtelser(ytelser))}</td>
                <td className="sumNetto">{formaterNOK(getNettoSumYtelser(ytelser))}</td>
                <td className="periodeForYtelse">{formaterDato(periode.fra)} - {formaterDato(periode.til)}</td>
                <td className="ytelseDetaljer">{ytelsesKomponentSammendragListe}</td>
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
                            <th className="sumBrutto">Brutto</th>
                            <th className="sumTrekk">Trekk</th>
                            <th className="sumNetto">Utbetalt</th>
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
