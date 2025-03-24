import type { Enhet } from '../../rest/resources/saksbehandlersEnheterResource';

interface Markup {
    etterSokefelt?: string;
}

type KeyDescriptionObject = {
    char: string;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
};
type KeyDescription = string | KeyDescriptionObject;

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

type Environment = 'q0' | 'q1' | 'q2' | 'q3' | 'q4' | 'prod' | 'local' | 'mock';

type UrlFormat = 'LOCAL' | 'NAV_NO' | 'ANSATT';

export interface DecoratorPropsV3 {
    appName: string;
    hotkeys?: Hotkey[];
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
    onEnhetChanged: (enhet?: string | null, enhetValue?: Enhet) => void;
    onLinkClick?: (link: { text: string; url: string }) => void;
    onFnrChanged: (fnr?: string | null) => void;
    websocketUrl?: string | undefined;
}
