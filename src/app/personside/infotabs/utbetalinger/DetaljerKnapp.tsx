import * as React from 'react';
import styled from 'styled-components';
import { theme } from '../../../../styles/personOversiktTheme';
import NavFrontendChevron from 'nav-frontend-chevron';

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
}

const KnappWrapper = styled.button`
  border: none;
  padding: 0;
  border-radius: 0.5em;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: ${theme.color.hoverLink};
  }
  &:focus {
    ${theme.focus}
  }
`;

function DetaljerKnapp(props: Props) {
    return (
        <KnappWrapper onClick={props.onClick} aria-expanded={props.open} aria-label="Detaljer">
            <NavFrontendChevron type={props.open ? 'opp' : 'ned'}/>
        </KnappWrapper>
    );
}

export default DetaljerKnapp;
