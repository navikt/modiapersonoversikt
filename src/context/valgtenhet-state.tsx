import * as React from 'react';
import { post } from '../api/api';
import { apiBaseUri } from '../api/config';
import useIsMounted from '../utils/hooks/use-is-mounted';

interface ValgtEnhetState {
    enhetId: string;
    setEnhetId(enhetId: string): void;
}

const ValgtEnhetContext = React.createContext<ValgtEnhetState | undefined>(undefined);

export function ValgtEnhetProvider(props: { children: React.ReactNode }) {
    const isMounted = useIsMounted();
    const [enhetId, setEnhetId] = React.useState('');
    const updateEnhet = React.useCallback(
        (enhetId: string) => {
            post(`${apiBaseUri}/hode/velgenhet`, enhetId, 'VelgEnhet').then(() => {
                if (isMounted.current) {
                    setEnhetId(enhetId);
                }
            });
        },
        [setEnhetId, isMounted]
    );

    const value = { enhetId, setEnhetId: updateEnhet };
    return <ValgtEnhetContext.Provider value={value}>{props.children}</ValgtEnhetContext.Provider>;
}

export function useValgtenhet(): ValgtEnhetState {
    const context = React.useContext(ValgtEnhetContext);
    if (context === undefined) {
        throw new Error('useValgtenhet must be used within a ValgtEnhetProvider');
    }
    return context;
}
