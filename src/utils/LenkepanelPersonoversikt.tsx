import * as React from 'react';
import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';

interface Props {
    url: string;
    children: string;
}

const CustomStyling = styled.nav`
  font-weight: bold;
  a {
    padding: ${theme.margin.px20};
  }
`;

function LenkepanelPersonoversikt(props: Props) {
    return (
        <CustomStyling>
            <LenkepanelBase href={props.url}>
                {props.children}
            </LenkepanelBase>
        </CustomStyling>
    );
}

export default LenkepanelPersonoversikt;
