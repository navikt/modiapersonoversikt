import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import NavFrontendChevron from 'nav-frontend-chevron';
import theme from '../styles/personOversiktTheme';

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
    title?: string;
    children?: React.ReactNode;
    focusOnRelativeParent?: boolean;
}

const ChevronKnappStyle = styled.button<{ focusOnRelativeParent?: boolean }>`
    ${theme.resetButtonStyle};
    padding: 0.1rem;
    border-radius: 0.5em;
    ${props =>
        props.focusOnRelativeParent &&
        css`
            &:focus {
                ${theme.focusOnRelativeParent};
            }
        `}
`;

function VisMerChevron(props: Props) {
    return (
        <ChevronKnappStyle
            onClick={props.onClick}
            aria-expanded={props.open}
            aria-label={props.title}
            title={props.title}
            focusOnRelativeParent={props.focusOnRelativeParent}
        >
            <NavFrontendChevron type={props.open ? 'opp' : 'ned'} />
            {props.children}
        </ChevronKnappStyle>
    );
}

export default VisMerChevron;
