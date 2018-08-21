import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { FilterState } from './Filter';
import TotaltUtbetalt from './TotaltUtbetalt';
import { AlignTextCenter, Bold, Uppercase } from '../../../../components/common-styled-components';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../utils/groupArray';
import { månedOgÅrForUtbetaling, sortByPosteringsDato } from './utbetalingerUtils';
import EnkeltUtbetaling from './Utbetaling';

export interface UtbetalingerProps {
    utbetalinger: Utbetaling[];
    filter: FilterState;
    onFilterChange: (change: Partial<FilterState>) => void;
}

const ArenaLenkeStyle = styled.div`
  margin: 1.2rem;
  text-align: right;
`;

const MånedGruppeStyle = styled.div`
  > *:first-child {
    background-color: ${theme.color.bakgrunn};
    padding: .2rem 1.2rem;
  }
`;

const UtbetalingerStyle = styled.div`
  > *:first-child {
    padding: 0 1.2rem .2rem;
  }
`;

function ArenaLenke() {
    return (
        <ArenaLenkeStyle>
            <Undertekst>
                Lenke til Arena: <a className="lenke">Meldinger/utbetalinger i Arena</a>
            </Undertekst>
        </ArenaLenkeStyle>
    );
}

function Månedsgruppe({ gruppe }: { gruppe: ArrayGroup<Utbetaling> }) {
    return (
        <MånedGruppeStyle>
            <Undertekst><Bold><Uppercase>{gruppe.category}</Uppercase></Bold></Undertekst>
            {gruppe.array.map((utbetaling, index) =>
                <EnkeltUtbetaling utbetaling={utbetaling} key={index}/>)}
        </MånedGruppeStyle>
    );
}

function Utbetalinger(props: UtbetalingerProps) {
    if (props.utbetalinger.length === 0) {
        return (
            <>
                <ArenaLenke/>
                <AlignTextCenter><Undertekst>Ingen utbetalinger funnet</Undertekst></AlignTextCenter>
            </>
        );
    }

    const utbetalingerGruppert: GroupedArray<Utbetaling> = groupArray(
        props.utbetalinger.sort(sortByPosteringsDato),
        månedOgÅrForUtbetaling
    );

    return (
        <>
            <ArenaLenke/>
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
