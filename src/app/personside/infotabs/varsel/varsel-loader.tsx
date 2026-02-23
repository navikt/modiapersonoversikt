import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import * as React from 'react';
import LazySpinner from '../../../../components/LazySpinner';
import { isDittNavEvent, type UnifiedVarsel, type VarslerResult } from '../../../../models/varsel';
import varselResource from '../../../../rest/resources/varselResource';
import { datoSynkende } from '../../../../utils/date-utils';

function datoExtractor(varsel: UnifiedVarsel) {
    if (isDittNavEvent(varsel)) {
        return varsel.opprettet;
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
    const varslerResponse = varselResource.useFetch();

    if (varslerResponse.isLoading) {
        return <LazySpinner type="M" />;
    }
    if (varslerResponse.isError) {
        return <AlertStripeFeil>Feil ved uthenting av brukers varsler og notifikasjoner.</AlertStripeFeil>;
    }
    const varsler: VarslerResult | undefined = varslerResponse.data;
    let feilmelding = null;
    if (varsler && varsler.feil.length > 0) {
        feilmelding = <AlertStripeFeil className="blokk-xs">{varsler.feil.join('. ')}</AlertStripeFeil>;
    }

    const varselElementer = varsler?.varsler.sort(datoSynkende(datoExtractor));
    const { component, ...extraProps } = props;
    const pProps = extraProps as unknown as P;

    return React.createElement(component, {
        ...pProps,
        varsler: varselElementer ?? [],
        feilmelding
    });
}

export default VarslerLoader;
