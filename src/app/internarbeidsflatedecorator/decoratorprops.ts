export const RESET_VALUE = '\u0000';

export interface TogglesConfig {
    visVeileder?: boolean;
}

export interface Markup {
    etterSokefelt?: string;
}

export interface ControlledContextvalue<T> extends BaseContextvalue<T> {
    value: string | null;
}
export interface UncontrolledContextvalue<T> extends BaseContextvalue<T> {
    initialValue: string | null;
}

export interface BaseContextvalue<T> {
    display: T;
    onChange(value: string | null): void;
    skipModal?: boolean;
    ignoreWsEvents?: boolean;
}

export type Contextvalue<T> = ControlledContextvalue<T> | UncontrolledContextvalue<T>;

export enum EnhetDisplay {
    ENHET = 'ENHET',
    ENHET_VALG = 'ENHET_VALG'
}

export enum FnrDisplay {
    SOKEFELT = 'SOKEFELT'
}

export type EnhetContextvalue = Contextvalue<EnhetDisplay>;
export type FnrContextvalue = Contextvalue<FnrDisplay>;

export interface DecoratorProps {
    appname: string;
    fnr?: FnrContextvalue;
    enhet?: EnhetContextvalue;
    toggles?: TogglesConfig;
    markup?: Markup;
}
