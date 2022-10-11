import * as React from 'react';

interface VisittkortState {
    apent: boolean;
    setApent(value: boolean): void;
    toggle(): void;
}

const VisittkortStateContext = React.createContext<VisittkortState | undefined>(undefined);

export function VisittkortStateProvider(props: { children: React.ReactNode }) {
    const [apent, setApent] = React.useState(false);
    const toggle = React.useCallback(() => setApent((prev) => !prev), [setApent]);
    const value = { apent, setApent, toggle };
    return <VisittkortStateContext.Provider value={value}>{props.children}</VisittkortStateContext.Provider>;
}

export function useVisittkortState(): VisittkortState {
    const context = React.useContext(VisittkortStateContext);
    if (context === undefined) {
        throw new Error('useVisittkortStatus must be used within a VisittkortStateProvider');
    }
    return context;
}
