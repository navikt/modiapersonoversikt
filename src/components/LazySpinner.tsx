import * as React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../styles/personOversiktTheme';
import NavFrontendSpinner from 'nav-frontend-spinner';
import FillCenterAndFadeIn from './FillCenterAndFadeIn';

interface Props {
    delay?: number;
    type?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
    padding?: string;
}

interface State {
    showSpinner: boolean;
}

const FadeIn = styled.span<{ padding?: string }>`
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

class LazySpinner extends React.Component<Props, State> {
    private timer?: number;

    constructor(props: Props) {
        super(props);
        this.state = { showSpinner: false };
        this.timer = window.setTimeout(() => this.setState({ showSpinner: true }), this.props.delay || 300);
    }

    componentWillUnmount() {
        window.clearTimeout(this.timer);
    }

    render() {
        if (this.state.showSpinner) {
            return (
                <FadeIn padding={this.props.padding}>
                    <NavFrontendSpinner type={this.props.type || 'L'} />
                </FadeIn>
            );
        }
        return null;
    }
}

export default LazySpinner;
