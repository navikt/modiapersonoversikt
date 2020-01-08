import * as React from 'react';
import styled, { css } from 'styled-components/macro';
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

const Styling = styled.span<{ padding?: string }>`
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
                <Styling padding={this.props.padding}>
                    <NavFrontendSpinner type={this.props.type || 'L'} />
                </Styling>
            );
        }
        return null;
    }
}

export default LazySpinner;
