import styled from 'styled-components';
import { theme } from '../../styles/personOversiktTheme';

export const LayoutWrapper = styled.div`
    width: 100vw;
    flex-grow: 1;
    ${theme.animation.fadeIn};
    display: flex;
    flex-flow: row nowrap;
    > * {
        transition: width 0.3s ease-out;
        overflow-y: scroll;
        @media print {
            overflow-y: auto;
        }
    }
`;

interface StyleProps {
    dialogPanelEkspandert?: boolean;
}
export const VenstreKolonne = styled.section<StyleProps>`
    width: ${props => (props.dialogPanelEkspandert ? '50%' : '70%')};
    padding: ${theme.margin.layout};
    display: flex;
    flex-direction: column;
    > * {
        border-radius: ${theme.borderRadius.layout};
    }
`;

export const HøyreKolonne = styled.section<StyleProps>`
    width: ${props => (props.dialogPanelEkspandert ? '50%' : '30%')};
    background-color: white;
    box-shadow: 0 0 1rem 0 ${theme.color.bakgrunn};
    z-index: 1;
    display: flex;
    flex-flow: column nowrap;
    > * {
        padding: ${theme.margin.layout};
        flex-shrink: 0;
    }
`;
