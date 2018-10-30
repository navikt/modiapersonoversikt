import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { loggInfo } from '../utils/frontendLogger';

interface Props {
    bounadaryName?: string;
}

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
        const message: string =
            `ErrorBoundary fanget en feil${ this.props.bounadaryName && ' i ' + this.props.bounadaryName}`;
        loggInfo(message, {error: error, reactInfo: info});
        console.error(error, info);
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
