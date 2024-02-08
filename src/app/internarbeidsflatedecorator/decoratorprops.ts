export const RESET_VALUE = '\u0000';

interface TogglesConfig {
    visVeileder?: boolean;
    visHotkeys?: boolean;
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
type ProxyConfig = boolean | string;

export type KeyDescriptionObject = {
    char: string;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
};
export type KeyDescription = string | KeyDescriptionObject;

interface BaseHotkey {
    key: KeyDescription;
    description: string;
}
interface ActionHotkey extends BaseHotkey {
    action(event: KeyboardEvent): void;
}
interface DocumentingHotkey extends BaseHotkey {
    documentationOnly: boolean;
}
export type Hotkey = ActionHotkey | DocumentingHotkey;

export interface DecoratorProps {
    appname: string;
    fnr?: FnrContextvalue;
    enhet?: EnhetContextvalue;
    toggles?: TogglesConfig;
    markup?: Markup;
    hotkeys?: Hotkey[];
    useProxy?: ProxyConfig;
    accessToken?: string;
}

export type Environment = 'q0' | 'q1' | 'q2' | 'q3' | 'q4' | 'prod' | 'local' | 'mock';

export type UrlFormat = 'LOCAL' | 'ADEO' | 'NAV_NO';

export interface DecoratorPropsV3 {
    appName: string;
    hotkeys?: Hotkey[];
    toggles?: TogglesConfig;
    markup?: Markup;
    showEnheter: boolean;
    showSearchArea: boolean;
    showHotkeys: boolean;
    environment: Environment;
    urlFormat: UrlFormat;
    proxy?: string | undefined;
    contextholderUrl?: string | undefined;
    enhet?: string | undefined;
    accessToken?: string | undefined;
    fnr?: string | undefined;
    userKey?: string | undefined;
    enableHotkeys?: boolean | undefined;
    fetchActiveEnhetOnMount?: boolean | undefined;
    fetchActiveUserOnMount?: boolean | undefined;
    onBeforeRequest?: (headers: HeadersInit) => HeadersInit | undefined;
    onEnhetChanged: (enhet?: string | null) => void;
    onFnrChanged: (fnr?: string | null) => void;
}
