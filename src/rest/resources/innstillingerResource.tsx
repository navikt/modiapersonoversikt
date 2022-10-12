import * as React from 'react';
import { FetchResult, hasData } from '@nutgaard/use-fetch';
import { useFetch } from '../useRest';
import { postConfig } from '../../api/config';
import { useEffect } from 'react';

export interface SaksbehandlerInnstillinger {
    sistLagret: string;
    innstillinger: Innstillinger;
}

export interface Innstillinger {
    [key: string]: string;
}

const url = '/modiapersonoversikt/proxy/modia-innstillinger/api/innstillinger';

export const InnstillingerContext = React.createContext<FetchResult<SaksbehandlerInnstillinger> | undefined>(undefined);
const eventtype = 'refetchinnstillinger';
const event = new Event(eventtype);

export function InnstillingerContextProvider(props: { children: React.ReactNode }) {
    const fetchResult = useFetch<SaksbehandlerInnstillinger>(url);
    useEffect(() => {
        const listener = () => {
            fetchResult.rerun();
        };
        document.body.addEventListener(eventtype, listener);
        return () => {
            document.body.removeEventListener(eventtype, listener);
        };
    }, [fetchResult]);
    return <InnstillingerContext.Provider value={fetchResult}>{props.children}</InnstillingerContext.Provider>;
}

const resource = {
    useFetch(): FetchResult<SaksbehandlerInnstillinger> {
        const value = React.useContext(InnstillingerContext);
        if (value === undefined) {
            throw new Error('innstillingerResource.useFetch must be used within a InnstillingerContextProvider');
        }
        return value;
    },
    useInnstilling<T extends string>(key: string, defaultValue: T): T {
        const req = this.useFetch();
        if (hasData(req)) {
            return (req.data.innstillinger[key] as T) ?? defaultValue;
        }
        return defaultValue;
    },
    async update(innstillinger: Innstillinger): Promise<SaksbehandlerInnstillinger> {
        try {
            const response = await fetch(url, postConfig(innstillinger));
            const json = await response.json();
            document.body.dispatchEvent(event);
            return json;
        } catch (e: unknown) {
            throw e instanceof Error ? e : new Error(`Unknown error: ${e}`);
        }
    }
};

export default resource;
