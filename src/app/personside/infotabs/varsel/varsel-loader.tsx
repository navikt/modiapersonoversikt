import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { DittNavBeskjed, DittNavOppgave, isDittNavEvent, UnifiedVarsel, Varsel } from '../../../../models/varsel';
import { useGjeldendeBruker } from '../../../../redux/gjeldendeBruker/types';
import useFetch, { hasData, hasError, isPending } from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../api/config';
import LazySpinner from '../../../../components/LazySpinner';
import { datoSynkende } from '../../../../utils/dateUtils';

function lagFetchOptions(fnr: string): RequestInit {
    return {
        credentials: 'include',
        headers: {
            fodselsnummer: fnr
        }
    };
}

function datoExtractor(varsel: UnifiedVarsel) {
    if (isDittNavEvent(varsel)) {
        return varsel.sistOppdatert;
    }
    return varsel.mottattTidspunkt;
}

export interface VarslerRendererProps {
    varsler: Array<UnifiedVarsel>;
    feilmelding: React.ReactElement | null;
}
export type VarslerRenderer<P> = React.ComponentType<VarslerRendererProps & P>;
type VarselLoaderProps<P> = P & { component: VarslerRenderer<P> };

function VarslerLoader<P>(props: VarselLoaderProps<P>) {
    const fnr = useGjeldendeBruker();
    const options = React.useMemo(() => lagFetchOptions(fnr), [fnr]);

    const beskjeder = useFetch<DittNavBeskjed[]>('/dittnav-eventer-modia/fetch/beskjed/all', options);
    const oppgaver = useFetch<DittNavOppgave[]>('/dittnav-eventer-modia/fetch/oppgave/all', options);
    const varsler = useFetch<Varsel[]>(`${apiBaseUri}/varsler/${fnr}`);

    const ressurser = { beskjeder, oppgaver, varsler };
    const venterPaRessurser: boolean = Object.values(ressurser).some(ressurs => isPending(ressurs));
    const ressurserMedFeil: Array<string> = Object.entries(ressurser)
        .filter(([_, ressurs]) => hasError(ressurs))
        .map(([navn]) => navn);

    if (venterPaRessurser) {
        return <LazySpinner type="M" />;
    }

    let feilmelding = null;
    if (ressurserMedFeil.length > 0) {
        feilmelding = (
            <AlertStripeFeil className="blokk-xs">
                Feil ved uthenting av varsel-historikk fra: {ressurserMedFeil.join(', ')}
            </AlertStripeFeil>
        );
    }

    const varselElementer = [
        ...(hasData(varsler) ? varsler.data : []),
        ...(hasData(beskjeder) ? beskjeder.data : []),
        ...(hasData(oppgaver) ? oppgaver.data : [])
    ].sort(datoSynkende(datoExtractor));
    const { component, ...extraProps } = props;
    const pProps = (extraProps as unknown) as P;

    return React.createElement(component, { ...pProps, varsler: varselElementer, feilmelding });
}

export default VarslerLoader;
