import * as React from 'react';
import Timer = NodeJS.Timer;

interface Props {
    beskjed: string;
    dontShowOnFirstRender?: boolean;
}

interface State {
    render: boolean;
}

class AriaNotification extends React.Component<Props, State> {

    private timeOut: Timer;

    constructor(props: Props) {
        super(props);
        this.state = {
            render: this.props.dontShowOnFirstRender !== undefined ? !this.props.dontShowOnFirstRender : true
        };
        this.setTimeout();
    }

    componentWillUpdate(prevProps: Props) {
        if (prevProps.beskjed !== this.props.beskjed) {
            this.setState({render: true});
            this.setTimeout();
        }
    }

    setTimeout () {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            () => this.setState({render: false}),
            15000
        );
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
