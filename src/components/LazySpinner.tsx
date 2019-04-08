import * as React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/personOversiktTheme';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface Props {
    delay?: number;
    type?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
}

interface State {
    showSpinner: boolean;
}

const FadeIn = styled.span`
    ${theme.animation.fadeIn};
`;

class LazySpinner extends React.Component<Props, State> {
    private timer?: number;

    constructor(props: Props) {
        super(props);
        this.state = { showSpinner: false };
        this.timer = window.setTimeout(() => this.setState({ showSpinner: true }), this.props.delay || 300);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        if (this.state.showSpinner) {
            return (
                <FadeIn>
                    <NavFrontendSpinner type={this.props.type || 'L'} />
                </FadeIn>
            );
        }
        return null;
    }
}

export default LazySpinner;
