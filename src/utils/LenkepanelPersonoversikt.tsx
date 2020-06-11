import * as React from 'react';
import styled from 'styled-components/macro';
import { pxToRem } from '../styles/personOversiktTheme';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import Panel from 'nav-frontend-paneler';

interface Props {
    url: string;
    children: string;
    className?: string;
    linkCreator?: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => React.ReactNode;
}

const CustomStyling = styled(Panel)`
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

function LenkepanelPersonoversikt(props: Props) {
    return (
        <CustomStyling className={props.className}>
            <LenkepanelBase href={props.url} linkCreator={props.linkCreator}>
                {props.children}
            </LenkepanelBase>
        </CustomStyling>
    );
}

(LenkepanelPersonoversikt as React.FunctionComponent).defaultProps = {
    linkCreator: (props: React.HTMLProps<HTMLAnchorElement>) => (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a target="_blank" rel="noopener noreferrer" {...props} />
    )
};

export default LenkepanelPersonoversikt;
