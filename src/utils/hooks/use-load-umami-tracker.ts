import { useEffect } from 'react';
import config from 'src/config';

let isLoaded = false;
export const useLoadUmamiTracker = () => {
    const isProd = config.isProd;
    const isLocal = window.location.host.includes('localhost');

    useEffect(() => {
        if (isLoaded) return;
        if (isLocal) return;

        const script = document.createElement('script');
        script.defer = true;
        script.src = isProd
            ? 'https://cdn.nav.no/team-researchops/sporing/sporing.js'
            : 'https://cdn.nav.no/team-researchops/sporing/sporing-dev.js';
        script.setAttribute(
            'data-website-id',
            isProd ? 'a8c2ec9c-2846-4154-8841-5db26494171a' : 'bc5cfdcd-ecc1-402b-8cb0-c30913f0bd13'
        );
        script.setAttribute('data-auto-track', 'false');
        script.setAttribute('data-before-send', 'sendWithEventData');
        document.head.appendChild(script);
        isLoaded = true;

        return () => {
            document.head.removeChild(script);
        };
    }, [isLocal, isProd]);
};
