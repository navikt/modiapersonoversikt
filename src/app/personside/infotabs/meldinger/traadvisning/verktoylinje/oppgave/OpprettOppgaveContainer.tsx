import ErrorBoundary from 'src/components/ErrorBoundary';
import { CenteredLazySpinner } from 'src/components/LazySpinner';
import type { Traad } from 'src/models/meldinger/meldinger';
import gsaktemaResource from 'src/rest/resources/gsaktemaResource';
import OppgaveSkjema from './OppgaveSkjema';

interface Props {
    lukkPanel: () => void;
    valgtTraad: Traad;
}

function OpprettOppgaveContainer(props: Props) {
    return gsaktemaResource.useRenderer({
        ifPending: <CenteredLazySpinner aria-label="Laster tema" type="L" />,
        ifData: (gsaktema) => (
            <ErrorBoundary boundaryName="OpprettOppgaveContainer">
                <OppgaveSkjema gsakTema={gsaktema} lukkPanel={props.lukkPanel} valgtTraad={props.valgtTraad} />
            </ErrorBoundary>
        )
    });
}

export default OpprettOppgaveContainer;
