import * as React from 'react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    duration?: number;
}

interface State {
    show: boolean;
}

class ShowThenHide extends React.PureComponent<Props, State> {

    private timeOut?: number;

    constructor(props: Props) {
        super(props);
        this.state = {show: false};
        this.show();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps !== this.props) {
            this.show();
        }
    }

    show() {
        setTimeout(
            () => {
                this.setState({show: true});
                this.setHideTimeout();
            },
            200
        );
    }

    setHideTimeout() {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = window.setTimeout(
            () => this.setState({show: false}),
            this.props.duration || 5000
        );
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    render() {
        if (this.state.show) {
            return <div aria-live="polite">{this.props.children}</div>;
        }
        return null;
    }
}

export default ShowThenHide;
