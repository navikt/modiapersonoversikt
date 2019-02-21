import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';

const Wrapper = styled.div`
    ${theme.hvittPanel};
    padding: ${theme.margin.px10} ${theme.margin.px10};
`;

function ArenaLenkerPanel() {
    return (
        <Wrapper>
            <a href={'http://arena'} target={'_blank'} className={'lenke'}>
                <Normaltekst>Personmappen i Arena</Normaltekst>
            </a>
            <a href={'http://arena'} target={'_blank'} className={'lenke'}>
                <Normaltekst>Meldinger/utbetalinger i Arena</Normaltekst>
            </a>
        </Wrapper>
    );
}

export default ArenaLenkerPanel;
