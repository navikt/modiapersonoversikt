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
    ${props =>
        props.dialogPanelEkspandert
            ? css`
                  flex: 70% 1 1;
              `
            : css`
                  flex: 90% 1 1;
              `};
    padding: ${theme.margin.layout};
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    > * {
        border-radius: ${theme.borderRadius.layout};
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
                      content: 'Dialogpanel';
                      writing-mode: vertical-rl;
                      text-transform: uppercase;
                      text-align: center;
                      margin: auto;
                  }
              `};
    background-color: ${theme.color.dialogpanelBakgrunn};
    overflow-y: auto;
    box-shadow: 0 0 1rem 0 ${theme.color.bakgrunn};
    z-index: 1;
    display: flex;
    flex-flow: column nowrap;
    > * {
        ${theme.animation.fadeIn};
        flex-shrink: 0;
        border-top: ${theme.border.skilleSvak};
    }
`;
