import * as React from 'react';
import { Utbetaling, Ytelse } from '../../../../models/utbetalinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { FilterState } from './filter/Filter';
import TotaltUtbetalt from './totalt utbetalt/TotaltUtbetalt';
import { Bold, Uppercase } from '../../../../components/common-styled-components';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../utils/groupArray';
import {
    getGjeldendeDatoForUtbetaling,
    getTypeFromYtelse,
    månedOgÅrForUtbetaling,
    reduceUtbetlingerTilYtelser,
    utbetalingDatoComparator, utbetaltTilBruker
} from './utils/utbetalingerUtils';
import UtbetalingKomponent from './utbetaling/Utbetaling';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

export interface FokusProps {
    ytelseIFokus: Ytelse | null;
    updateYtelseIFokus: (ytelse: Ytelse) => void;
}

const MånedGruppeStyle = styled.li`
  > *:first-child {
    background-color: rgba(102, 203, 236, 0.18);
    padding: .2rem ${theme.margin.px10};
  }
  ol {
    padding: 0;
    margin: 0;
  }
  ol > *:not(:first-child) {
    border-top: solid 2px ${theme.color.bakgrunn};
  }
`;

const UtbetalingerArticle = styled.article`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  margin-top: ${theme.margin.layout};
  > *:first-child {
    padding: ${theme.margin.px20};
  }
`;

const UtbetalingerListe = styled.ol`
  padding: 0 ${theme.margin.px10};
  margin: 0;
`;

const Wrapper = styled.div`
  ol {
    list-style: none;
  }
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

interface MånedsgruppeUniqueProps {
    gruppe: ArrayGroup<Utbetaling>;
}

type MånedsgruppeProps = MånedsgruppeUniqueProps & FokusProps;

function Månedsgruppe({gruppe, ...props}: MånedsgruppeProps) {
    const utbetalingsKomponenter = gruppe.array.map(utbetaling => (
        <UtbetalingKomponent
            key={getGjeldendeDatoForUtbetaling(utbetaling) + utbetaling.nettobeløp}
            utbetaling={utbetaling}
            {...props}
        />
    ));
    return (
        <MånedGruppeStyle>
            <Undertekst tag={'h3'}><Bold><Uppercase>{gruppe.category}</Uppercase></Bold></Undertekst>
            <ol>
                {utbetalingsKomponenter}
            </ol>
        </MånedGruppeStyle>
    );
}

function getFiltrerteUtbetalinger(utbetalinger: Utbetaling[], filter: FilterState) {
    return utbetalinger
        .filter(utbetaling => filtrerPaUtbetaltTilValg(utbetaling, filter))
        .filter(utbetaling => filtrerPaYtelseValg(utbetaling, filter));
}

function filtrerPaUtbetaltTilValg(utbetaling: Utbetaling, filter: FilterState) {
    return filter.utbetaltTil.includes(utbetaling.erUtbetaltTilPerson ? utbetaltTilBruker : utbetaling.utbetaltTil);
}

function filtrerPaYtelseValg(utbetaling: Utbetaling, filter: FilterState) {
    const ytelsesTyperIUtbetaling =
        reduceUtbetlingerTilYtelser([utbetaling])
            .map(getTypeFromYtelse);
    return filter.ytelser.some(
        ytelseIFokus => ytelsesTyperIUtbetaling.includes(ytelseIFokus)
    );
}

function addPilknappListener(handleShortcut: (event: KeyboardEvent) => void) {
    return () => window.addEventListener('keydown', handleShortcut);
}

function removePilknappListener(handleShortcut: (event: KeyboardEvent) => void) {
    return () => window.removeEventListener('keydown', handleShortcut);
}

interface UtbetalingerUniqueProps {
    utbetalinger: Utbetaling[];
    filter: FilterState;
    handleShortcut: (event: KeyboardEvent) => void;
}

type UtbetalingerProps = UtbetalingerUniqueProps & FokusProps;

function Utbetalinger({filter, handleShortcut, ...props}: UtbetalingerProps) {
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
            <TotaltUtbetalt utbetalinger={filtrerteUtbetalinger} filter={filter}/>
            <UtbetalingerArticle>
                <Undertittel>Utbetalinger</Undertittel>
                <UtbetalingerListe
                    onFocus={addPilknappListener(handleShortcut)}
                    onBlur={removePilknappListener(handleShortcut)}
                >
                    {månedsGrupper}
                </UtbetalingerListe>
            </UtbetalingerArticle>
        </Wrapper>
    );
}

export default Utbetalinger;
