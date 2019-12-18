import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import theme, { pxToRem } from '../styles/personOversiktTheme';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';

interface Props {
    url: string;
    children: string;
    className?: string;
}

const CustomStyling = styled.nav`
    ${theme.hvittPanel};
    font-weight: 600;
    a {
        padding: ${pxToRem(15)};
    }
    .lenkepanel {
        margin-bottom: 0;
    }
`;

function LenkepanelPersonoversikt(props: Props) {
    return (
        <CustomStyling className={props.className}>
            <LenkepanelBase
                href={props.url}
                linkCreator={(props: React.HTMLProps<HTMLElement>): ReactNode => (
                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                    <a
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        {...(props as React.HTMLProps<HTMLAnchorElement>)}
                    />
                )}
            >
                {props.children}
            </LenkepanelBase>
        </CustomStyling>
    );
}

export default LenkepanelPersonoversikt;
