import { Normaltekst } from 'nav-frontend-typografi';
import type * as React from 'react';
import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';
import PrinterSVG from '../svg/PrinterSVG';

interface Props {
    onClick: (event: React.MouseEvent) => void;
    tittel?: string;
}

const PrintIkonStyle = styled.button`
    border: none;
    background-color: transparent;
    padding: 0.1rem 0.2rem;
    border-radius: ${theme.borderRadius.knapp};
    cursor: pointer;
    display: flex;
    color: ${theme.color.lenke};
    svg {
        margin-left: 0.5rem;
        height: 1.2rem;
        width: 1.2rem;
    }
    &:focus {
        ${theme.focus}
    }
    &:hover {
        opacity: 0.8;
        text-decoration: underline;
    }
    @media print {
        display: none;
    }
`;

function PrintKnapp({ onClick, tittel }: Props) {
    return (
        <PrintIkonStyle onClick={onClick} aria-label="Skriv ut">
            <Normaltekst tag="span">{tittel ? tittel : 'Skriv ut'}</Normaltekst> <PrinterSVG />
        </PrintIkonStyle>
    );
}

export default PrintKnapp;
