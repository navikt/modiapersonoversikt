import * as React from 'react';
import OppgaveSkjemaContainer from './OppgaveSkjemaContainer';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import NavFrontendSpinner from 'nav-frontend-spinner';
import ErrorBoundary from '../../../../../../../components/ErrorBoundary';
import { useRestResource } from '../../../../../../../rest/consumer/useRestResource';

interface Props {
    lukkPanel: () => void;
    onSuccessCallback?: () => void;
    valgtTraad: Traad;
}

function OpprettOppgaveContainer(props: Props) {
    const oppgaveRestResources = useRestResource(resources => resources.oppgaveGsakTema);

    if (oppgaveRestResources.isLoading) return <NavFrontendSpinner aria-label={'Laster tema'} type={'S'} />;

    if (!oppgaveRestResources.data) {
        return oppgaveRestResources.placeholder;
    }
    const gsakTema = oppgaveRestResources.data;
    return (
        <ErrorBoundary boundaryName={'OpprettOppgaveContainer'}>
            <OppgaveSkjemaContainer
                gsakTema={gsakTema}
                lukkPanel={props.lukkPanel}
                onSuccessCallback={props.onSuccessCallback}
                valgtTraad={props.valgtTraad}
            />
            )}
        </ErrorBoundary>
    );
}

export default OpprettOppgaveContainer;
