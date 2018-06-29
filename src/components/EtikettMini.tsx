import * as React from 'react';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const CustomStyling = styled.span`
  .typo-etikett-liten{
    font-size: 0.7rem;
    line-height: 1rem;
  }
`;

function EtikettMini(props: Props) {
    return (
        <CustomStyling>
            <EtikettLiten>
                {props.children}
            </EtikettLiten>
        </CustomStyling>
    );
}

export default EtikettMini;
