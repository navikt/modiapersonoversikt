import styled from 'styled-components';
import { styles } from '../../styles/personOversiktStyles';

export const LayoutWrapper = styled.div`
    width: 100vw;
    flex-grow: 1;
    animation: ${styles.animation.fadeIn};
    display: flex;
    flex-flow: row nowrap;
    > * {
      transition: .3s ease-out;
      overflow-y: scroll;
    }
`;

export const VenstreKolonne = styled<{ dialogPanelEkspandert?: boolean; }, 'section'>('section')`
    width: ${props => props.dialogPanelEkspandert ? '50%' : '70%' };
    padding: ${styles.margin.layout};
    > * {
      margin-bottom: ${styles.margin.layout};
      border-radius: ${styles.borderRadius.layout};
    }
`;

export const HøyreKolonne = styled<{ dialogPanelEkspandert?: boolean; }, 'section'>('section')`
    width: ${props => props.dialogPanelEkspandert ? '50%' : '30%' };
    background-color: #d8d8d8;
    display: flex;
    flex-flow: column nowrap;
    > * {
        padding: ${styles.margin.layout};
        flex-shrink: 0;
    }
`;
