import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { FilterState } from './Filter';
import TotaltUtbetalt from './TotaltUtbetalt';
import { AlignTextCenter, Bold, Uppercase } from '../../../../components/common-styled-components';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../utils/groupArray';
import { månedOgÅrForUtbetaling, utbetalingDatoComparator } from './utbetalingerUtils';
import EnkeltUtbetaling from './Utbetaling';

export interface UtbetalingerProps {
    utbetalinger: Utbetaling[];
    filter: FilterState;
    onFilterChange: (change: Partial<FilterState>) => void;
}

const MånedGruppeStyle = styled.div`
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
`;

function Månedsgruppe({ gruppe }: { gruppe: ArrayGroup<Utbetaling> }) {
    return (
        <MånedGruppeStyle>
            <Undertekst tag={'h3'}><Bold><Uppercase>{gruppe.category}</Uppercase></Bold></Undertekst>
            {gruppe.array.map((utbetaling, index) =>
                <EnkeltUtbetaling utbetaling={utbetaling} key={index}/>)}
        </MånedGruppeStyle>
    );
}

function Utbetalinger(props: UtbetalingerProps) {
    if (props.utbetalinger.length === 0) {
        return (
            <>
                <AlignTextCenter><Undertekst>Ingen utbetalinger funnet</Undertekst></AlignTextCenter>
            </>
        );
    }

    const utbetalingerGruppert: GroupedArray<Utbetaling> = groupArray(
        props.utbetalinger.sort(utbetalingDatoComparator),
        månedOgÅrForUtbetaling
    );

    return (
        <>
            <TotaltUtbetalt utbetalinger={props.utbetalinger} filter={props.filter}/>
            <UtbetalingerStyle>
                <Undertittel>Utbetalinger</Undertittel>
                {utbetalingerGruppert.map((gruppe: ArrayGroup<Utbetaling>) =>
                    <Månedsgruppe gruppe={gruppe} key={gruppe.category}/>
                )}
            </UtbetalingerStyle>
        </>
    );
}

export default Utbetalinger;
