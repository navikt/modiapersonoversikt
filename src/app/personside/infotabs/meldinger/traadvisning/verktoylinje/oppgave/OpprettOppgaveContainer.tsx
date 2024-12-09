import ErrorBoundary from '../../../../../../../components/ErrorBoundary';
import { CenteredLazySpinner } from '../../../../../../../components/LazySpinner';
import type { Traad } from '../../../../../../../models/meldinger/meldinger';
import gsaktemaResource from '../../../../../../../rest/resources/gsaktemaResource';
import OppgaveSkjema from './OppgaveSkjema';

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
