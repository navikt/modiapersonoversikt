import * as React from 'react';
import RestResourceConsumer from '../../../../../../../rest/consumer/RestResourceConsumer';
import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import OppgaveSkjemaContainer from './OppgaveSkjemaContainer';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import NavFrontendSpinner from 'nav-frontend-spinner';
import ErrorBoundary from '../../../../../../../components/ErrorBoundary';

interface Props {
    lukkPanel: () => void;
    onSuccessCallback?: () => void;
    valgtTraad: Traad;
}

function OpprettOppgaveContainer(props: Props) {
    return (
        <ErrorBoundary boundaryName={'OpprettOppgaveContainer'}>
            <RestResourceConsumer<GsakTema[]>
                getResource={restResources => restResources.oppgaveGsakTema}
                returnOnPending={<NavFrontendSpinner aria-label={'Laster tema'} type={'S'} />}
            >
                {data => (
                    <OppgaveSkjemaContainer
                        gsakTema={data}
                        lukkPanel={props.lukkPanel}
                        onSuccessCallback={props.onSuccessCallback}
                        valgtTraad={props.valgtTraad}
                    />
                )}
            </RestResourceConsumer>
        </ErrorBoundary>
    );
}

export default OpprettOppgaveContainer;
