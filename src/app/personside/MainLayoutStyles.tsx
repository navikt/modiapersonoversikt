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
    > * {
      margin-bottom: ${theme.margin.layout};
      border-radius: ${theme.borderRadius.layout};
    }
`;

export const HøyreKolonne = styled<{ dialogPanelEkspandert?: boolean; }, 'section'>('section')`
    width: ${props => props.dialogPanelEkspandert ? '50%' : '30%' };
    background-color: #d8d8d8;
    display: flex;
    flex-flow: column nowrap;
    > * {
        padding: ${theme.margin.layout};
        flex-shrink: 0;
    }
`;
