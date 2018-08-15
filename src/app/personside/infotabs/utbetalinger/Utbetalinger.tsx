import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import styled from 'styled-components';
import TittelOgIkon from '../../visittkort/body/IkonOgTittel';
import Coins from '../../../../svg/Coins';
import theme from '../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import { restoreScroll } from '../../../../utils/restoreScroll';
import { FilterState, default as Filtrering } from './Filter';

export interface UtbetalingerProps {
    utbetalinger: Utbetaling[];
    filter: FilterState;
    onFilterChange: (change: Partial<FilterState>) => void;
}

const Wrapper = styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: ${theme.margin.layout};
  }
`;

const Venstre = styled.div`
  > *:first-child {
    margin-left: 50px;
  }  
  flex-basis: 16em;
  flex-shrink: 1;
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  padding: 1.5em;
`;

const Hoyre = styled.div`
  flex-grow: 1;
  > * {
    background-color: white;
    border-radius: ${theme.borderRadius.layout};
    padding: 1em;
  }
`;

const Opacity = styled.span`
  opacity: .5;
`;

function Utbetalinger(props: UtbetalingerProps) {
    return (
        <Wrapper>
            <Venstre onClick={restoreScroll}>
                <TittelOgIkon tittel={<Undertittel>Utbetalinger</Undertittel>} ikon={<Opacity><Coins/></Opacity>}/>
                <Filtrering filterState={props.filter} onChange={props.onFilterChange}/>
            </Venstre>
            <Hoyre>
                <div>Hei</div>
            </Hoyre>
        </Wrapper>
    );
}

export default Utbetalinger;
