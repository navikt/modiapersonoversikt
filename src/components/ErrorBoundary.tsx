import * as React from 'react';

interface Props {}

interface State {
    hasError: boolean;
}

/*
 * Error håndtering for enkelt-widgets.
 * BRUK:
 * <ErrorBoundary>
 *     <Component />
 * </ErrorBoundary>
 *
 * Merk: På grunn av måten vi kjører i test, så fungerer ikke error boundary skikkelig,
 * stack tracen overstyrer selv om komponenten rendres riktig. Dette skal fungere bra i
 * Prod, men er ikke verifisert enda.
 */

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({ hasError: true });
        console.error(info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <b>Beklager, det skjedde en feil ved lasting av dataelementet. Feil er logget.</b>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;