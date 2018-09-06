import * as React from 'react';
import styled from 'styled-components';
import Printer from '../svg/Printer';
import theme from '../styles/personOversiktTheme';

interface Props {
    onClick: (event: React.MouseEvent) => void;
}

const PrintIkonStyle = styled.button`
  border: none;
  background-color: transparent;
  border-radius: ${theme.borderRadius.knapp};
  padding: 0;
  height: 1.2rem;
  width: 1.2rem;
  svg {
    height: 1.2rem;
    width: 1.2rem;
  }
  &:focus {
    ${theme.focus}
  }
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

function PrintKnapp({onClick}: Props) {
    return <PrintIkonStyle onClick={onClick}><Printer/></PrintIkonStyle>;
}

export default PrintKnapp;
