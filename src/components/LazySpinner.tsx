import * as React from 'react';
import FillCenterAndFadeIn from './FillCenterAndFadeIn';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Timer = NodeJS.Timer;

interface Props {
    delay?: number;
}

interface State {
    showSpinner: boolean;
}

class LazySpinner extends React.Component<Props, State> {

    private timer: Timer;

    constructor(props: Props) {
        super(props);
        this.state = { showSpinner: false };
        this.timer = setTimeout(
            () => this.setState({showSpinner: true}),
            this.props.delay || 300);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        if (this.state.showSpinner) {
            return (
                <FillCenterAndFadeIn>
                    <NavFrontendSpinner type="XL"/>
                </FillCenterAndFadeIn>
            );
        }
        return null;
    }
}

export default LazySpinner;
