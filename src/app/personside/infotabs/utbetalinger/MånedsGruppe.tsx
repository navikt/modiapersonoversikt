import { Element } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { Uppercase } from '../../../../components/common-styled-components';
import type { Utbetaling } from '../../../../models/utbetalinger';
import theme from '../../../../styles/personOversiktTheme';
import type { ArrayGroup } from '../../../../utils/groupArray';
import { KategoriSkille } from '../../dialogpanel/fellesStyling';
import UtbetalingsKomponent from './utbetaling/Utbetaling';
import { getGjeldendeDatoForUtbetaling } from './utils/utbetalinger-utils';

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
    const utbetalingsKomponenter = gruppe.array.map((utbetaling) => (
        <UtbetalingsKomponent
            key={getGjeldendeDatoForUtbetaling(utbetaling) + utbetaling.nettobelop}
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
