import type { TypografiProps } from 'nav-frontend-typografi';
import { Undertekst } from 'nav-frontend-typografi';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';

interface Props extends TypografiProps {
    children: ReactNode;
}

const Wrapper = styled.div`
    color: ${theme.color.graaSkrift};
    margin-top: 3px;
    .typo-etikett-liten {
        line-height: 1rem;
    }
`;

function EtikettGraa(props: Props) {
    const { children, ...resten } = props;
    return (
        <Wrapper>
            <Undertekst {...resten}>{children}</Undertekst>
        </Wrapper>
    );
}

export default EtikettGraa;
