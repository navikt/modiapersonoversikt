import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';

export const AlignTextRight = styled.div`
  text-align: right;
`;

export const AlignTextCenter = styled.div`
  text-align: center;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Uppercase = styled.span`
  text-transform: uppercase;
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const BulletPoint = styled.div<{ showBulletPoint: boolean, color: string }>`
  position: relative;
  transition: .3s;
  ${props => props.showBulletPoint && 'padding-left: 1.5rem;'}
  &::before {
    position: absolute;
    left: -.5rem;
    content: '•';
    font-size: 4rem;
    line-height: 1.8rem;
    color: ${props => props.color};
    transition: .3s;
    ${props => !props.showBulletPoint && 'opacity: 0'}
  }
`;

export const GråttPanel = styled.div`
  ${theme.gråttPanel};
`;

export const LenkeKnapp = styled.button`
  border: none;
  padding: .1rem .2rem;
  border-radius: ${theme.borderRadius.knapp};
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;
  color: ${theme.color.lenke};
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
