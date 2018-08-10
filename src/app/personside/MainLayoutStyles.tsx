import styled from 'styled-components';

export const LayoutWrapper = styled.div`
    width: 100vw;
    flex-grow: 1;
    animation: ${props => props.theme.animation.fadeIn};
    display: flex;
    flex-flow: row nowrap;
    > * {
      transition: .3s ease-out;
      overflow-y: scroll;
    }
`;

export const VenstreKolonne = styled<{ dialogPanelEkspandert?: boolean; }, 'section'>('section')`
    width: ${props => props.dialogPanelEkspandert ? '50%' : '70%' };
    padding: ${props => props.theme.margin.layout};
    > * {
      margin-bottom: ${props => props.theme.margin.layout};
      border-radius: ${props => props.theme.borderRadius.layout};
    }
`;

export const HøyreKolonne = styled<{ dialogPanelEkspandert?: boolean; }, 'section'>('section')`
    width: ${props => props.dialogPanelEkspandert ? '50%' : '30%' };
    background-color: #d8d8d8;
    display: flex;
    flex-flow: column nowrap;
    > * {
        padding: ${props => props.theme.margin.layout};
        flex-shrink: 0;
    }
`;
