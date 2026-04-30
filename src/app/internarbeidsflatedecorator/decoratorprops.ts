export interface DecoratorPropsV3 {
    // Påkrevde props
    appName: string; // Navn på applikasjonen
    environment: Environment; // Miljø som skal brukes
    urlFormat: UrlFormat; // URL-format
    showEnheter: boolean; // Vis enhet-velger
    showSearchArea: boolean; // Vis søkefelt
    showHotkeys: boolean; // Vis hurtigtaster-panel
    // Valgfrie props
    enhet?: string | undefined; // Konfigurasjon av enhet-kontekst
    fnr?: string | undefined; // Konfigurasjon av fødselsnummer-kontekst
    fnrSyncMode?: 'sync' | 'writeOnly' | 'ignore'; // Modus for fnr state management. "sync" er default. "writeOnly" setter men henter ikke. "ignore" verken henter eller setter.
    enhetSyncMode?: 'sync' | 'writeOnly' | 'ignore'; // Samme som fnrSyncMode, men for enhet.
    accessToken?: string | undefined; // JWT som settes som Authorization-header
    includeCredentials?: boolean | undefined; // Sett `credentials: 'include'` på requests til contextholderen
    userKey?: string | undefined; // Midlertidig kode i stedet for fnr (se "userKey" under)
    enableHotkeys?: boolean | undefined; // Aktiver hurtigtaster
    fetchActiveEnhetOnMount?: boolean | undefined; // Hent sist aktiv enhet ved oppstart hvis enhet ikke er satt
    fetchActiveUserOnMount?: boolean | undefined; // Hent sist aktiv bruker ved oppstart hvis fnr ikke er satt
    onEnhetChanged?: (enhet?: string | null, enhetObjekt?: Enhet) => void; // Kalles når enheten endres
    onFnrChanged?: (fnr?: string | null) => void; // Kalles når fnr endres
    onLinkClick?: (link: { text: string; url: string }) => void; // Kalles ved klikk på menylenker
    onBeforeRequest?: (headers: HeadersInit) => HeadersInit | undefined; // Manipuler request-headers før kall til contextholderen
    hotkeys?: Hotkey[]; // Konfigurasjon av hurtigtaster
    markup?: Markup; // Egen HTML
    proxy?: string | undefined; // Overstyrer URL til contextholderen
    websocketUrl?: string | undefined; // WebSocket URL
}

interface Markup {
    etterSokefelt?: string; // Gir muligheten for å sende inn egen HTML som blir en del av dekoratøren
}

interface Enhet {
    readonly enhetId: string;
    readonly navn: string;
}

type Environment = 'q0' | 'q1' | 'q2' | 'q3' | 'q4' | 'prod' | 'local' | 'mock';

type UrlFormat = 'LOCAL' | 'NAV_NO' | 'ANSATT';

interface HotkeyObject {
    char: string;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
}

interface HotkeyDescription {
    key: HotkeyObject;
    description: string;
    forceOverride?: boolean;
}

interface ActionHotKey extends HotkeyDescription {
    action(event: KeyboardEvent): void;
}

interface DocumentingHotKey extends HotkeyDescription {
    documentationOnly: boolean;
}

export type Hotkey = ActionHotKey | DocumentingHotKey;
