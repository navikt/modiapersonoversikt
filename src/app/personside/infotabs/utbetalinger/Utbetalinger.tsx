import * as React from 'react';
import { Utbetaling, UtbetalingerPeriode } from '../../../../models/utbetalinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import { FilterState } from './filter/Filter';
import TotaltUtbetalt from './totalt utbetalt/TotaltUtbetalt';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../utils/groupArray';
import {
    getTypeFromYtelse,
    månedOgÅrForUtbetaling,
    reduceUtbetlingerTilYtelser,
    utbetalingDatoComparator,
    utbetaltTilBruker
} from './utils/utbetalingerUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Månedsgruppe from './MånedsGruppe';
import HandleUtbetalingerArrowKeys from './HandleUtbetalingerArrowKeys';

const UtbetalingerArticle = styled.article`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  margin-top: ${theme.margin.layout};
  > *:first-child {
    padding: ${theme.margin.px20};
  }
`;

const UtbetalingerListe = styled.ol`
  padding: 0;
  margin: 0;
`;

const Wrapper = styled.div`
  ol {
    list-style: none;
  }
`;

export const UtbetalingTabellStyling = styled.div`
    table {
        width: 100%;
        text-align: right;
        border-spacing: 0;
        * {
          padding: 0;
          margin: 0;
        }
        tr {
          > * {
            padding: 0.1rem;
            text-align: right;
          }
          > *:first-child {
            text-align: left;
          }
          > *:not(:first-child) {
            width: 6rem;
          }
        }
    }
  `;

export function getFiltrerteUtbetalinger(utbetalinger: Utbetaling[], filter: FilterState) {
    return utbetalinger
        .filter(utbetaling => filtrerPaUtbetaltTilValg(utbetaling, filter))
        .map(utbetaling => filtrerBortYtelserSomIkkeErValgt(utbetaling, filter))
        .filter(fjernTommeUtbetalinger);
}

function filtrerPaUtbetaltTilValg(utbetaling: Utbetaling, filter: FilterState) {
    return filter.utbetaltTil.includes(utbetaling.erUtbetaltTilPerson ? utbetaltTilBruker : utbetaling.utbetaltTil);
}

function filtrerBortYtelserSomIkkeErValgt(utbetaling: Utbetaling, filter: FilterState): Utbetaling {
    const ytelser = reduceUtbetlingerTilYtelser([utbetaling])
        .filter(ytelse => filter.ytelser.includes(getTypeFromYtelse(ytelse)));
    return {
        ...utbetaling,
        ytelser: ytelser
    };
}

function fjernTommeUtbetalinger(utbetaling: Utbetaling) {
    return utbetaling.ytelser && utbetaling.ytelser.length > 0;
}

interface UtbetalingerProps {
    utbetalinger: Utbetaling[];
    utbetalingerPeriode: UtbetalingerPeriode;
    filter: FilterState;
}

function Utbetalinger({filter, ...props}: UtbetalingerProps) {
    const filtrerteUtbetalinger = getFiltrerteUtbetalinger(props.utbetalinger, filter);
    if (filtrerteUtbetalinger.length === 0) {
        return (
            <AlertStripeInfo>
                Det finnes ingen utbetalinger for valgte kombinasjon av periode og filtrering.
            </AlertStripeInfo>
        );
    }

    const utbetalingerGruppert: GroupedArray<Utbetaling> = groupArray(
        filtrerteUtbetalinger.sort(utbetalingDatoComparator),
        månedOgÅrForUtbetaling
    );

    const månedsGrupper = utbetalingerGruppert.map((gruppe: ArrayGroup<Utbetaling>) => (
        <Månedsgruppe
            key={gruppe.category}
            gruppe={gruppe}
            {...props}
        />
    ));

    return (
        <Wrapper>
            <TotaltUtbetalt utbetalinger={filtrerteUtbetalinger} periode={props.utbetalingerPeriode}/>
            <HandleUtbetalingerArrowKeys utbetalinger={filtrerteUtbetalinger}>
                <UtbetalingerArticle>
                    <Undertittel>Utbetalinger</Undertittel>
                    <UtbetalingerListe>
                        {månedsGrupper}
                    </UtbetalingerListe>
                </UtbetalingerArticle>
            </HandleUtbetalingerArrowKeys>
        </Wrapper>
    );
}

export default Utbetalinger;
