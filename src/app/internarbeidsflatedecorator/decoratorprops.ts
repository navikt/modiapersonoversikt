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

export interface DecoratorProps {
    appname: string;
    fnr: string | undefined | null;
    enhet: string | undefined | null;
    toggles: Toggles;
    markup?: Markup;

    onSok(fnr: string): void;

    onEnhetChange(enhet: string): void;
    contextholder?: true | Contextholder;
}
