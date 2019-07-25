export interface Toggles {
    visVeilder: boolean;
    visSokefelt: boolean;
    visEnhetVelger: boolean;
    visEnhet: boolean;
}
export interface Contextholder {
    url: string;
    promptBeforeEnhetChange?: boolean;
}

export interface Markup {
    etterSokefelt?: string;
}

export interface Me {
    readonly ident: string;
    readonly navn: string;
}

export interface Enhet {
    readonly enhetId: string;
    readonly navn: string;
}

export interface Enheter {
    readonly enhetliste: Array<Enhet>;
}

export interface DecoratorProps {
    appname: string;
    fnr: string | undefined | null;
    enhet: string | undefined | null;
    toggles: Toggles;
    markup?: Markup;
    identSource: () => Promise<Me>;
    enheterSource: () => Promise<Enheter>;

    onSok(fnr: string): void;

    onEnhetChange(enhet: string): void;
    contextholder?: Contextholder;
}
