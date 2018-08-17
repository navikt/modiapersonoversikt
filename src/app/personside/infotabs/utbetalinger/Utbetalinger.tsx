import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import styled from 'styled-components';
import TittelOgIkon from '../../visittkort/body/IkonOgTittel';
import Coins from '../../../../svg/Coins';
import theme from '../../../../styles/personOversiktTheme';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { restoreScroll } from '../../../../utils/restoreScroll';
import { FilterState, default as Filtrering } from './Filter';
import TotaltUtbetalt from './TotaltUtbetalt';
import { AlignTextCenter } from '../../../../components/common-styled-components';
import UtbetalingerListe from './UtbetalingerListe';

export interface UtbetalingerProps {
    utbetalinger: Utbetaling[];
    filter: FilterState;
    onFilterChange: (change: Partial<FilterState>) => void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
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
  padding: 1.2rem;
`;

const Hoyre = styled.div`
  flex-grow: 1;
  border-radius: ${theme.borderRadius.layout};
  background-color: white;
`;

const Opacity = styled.span`
  opacity: .5;
`;

const ArenaLenkeStyle = styled.div`
  margin: 1.2rem;
  text-align: right;
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

function Utbetalinger(props: UtbetalingerProps) {
    if (props.utbetalinger.length === 0) {
        return (
            <>
                <ArenaLenke/>
                <AlignTextCenter><Undertekst>Ingen utbetalinger funnet</Undertekst></AlignTextCenter>
            </>
        );
    }

    return (
        <Wrapper>
            <Venstre onClick={restoreScroll}>
                <TittelOgIkon tittel={<Undertittel>Utbetalinger</Undertittel>} ikon={<Opacity><Coins/></Opacity>}/>
                <Filtrering filterState={props.filter} onChange={props.onFilterChange}/>
            </Venstre>
            <Hoyre>
                <ArenaLenke/>
                <TotaltUtbetalt utbetalinger={props.utbetalinger} filter={props.filter}/>
                <UtbetalingerListe utbetalinger={props.utbetalinger}/>
            </Hoyre>
        </Wrapper>
    );
}

export default Utbetalinger;
