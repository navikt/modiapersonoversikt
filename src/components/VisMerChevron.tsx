import * as React from 'react';
import styled from 'styled-components';
import NavFrontendChevron from 'nav-frontend-chevron';
import theme from '../styles/personOversiktTheme';

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
    title?: string;
    children?: React.ReactNode;
}

const ChevronKnappStyle = styled.button`
    ${theme.resetButtonStyle};
    padding: 0.1rem;
    border-radius: 0.5em;
`;

function VisMerChevron(props: Props) {
    return (
        <ChevronKnappStyle
            onClick={props.onClick}
            aria-expanded={props.open}
            aria-label={props.title}
            title={props.title}
        >
            <NavFrontendChevron type={props.open ? 'opp' : 'ned'} />
            {props.children}
        </ChevronKnappStyle>
    );
}

export default VisMerChevron;
