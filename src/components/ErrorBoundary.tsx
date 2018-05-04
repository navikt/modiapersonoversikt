import * as React from 'react';

interface Props {}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({ hasError: true });
        console.log(info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <b>Fail</b>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;