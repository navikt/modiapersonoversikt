import { useAtom } from 'jotai';
import * as React from 'react';
import { aktivEnhetAtom } from 'src/lib/state/context';

interface ValgtEnhetState {
    enhetId: string;
    setEnhetId(enhetId: string): void;
}

const ValgtEnhetContext = React.createContext<ValgtEnhetState | undefined>(undefined);

export function ValgtEnhetProvider(props: { children: React.ReactNode }) {
    const [aktivEnhet, setAktivEnhet] = useAtom(aktivEnhetAtom);

    const updateEnhet = React.useCallback(
        (enhetId: string) => {
            setAktivEnhet(enhetId);
        },
        [aktivEnhet]
    );
    const value = { enhetId: aktivEnhet ?? '', setEnhetId: updateEnhet };
    return <ValgtEnhetContext.Provider value={value}>{props.children}</ValgtEnhetContext.Provider>;
}

export function useValgtenhet(): ValgtEnhetState {
    const context = React.useContext(ValgtEnhetContext);
    if (context === undefined) {
        throw new Error('useValgtenhet must be used within a ValgtEnhetProvider');
    }
    return context;
}
