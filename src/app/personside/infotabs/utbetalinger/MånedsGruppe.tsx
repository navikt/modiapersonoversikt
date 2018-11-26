import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { ArrayGroup } from '../../../../utils/groupArray';
import { Normaltekst } from 'nav-frontend-typografi';
import { Bold, Uppercase } from '../../../../components/common-styled-components';
import { getGjeldendeDatoForUtbetaling } from './utils/utbetalingerUtils';
import UtbetalingsKomponent from './utbetaling/Utbetaling';
import { Utbetaling } from '../../../../models/utbetalinger';

interface Props {
    gruppe: ArrayGroup<Utbetaling>;
}

const Wrapper = styled.li`
  > *:first-child {
    background-color: ${theme.color.kategori};
    padding: .2rem ${theme.margin.px20};
  }
  ol {
    padding: 0;
    margin: 0;
  }
  ol > *:not(:first-child) {
    border-top: ${theme.border.skille};
  }
`;

function Månedsgruppe({gruppe}: Props) {
    const utbetalingsKomponenter = gruppe.array.map(utbetaling => (
        <UtbetalingsKomponent
            key={getGjeldendeDatoForUtbetaling(utbetaling) + utbetaling.nettobeløp}
            utbetaling={utbetaling}
        />
    ));
    return (
        <Wrapper>
            <Normaltekst tag={'h3'}><Bold><Uppercase>{gruppe.category}</Uppercase></Bold></Normaltekst>
            <ol>
                {utbetalingsKomponenter}
            </ol>
        </Wrapper>
    );
}

export default Månedsgruppe;
