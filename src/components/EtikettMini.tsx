import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import styled from 'styled-components';

interface Props {
     children: React.ReactChildren | React.ReactChild | string | string[];
}

const CustomStyling = styled.span`
  font-size: 0.8em;
`;

function EtikettMini(props: Props) {
    return (
        <EtikettLiten>
            <CustomStyling>
                {props.children}
            </CustomStyling>
        </EtikettLiten>
    );
}

export default EtikettMini;
