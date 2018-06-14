import * as React from 'react';
import styled from 'styled-components';

interface StyleProps {
    width?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
}

const KnappWrapper = styled<StyleProps, 'button'>('button')`
  width:  ${props => props.width || '10%'};
  height:  ${props => props.width || '10%'};
  border: 0.2em solid ${props => props.theme.color.lenke};
  padding: 0;
  border-radius: 0.5em;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: ${props => props.theme.color.lenke};
    svg{
      stroke: white;
    }
  }
  &:active {
    opacity: 0.8;
  }
  &:focus {
    ${props => props.theme.focus}
  }
  svg {
    stroke: ${props => props.theme.color.lenke};
    stroke-width: 0.7;
    fill: none
  }
  transition: transform 0.3s;
  transform: rotate(${props => getDirection(props.direction)});
`;

function getDirection(direction: String | undefined) {
    if (!direction) {
        return '0';
    }
    if (direction === 'left') {
        return '180deg';
    }
    if (direction === 'up') {
        return '-90deg';
    }
    if (direction === 'down') {
        return '90deg';
    }
    return 0;
}

interface Props extends StyleProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function PilKnapp(props: Props) {
    return (
        <KnappWrapper onClick={props.onClick} width={props.width} direction={props.direction}>
            <svg viewBox="-1 -1 5 5">
                <path d="M0,0 L1,1.5 L0,3"/>
                <path d="M2,0 L3,1.5 L2,3"/>
            </svg>
        </KnappWrapper>
    );
}

export default PilKnapp;
