import styled from 'styled-components';
import { theme } from '../../styles/personOversiktTheme';

export const LayoutWrapper = styled.div`
    width: 100vw;
    flex-grow: 1;
    animation: ${theme.animation.fadeIn};
    display: flex;
    flex-flow: row nowrap;
    > * {
      transition: width .3s ease-out;
      overflow-y: scroll;
      @media print {
        overflow-y: auto;
      }
    }
`;

export const VenstreKolonne = styled<{ dialogPanelEkspandert?: boolean; }, 'section'>('section')`
    width: ${props => props.dialogPanelEkspandert ? '50%' : '70%' };
    padding: ${theme.margin.layout};
    display: flex;
    flex-direction: column;
    > * {
      margin-bottom: ${theme.margin.layout};
      border-radius: ${theme.borderRadius.layout};
    }
`;

export const HøyreKolonne = styled<{ dialogPanelEkspandert?: boolean; }, 'section'>('section')`
    width: ${props => props.dialogPanelEkspandert ? '50%' : '30%' };
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
