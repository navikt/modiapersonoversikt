import * as React from 'react';
// import NavFrontendSpinner from 'nav-frontend-spinner';
import OppgaveSkjema from './OppgaveSkjema';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import ErrorBoundary from '../../../../../../../components/ErrorBoundary';
import gsaktemaResource from '../../../../../../../rest/resources/gsakTema';
import { CenteredLazySpinner } from '../../../../../../../components/LazySpinner';

interface Props {
    lukkPanel: () => void;
    onSuccessCallback?: () => void;
    valgtTraad: Traad;
}

function OpprettOppgaveContainer(props: Props) {
    return gsaktemaResource.useRenderer({
        ifPending: <CenteredLazySpinner aria-label="Laster tema" type="L" />,
        ifData: (gsaktema) => (
            <ErrorBoundary boundaryName={'OpprettOppgaveContainer'}>
                <OppgaveSkjema
                    gsakTema={gsaktema}
                    lukkPanel={props.lukkPanel}
                    onSuccessCallback={props.onSuccessCallback}
                    valgtTraad={props.valgtTraad}
                />
            </ErrorBoundary>
        )
    });
}

export default OpprettOppgaveContainer;
