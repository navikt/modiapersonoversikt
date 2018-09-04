import * as React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Timer = NodeJS.Timer;

interface Props {
    delay?: number;
    type?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
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
                <NavFrontendSpinner type={this.props.type || 'XL'}/>
            );
        }
        return null;
    }
}

export default LazySpinner;
