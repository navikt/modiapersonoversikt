import * as React from 'react';

interface DialogpanelState {
    apent: boolean;
    setApent(value: boolean): void;
    toggle(): void;
}

const DialogpanelStateContext = React.createContext<DialogpanelState | undefined>(undefined);

export function DialogpanelStateProvider(props: { children: React.ReactNode }) {
    const [apent, setApent] = React.useState(true);
    const toggle = React.useCallback(() => setApent((prev) => !prev), [setApent]);
    const value = { apent, setApent, toggle };
    return <DialogpanelStateContext.Provider value={value}>{props.children}</DialogpanelStateContext.Provider>;
}

export function useDialogpanelState(): DialogpanelState {
    const context = React.useContext(DialogpanelStateContext);
    if (context === undefined) {
        throw new Error('useDialogpanelStatus must be used within a DialogpanelStateProvider');
    }
    return context;
}
