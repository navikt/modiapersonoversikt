import * as React from 'react';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const Wrapper = styled.div`
    color: #78706a;
    margin-top: 3px;
    .typo-etikett-liten {
      line-height: 1rem;
    }
`;

function EtikettGrå(props: Props) {
    return (
        <Wrapper>
            <EtikettLiten>
                    {props.children}
            </EtikettLiten>
        </Wrapper>
    );
}

export default EtikettGrå;
