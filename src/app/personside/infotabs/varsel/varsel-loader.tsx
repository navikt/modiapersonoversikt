import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { DittNavBeskjed, DittNavOppgave, isDittNavEvent, UnifiedVarsel, Varsel } from '../../../../models/varsel';
import { useGjeldendeBruker } from '../../../../redux/gjeldendeBruker/types';
import useFetch, { hasData, hasError, isPending } from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../../../api/config';
import LazySpinner from '../../../../components/LazySpinner';
import { datoSynkende } from '../../../../utils/date-utils';
import freeze from '../../../../utils/freeze';

function lagFetchOptions(fnr: string): RequestInit {
    // freeze blir brukt for å forhindre at adrum.js legger til ekstra header-felter
    // Da det fører til at ajax-kallene blir kjørt dobbelt
    return freeze({
        credentials: 'include',
        headers: {
            fodselsnummer: fnr
        }
    });
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
type VarslerRenderer<P> = React.ComponentType<VarslerRendererProps & P>;
type VarselLoaderProps<P> = P & { component: VarslerRenderer<P> };

function VarslerLoader<P>(props: VarselLoaderProps<P>) {
    const fnr = useGjeldendeBruker();

    const options = React.useMemo(() => lagFetchOptions(fnr), [fnr]);
    const beskjeder = useFetch<DittNavBeskjed[]>('/dittnav-eventer-modia/fetch/beskjed/all', options);
    const oppgaver = useFetch<DittNavOppgave[]>('/dittnav-eventer-modia/fetch/oppgave/all', options);
    const varsler = useFetch<Varsel[]>(`${apiBaseUri}/varsler/${fnr}`);

    const ressurser = [
        { navn: 'beskjeder', ressurs: beskjeder },
        { navn: 'oppgaver', ressurs: oppgaver },
        { navn: 'varsler', ressurs: varsler }
    ];

    const venterPaRessurser: boolean = ressurser.some(config => isPending(config.ressurs));
    const ressurserMedFeil: Array<string> = ressurser
        .filter(config => hasError(config.ressurs))
        .map(config => config.navn);

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
