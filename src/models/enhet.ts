export interface Enhet {
    readonly enhetId: string;
    readonly navn: string;
    readonly type?: string | null;
    readonly gruppeId?: string | null;
    readonly oppgavebehandler?: boolean | null;
}
