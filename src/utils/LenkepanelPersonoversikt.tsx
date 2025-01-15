import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import Panel from 'nav-frontend-paneler';
import type * as React from 'react';
import styled from 'styled-components';
import { pxToRem } from '../styles/personOversiktTheme';

interface Props {
    url: string;
    children: string;
    className?: string;
    linkCreator?: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => React.ReactNode;
}

const CustomStyling = styled(Panel)`
  padding: 0rem;
  font-weight: 600;
  a {
    padding: ${pxToRem(15)};
  }
  a:visited {
    color: currentColor !important;
  }
  .lenkepanel {
    margin-bottom: 0;
  }
`;

const defaultLinkCreator = (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a target="_blank" rel="noopener noreferrer" {...props} />
);

function LenkepanelPersonoversikt({ className, url, linkCreator = defaultLinkCreator, children }: Props) {
    return (
        <CustomStyling className={className}>
            <LenkepanelBase href={url} linkCreator={linkCreator}>
                {children}
            </LenkepanelBase>
        </CustomStyling>
    );
}

export default LenkepanelPersonoversikt;
