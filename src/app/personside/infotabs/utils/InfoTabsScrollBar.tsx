import styled, { css } from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import React, { ReactNode, useRef } from 'react';
import useKeepScroll from '../../../../utils/hooks/useKeepScroll';

export const scrollBarContainerStyle = (minWidth: string) => css`
    @media (min-width: ${minWidth}) {
        max-height: 100%;
        max-width: 100%;
    }
`;

export const ScrollBarStyle = styled.div`
    overflow: auto;
    max-height: 100%;
    padding: ${theme.margin.layout};
`;

interface ScrollBarProps {
    children: ReactNode;
    className?: string;
    keepScrollId: string;
}

export function ScrollBar(props: ScrollBarProps) {
    const ref = useRef<HTMLDivElement>(null);
    const storeScroll = useKeepScroll(ref, props.keepScrollId);

    return (
        <ScrollBarStyle onScroll={storeScroll} ref={ref} className={props.className}>
            {props.children}
        </ScrollBarStyle>
    );
}
