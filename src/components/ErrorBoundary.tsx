import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { FaroErrorBoundary } from '@grafana/faro-react';

/*
 * Error håndtering for enkelt-widgets.
 * BRUK:
 * <ErrorBoundary>
 *     <Component />
 * </ErrorBoundary>
 *
 */
const ErrorBoundary = ({ children, boundaryName }: React.PropsWithChildren<{ boundaryName: string }>) => {
    return (
        <FaroErrorBoundary
            beforeCapture={() => {
                if (!window.faro) {
                    window.faro = {
                        // @ts-expect-error Vi overskriver faro siden error boundarien ikke tar
                        // hensyn til at faro ikke er tilgjengelig
                        api: {
                            pushError: () => {
                                console.warn('Not pushing error to grafana. Faro is not initialized.');
                            }
                        }
                    };
                }
            }}
            fallback={<AlertStripe type={'advarsel'}>Beklager, det skjedde en feil. ({boundaryName})</AlertStripe>}
        >
            {children}
        </FaroErrorBoundary>
    );
};
export default ErrorBoundary;
