export const RESET_VALUE = '\u0000';

interface TogglesConfig {
    visVeileder?: boolean;
}

interface Markup {
    etterSokefelt?: string;
}

interface ControlledContextvalue<T> extends BaseContextvalue<T> {
    value: string | null;
}
interface UncontrolledContextvalue<T> extends BaseContextvalue<T> {
    initialValue: string | null;
}

interface BaseContextvalue<T> {
    display: T;
    onChange(value: string | null): void;
    skipModal?: boolean;
    ignoreWsEvents?: boolean;
}

type Contextvalue<T> = ControlledContextvalue<T> | UncontrolledContextvalue<T>;

export enum EnhetDisplay {
    ENHET = 'ENHET',
    ENHET_VALG = 'ENHET_VALG'
}

export enum FnrDisplay {
    SOKEFELT = 'SOKEFELT'
}

type EnhetContextvalue = Contextvalue<EnhetDisplay>;
type FnrContextvalue = Contextvalue<FnrDisplay>;

export interface DecoratorProps {
    appname: string;
    fnr?: FnrContextvalue;
    enhet?: EnhetContextvalue;
    toggles?: TogglesConfig;
    markup?: Markup;
}
