import styled from 'styled-components/macro';
import theme from '../styles/personOversiktTheme';

export const SpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const FlexEnd = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const Uppercase = styled.span`
    text-transform: uppercase;
`;

export const Bold = styled.span`
    font-weight: 600;
`;

export const BulletPoint = styled.div<{ showBulletPoint: boolean; color: string }>`
    position: relative;
    transition: 0.3s;
    ${(props) => props.showBulletPoint && 'padding-left: 1.5rem;'}
    &::before {
        position: absolute;
        left: -0.5rem;
        content: '•';
        font-size: 4rem;
        line-height: 1.8rem;
        color: ${(props) => props.color};
        transition: 0.3s;
        ${(props) => !props.showBulletPoint && 'opacity: 0'}
    }
`;

export const LenkeKnapp = styled.button<{ underline?: boolean }>`
    position: relative;
    border: none;
    padding: 0;
    border-radius: ${theme.borderRadius.knapp};
    cursor: pointer;
    background-color: transparent;
    display: flex;
    align-items: center;
    color: ${theme.color.lenke};
    &:after {
        border-bottom: 1px #b7b1a9 solid;
        ${(props) => props.underline && `content: ''`};
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    &:focus {
        ${theme.focus}
    }
    &:hover {
        opacity: 0.8;
        &:after {
            content: '';
            border-color: #0067c5;
        }
    }
`;

export const TilbakePil = styled.span`
    &:before {
        content: '<';
        padding-right: 0.3rem;
        text-decoration: none !important;
    }
`;
