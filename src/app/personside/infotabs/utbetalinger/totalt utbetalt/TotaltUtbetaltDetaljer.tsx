import dayjs from 'dayjs';
import { Normaltekst } from 'nav-frontend-typografi';
import { Fragment } from 'react';
import styled from 'styled-components';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import type { Utbetaling, Ytelse, Ytelseskomponent } from '../../../../../models/utbetalinger';
import theme from '../../../../../styles/personOversiktTheme';
import { groupArray } from '../../../../../utils/groupArray';
import { formaterDato, sorterAlfabetisk } from '../../../../../utils/string-utils';
import {
    filtrerBortUtbetalingerSomIkkeErUtbetalt,
    formaterNOK,
    getBruttoSumYtelser,
    getNettoSumYtelser,
    getPeriodeFromYtelser,
    getTrekkSumYtelser,
    getTypeFromYtelse,
    reduceUtbetlingerTilYtelser
} from '../utils/utbetalinger-utils';
import type { TotaltUtbetaltProps } from './TotaltUtbetalt';

interface OwnProps {
    visDetaljer: boolean;
    toggleVisDetaljer: () => void;
}

type Props = TotaltUtbetaltProps & OwnProps;

const DetaljerStyle = styled.aside`
  h2 {
    margin: 0;
    padding: ${theme.margin.px20} 0;
  }
  th:not(:first-child) {
    font-weight: normal;
  }
  th {
    text-transform: uppercase;
    font-weight: 600;
  }
  tr {
    display: flex;
    flex-flow: row wrap;
    position: relative; /* IE11 */
    > *:first-child {
      flex-grow: 1;
      display: block; /* IE11 */
    }
    .sumBrutto,
    .sumNetto,
    .sumTrekk {
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
    }
    td.sumNetto {
      font-weight: 600;
    }
    .periodeForYtelse,
    .ytelseDetaljer {
      flex-basis: 100%;
    }
    .periodeForYtelse {
      display: block; /* IE11 */
      text-align: left;
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
    margin-top: 0.5rem;
    > *:nth-last-child(n + 3) {
      padding-top: 0.5rem;
      border-top: ${theme.border.skilleSvak};
    }
  }
  @media print {
    table {
      page-break-inside: auto;
    }
    tbody {
      page-break-inside: auto;
    }
  }
`;

function getAlleYtelsesKomponenterFraYtelser(ytelser: Ytelse[]) {
    return ytelser.reduce((acc: Ytelseskomponent[], ytelse: Ytelse) => {
        if (!ytelse.ytelseskomponentListe) {
            throw new Error('Ytelse mangler ytelseskomponenter');
        }
        // biome-ignore lint/performance/noAccumulatingSpread: biome migration
        return [...acc, ...ytelse.ytelseskomponentListe];
    }, []);
}

function getYtelsesKomponentSammendragListe(ytelser: Ytelse[]) {
    const alleYtelsesKomponenter = getAlleYtelsesKomponenterFraYtelser(ytelser);
    const ytelsesKomponenterGruppertPaaType = groupArray(
        alleYtelsesKomponenter,
        (ytelseskomponent) => ytelseskomponent.ytelseskomponenttype
    );
    const listeKomponenter = ytelsesKomponenterGruppertPaaType.map((gruppe) => {
        const sum = gruppe.array.reduce((acc, ytelsesKomponent) => acc + ytelsesKomponent.ytelseskomponentbelop, 0);
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

function getTypeOgAarFromYtelse(ytelse: Ytelse): string {
    return `${getTypeFromYtelse(ytelse)} ${dayjs(ytelse.periode.slutt).year()}`;
}

function getYtelserSammendrag(utbetalinger: Utbetaling[]) {
    const alleUtbetalteYtelser: Ytelse[] = getAlleUtbetalteYtelserFraUtbetalinger(utbetalinger);
    const ytelserGruppertPaaTema = groupArray(alleUtbetalteYtelser, getTypeOgAarFromYtelse);
    const ytelsesSammendrag = ytelserGruppertPaaTema
        .sort((a, b) => sorterAlfabetisk(a.category, b.category))
        .map((gruppe) => {
            const ytelser = gruppe.array;
            const ytelsesType = gruppe.category;
            const periode = getPeriodeFromYtelser(ytelser);
            const ytelsesKomponentSammendragListe = getYtelsesKomponentSammendragListe(ytelser);
            return (
                <tbody key={ytelsesType}>
                    <tr>
                        <th scope="row">{ytelsesType}</th>
                        <td className="sumBrutto">{formaterNOK(getBruttoSumYtelser(ytelser))}</td>
                        <td className="sumTrekk">{formaterNOK(getTrekkSumYtelser(ytelser))}</td>
                        <td className="sumNetto">{formaterNOK(getNettoSumYtelser(ytelser))}</td>
                        <td className="periodeForYtelse">
                            {formaterDato(periode.fra)} - {formaterDato(periode.til)}
                        </td>
                        <td className="ytelseDetaljer">{ytelsesKomponentSammendragListe}</td>
                    </tr>
                </tbody>
            );
        });
    return ytelsesSammendrag;
}

function TotaltUtbetaltDetaljer(props: Props) {
    const ytelserSammendrag = getYtelserSammendrag(props.utbetalinger);
    return (
        <DetaljerCollapse
            open={props.visDetaljer}
            toggle={props.toggleVisDetaljer}
            tittel={props.visDetaljer ? 'Skjul sammendrag' : 'Vis sammendrag'}
        >
            <ErrorBoundary boundaryName="Utbetalinger sammendrag">
                <DetaljerStyle aria-label="Sammendrag utbetalinger">
                    <Normaltekst tag="div">
                        <table>
                            <thead>
                                <tr>
                                    {/*biome-ignore lint/a11y/useSemanticElements: biome migration*/}
                                    <th role="columnheader" scope="col">
                                        Ytelse
                                    </th>
                                    {/*biome-ignore lint/a11y/useSemanticElements: biome migration*/}
                                    <th role="columnheader" scope="col" className="sumBrutto">
                                        Brutto
                                    </th>
                                    {/*biome-ignore lint/a11y/useSemanticElements: biome migration*/}
                                    <th role="columnheader" scope="col" className="sumTrekk">
                                        Trekk
                                    </th>
                                    {/*biome-ignore lint/a11y/useSemanticElements: biome migration*/}
                                    <th role="columnheader" scope="col" className="sumNetto">
                                        Utbetalt
                                    </th>
                                    {/*biome-ignore lint/a11y/useSemanticElements: biome migration*/}
                                    <th role="columnheader" scope="col" className="visually-hidden">
                                        Periode
                                    </th>
                                    {/*biome-ignore lint/a11y/useSemanticElements: biome migration*/}
                                    <th role="columnheader" scope="col" className="visually-hidden">
                                        Detaljer
                                    </th>
                                </tr>
                            </thead>
                            {ytelserSammendrag}
                        </table>
                    </Normaltekst>
                </DetaljerStyle>
            </ErrorBoundary>
        </DetaljerCollapse>
    );
}

export default TotaltUtbetaltDetaljer;
