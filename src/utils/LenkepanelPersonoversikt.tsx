import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';

interface Props {
    url: string;
    children: string;
}

const CustomStyling = styled.nav`
    ${theme.hvittPanel};
    font-weight: bold;
    a {
        padding: ${theme.margin.px20};
    }
`;

function LenkepanelPersonoversikt(props: Props) {
    return (
        <CustomStyling>
            <LenkepanelBase
                href={props.url}
                linkCreator={(props: React.HTMLProps<HTMLElement>): ReactNode => (
                    <a target={'_blank'} rel={'noopener noreferrer'} {...props as React.HTMLProps<HTMLAnchorElement>} />
                )}
            >
                {props.children}
            </LenkepanelBase>
        </CustomStyling>
    );
}

export default LenkepanelPersonoversikt;
