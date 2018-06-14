import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';

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

class ErrorBoundary extends React.Component<{}, State> {
    constructor(props: {}) {
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
                <AlertStripe type={'advarsel'}>Beklager, det skjedde en feil.</AlertStripe>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;