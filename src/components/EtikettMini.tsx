import * as React from 'react';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const FontSize = styled.span`
    // Må sette font-size hardt her for at det skal funke i gamlemodia
    font-size: 11px;
`;

const Wrapper = styled.div`
    margin-top: 3px;
    .typo-etikett-liten {
      line-height: 1rem;
    }
`;

function EtikettMini(props: Props) {
    return (
        <Wrapper>
            <EtikettLiten>
                <FontSize>
                    {props.children}
                </FontSize>
            </EtikettLiten>
        </Wrapper>
    );
}

export default EtikettMini;
