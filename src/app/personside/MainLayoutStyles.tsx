import styled, { css } from 'styled-components';
import { theme } from '../../styles/personOversiktTheme';

export const LayoutWrapper = styled.div`
    width: 100vw;
    flex-grow: 1;
    ${theme.animation.fadeIn};
    display: flex;
    flex-flow: row nowrap;
    > * {
        transition: flex 0.3s ease-out;
        @media print {
            overflow-y: auto;
        }
    }
`;

interface StyleProps {
    dialogPanelEkspandert?: boolean;
}
export const VenstreKolonne = styled.section<StyleProps>`
    flex-basis: ${props => (props.dialogPanelEkspandert ? '70%' : '90%')};
    flex-grow: 1;
    flex-shrink: 1;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: minmax(20%, max-content) auto minmax(0, 1fr);
    grid-template-rows: auto auto minmax(0, 1fr);
    }
    > *:nth-child(1) {
        -ms-grid-row: 1;
    }
    > *:nth-child(2) {
        -ms-grid-row: 2;
    }
    > *:nth-child(3) {
        -ms-grid-row: 3;
    }
`;

export const HøyreKolonne = styled.section<StyleProps>`
    ${props =>
        props.dialogPanelEkspandert
            ? css`
                  flex: 30% 1 1;
              `
            : css`
                  justify-content: flex-end;
                  > *:not(:last-child) {
                      display: none;
                  }
                  &:before {
                      content: 'Oppgavepanel';
                      writing-mode: vertical-rl;
                      text-transform: uppercase;
                      text-align: center;
                      margin: auto;
                  }
              `};
    background-color: ${theme.color.navLysGra};
    overflow-y: auto;
    z-index: 1;
    display: flex;
    flex-flow: column nowrap;
    border-left: ${theme.border.skille};
    > * {
        ${theme.animation.fadeIn};
        flex-shrink: 0;
        border-top: ${theme.border.skilleSvak};
    }
`;
