import * as React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/personOversiktTheme';
import NavFrontendChevron from 'nav-frontend-chevron';

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
    children?: React.ReactNode;
}

const ChevronWrapper = styled.button`
  border: none;
  padding: .1rem;
  border-radius: 0.5em;
  cursor: pointer;
  background-color: transparent;
  &:focus {
    ${theme.focus}
  }
`;

function VisMerChevron(props: Props) {
    return (
        <ChevronWrapper onClick={props.onClick} aria-expanded={props.open} aria-label="Detaljer">
            <NavFrontendChevron type={props.open ? 'opp' : 'ned'}/>
            {props.children}
        </ChevronWrapper>
    );
}

export default VisMerChevron;
