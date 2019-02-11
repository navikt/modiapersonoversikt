import * as React from 'react';

interface Props {
    beskjed: string;
    dontShowOnFirstRender?: boolean;
}

interface State {
    render: boolean;
}

class AriaNotification extends React.Component<Props, State> {

    private timeOut?: number;

    constructor(props: Props) {
        super(props);
        this.state = {render: false};
    }

    componentDidMount() {
        if (this.props.dontShowOnFirstRender === undefined || !this.props.dontShowOnFirstRender) {
            this.notify();
        }
    }

    componentWillUpdate(prevProps: Props) {
        if (prevProps.beskjed !== this.props.beskjed) {
            this.notify();
        }
    }

    notify() {
        this.setState({render: true});
        this.setTimeout();
    }

    setTimeout () {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = window.setTimeout(
            () => this.setState({render: false}),
            15000
        );
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    render() {
        if (!this.state.render) {
            return null;
        }
        return (
            <div className="visually-hidden" role="alert" aria-live="polite">
                {this.props.beskjed}
            </div>
        );
    }
}

export default AriaNotification;
