import * as React from 'react';
import styled from 'styled-components';
import Printer from '../svg/Printer';
import theme from '../styles/personOversiktTheme';

interface Props {
    onClick: (event: React.MouseEvent) => void;
}

const PrintIkonStyle = styled.button`
  border: none;
  svg {
    height: 20px;
    width: 20px;
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
