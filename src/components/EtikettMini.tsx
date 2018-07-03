import * as React from 'react';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const FontSize = styled.span`
    font-size: 0.7rem;
`;

const Wrapper = styled.span`
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
