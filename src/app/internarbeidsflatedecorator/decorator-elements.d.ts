// Type declarations for the internarbeidsflate decorator custom elements.
// The elements are registered at runtime by the CDN-loaded WC bundle.

interface EnhetChangedDetail {
    enhet?: string | null;
    enhetObjekt?: { enhetId: string; navn: string };
}

interface FnrChangedDetail {
    fnr?: string | null;
}

interface LinkClickDetail {
    text: string;
    url: string;
}

interface DecoratorElementAttributes {
    // Påkrevde attributter
    'app-name': string;
    environment: string;
    'url-format': string;
    'show-enheter': string;
    'show-search-area': string;
    'show-hotkeys': string;
    // Valgfrie attributter
    fnr?: string;
    enhet?: string;
    'fnr-sync-mode'?: string;
    'enhet-sync-mode'?: string;
    'enable-hotkeys'?: string;
    'fetch-active-enhet-on-mount'?: string;
    'fetch-active-user-on-mount'?: string;
    markup?: string;
    hotkeys?: string;
    proxy?: string;
    'websocket-url'?: string;
    'access-token'?: string;
    'include-credentials'?: string;
    'user-key'?: string;
}

interface InternarbeidsflateDecoratorElement extends HTMLElement {
    addEventListener(
        type: 'enhet-changed',
        listener: (event: CustomEvent<EnhetChangedDetail>) => void,
        options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
        type: 'fnr-changed',
        listener: (event: CustomEvent<FnrChangedDetail>) => void,
        options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
        type: 'link-click',
        listener: (event: CustomEvent<LinkClickDetail>) => void,
        options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener(
        type: 'enhet-changed',
        listener: (event: CustomEvent<EnhetChangedDetail>) => void,
        options?: boolean | EventListenerOptions
    ): void;
    removeEventListener(
        type: 'fnr-changed',
        listener: (event: CustomEvent<FnrChangedDetail>) => void,
        options?: boolean | EventListenerOptions
    ): void;
    removeEventListener(
        type: 'link-click',
        listener: (event: CustomEvent<LinkClickDetail>) => void,
        options?: boolean | EventListenerOptions
    ): void;
    removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions
    ): void;
}

declare namespace React {
    namespace JSX {
        interface IntrinsicElements {
            'internarbeidsflate-decorator': React.HTMLAttributes<HTMLElement> &
                React.RefAttributes<HTMLElement> &
                DecoratorElementAttributes;
            'internarbeidsflate-decorator-fullscreen': React.HTMLAttributes<HTMLElement> &
                React.RefAttributes<HTMLElement> &
                DecoratorElementAttributes;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'internarbeidsflate-decorator': InternarbeidsflateDecoratorElement;
    }
}
