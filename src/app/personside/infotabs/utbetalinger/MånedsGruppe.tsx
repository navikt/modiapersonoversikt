import * as React from 'react';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import { ArrayGroup } from '../../../../utils/groupArray';
import { Element } from 'nav-frontend-typografi';
import { Uppercase } from '../../../../components/common-styled-components';
import { getGjeldendeDatoForUtbetaling } from './utils/utbetalingerUtils';
import UtbetalingsKomponent from './utbetaling/Utbetaling';
import { Utbetaling } from '../../../../models/utbetalinger';
import { KategoriSkille } from '../../dialogpanel/fellesStyling';

interface Props {
    gruppe: ArrayGroup<Utbetaling>;
}

const Wrapper = styled.li`
    ol {
        padding: 0;
        margin: 0;
    }
    ol > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

function Månedsgruppe({ gruppe }: Props) {
    const utbetalingsKomponenter = gruppe.array.map(utbetaling => (
        <UtbetalingsKomponent
            key={getGjeldendeDatoForUtbetaling(utbetaling) + utbetaling.nettobeløp}
            utbetaling={utbetaling}
        />
    ));
    return (
        <Wrapper>
            <KategoriSkille>
                <Element tag={'h3'}>
                    <Uppercase>{gruppe.category}</Uppercase>
                </Element>
            </KategoriSkille>
            <ol aria-label={`Utbetalinger fra ${gruppe.category}`}>{utbetalingsKomponenter}</ol>
        </Wrapper>
    );
}

export default Månedsgruppe;
