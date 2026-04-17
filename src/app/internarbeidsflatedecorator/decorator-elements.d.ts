// Type declarations for the internarbeidsflate decorator custom elements.
// The elements are registered at runtime by the CDN-loaded WC bundle.

interface DecoratorElementAttributes {
    'app-name'?: string;
    environment?: string;
    'url-format'?: string;
    fnr?: string;
    enhet?: string;
    'fnr-sync-mode'?: string;
    'enhet-sync-mode'?: string;
    'show-enheter'?: string;
    'show-search-area'?: string;
    'show-hotkeys'?: string;
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
    onEnhetChanged?: (e: Event) => void;
    onFnrChanged?: (e: Event) => void;
    onLinkClick?: (e: Event) => void;
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
