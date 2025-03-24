import type * as React from 'react';
import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';

interface StyleProps {
    width?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
}

export const KnappWrapper = styled.button<StyleProps>`
  width: ${(props) => props.width || '10%'};
  height: ${(props) => props.width || '10%'};
  border: none;
  padding: 0;
  border-radius: 0.5em;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: #3e3832;
    svg,
    g {
      stroke: white;
    }
  }
  &:active {
    opacity: 0.8;
  }
  &:focus {
    ${theme.focus}
  }
  svg,
  g {
    stroke: #3e3832;
    stroke-width: 0.4;
    fill: none;
    stroke-linecap: round;
  }
  transition: transform 0.5s;
  transform: rotate(${(props) => getDirection(props.direction)});
`;

function getDirection(direction: string | undefined) {
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
    beskrivelse: string;
}

function PilKnapp(props: Props) {
    return (
        <KnappWrapper
            aria-label={props.beskrivelse}
            title={props.beskrivelse}
            onClick={props.onClick}
            width={props.width}
            direction={props.direction}
        >
            {/*biome-ignore lint/a11y/noSvgWithoutTitle: biome migration*/}
            <svg viewBox="-1 -1 5 5">
                <path d="M0,0 L1,1.5 L0,3" />
                <path d="M2,0 L3,1.5 L2,3" />
            </svg>
        </KnappWrapper>
    );
}

export default PilKnapp;
