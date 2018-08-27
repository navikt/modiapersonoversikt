import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { FilterState } from './Filter';
import TotaltUtbetalt from './TotaltUtbetalt';
import { Bold, Uppercase } from '../../../../components/common-styled-components';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../utils/groupArray';
import { getGjeldendeDatoForUtbetaling, månedOgÅrForUtbetaling, utbetalingDatoComparator } from './utbetalingerUtils';
import UtbetalingKomponent from './Utbetaling';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

export interface UtbetalingerProps {
    utbetalinger: Utbetaling[];
    filter: FilterState;
    onFilterChange: (change: Partial<FilterState>) => void;
}

const MånedGruppeStyle = styled.li`
  > *:first-child {
    background-color: ${theme.color.bakgrunn};
    padding: .2rem 1.2rem;
  }
  > *:nth-child(2) ~ * {
    border-top: solid 2px ${theme.color.bakgrunn};
  }
`;

const UtbetalingerStyle = styled.div`
  > *:first-child {
    padding: 0 1.2rem .2rem;
  }
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

function Månedsgruppe({gruppe}: { gruppe: ArrayGroup<Utbetaling> }) {
    const utbetalingsKomponenter = gruppe.array.map(utbetaling => (
        <UtbetalingKomponent
            utbetaling={utbetaling}
            key={getGjeldendeDatoForUtbetaling(utbetaling) + utbetaling.nettobeløp}
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

function Utbetalinger(props: UtbetalingerProps) {
    if (props.utbetalinger.length === 0) {
        return (
            <AlertStripeInfo>Ingen utbetalinger funnet</AlertStripeInfo>
        );
    }

    const utbetalingerGruppert: GroupedArray<Utbetaling> = groupArray(
        props.utbetalinger.sort(utbetalingDatoComparator),
        månedOgÅrForUtbetaling
    );
    const månedsGrupper = utbetalingerGruppert.map((gruppe: ArrayGroup<Utbetaling>) =>
        <Månedsgruppe gruppe={gruppe} key={gruppe.category}/>
    );

    return (
        <>
            <TotaltUtbetalt utbetalinger={props.utbetalinger} filter={props.filter}/>
            <UtbetalingerStyle>
                <Undertittel>Utbetalinger</Undertittel>
                <ol>
                    {månedsGrupper}
                </ol>
            </UtbetalingerStyle>
        </>
    );
}

export default Utbetalinger;
