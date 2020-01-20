import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { theme } from '../styles/personOversiktTheme';
import NavFrontendSpinner from 'nav-frontend-spinner';
import FillCenterAndFadeIn from './FillCenterAndFadeIn';
import DelayRender from './DelayRender';

interface Props {
    delay?: number;
    type?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
    padding?: string;
    className?: string;
}

const Styling = styled.span<{ padding?: string }>`
    overflow: hidden;
    display: flex;
    justify-content: center;
    ${theme.animation.fadeIn};
    ${props =>
        props.padding
            ? css`
                  padding: ${props.padding};
              `
            : ''};
`;

export function CenteredLazySpinner(props: Props) {
    return (
        <FillCenterAndFadeIn>
            <LazySpinner {...props} />
        </FillCenterAndFadeIn>
    );
}

function LazySpinner(props: Props) {
    return (
        <DelayRender delay={props.delay || 300}>
            <Styling padding={props.padding} className={props.className}>
                <NavFrontendSpinner type={props.type || 'L'} />
            </Styling>
        </DelayRender>
    );
}

export default LazySpinner;
