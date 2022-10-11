import * as React from 'react';

interface Meldingsok {
    query: string;
    setQuery(value: string): void;
}

const MeldingSokContext = React.createContext<Meldingsok | undefined>(undefined);

export function MeldingsokProvider(props: { children: React.ReactNode }) {
    const [query, setQuery] = React.useState('');
    const value = { query, setQuery };
    return <MeldingSokContext.Provider value={value}>{props.children}</MeldingSokContext.Provider>;
}

export function useMeldingsok(): Meldingsok {
    const context = React.useContext(MeldingSokContext);
    if (context === undefined) {
        throw new Error('useMeldingsok must be used within a MeldingsokProvider');
    }
    return context;
}
