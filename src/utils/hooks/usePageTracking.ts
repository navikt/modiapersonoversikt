import { useRouterState } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { nyModiaAtom } from 'src/components/NyModia';
import { setAnalyticsReferrer, setAnalyticsUrl, trackBesokUmami } from 'src/utils/analytics';

const removeSearchString = (href: string): string => {
    try {
        const url = new URL(href);
        url.search = '';
        return url.toString();
    } catch {
        return '';
    }
};

const isNewModiaUrl = (pathname: string): boolean => pathname === '/new' || pathname.startsWith('/new/');

const isNyModiaRedirect = (fromPathname: string, toPathname: string): boolean =>
    isNewModiaUrl(toPathname) && fromPathname === toPathname.slice('/new'.length);

export function usePageTracking() {
    const nyModia = useAtomValue(nyModiaAtom);
    const { pending: featureToggleisPending } = useFeatureToggle(FeatureToggles.NyModiaKnapp);

    const { location, isLoading: routerIsPending } = useRouterState({
        select: (s) => ({ location: s.location, isLoading: s.isLoading })
    });
    const prevRef = useRef<{ pathname: string; url: string } | null>(null);
    // Siste faktisk trackede URL — brukes som referrer neste gang vi tracker.
    // Skiller seg fra prevRef fordi vi ikke oppdaterer denne for skippede navigasjoner (gammel modia URL).
    const lastTrackedUrlRef = useRef<string>('');

    useEffect(() => {
        if (featureToggleisPending || routerIsPending) return;

        const origin = window.location.origin;
        const currentUrl = removeSearchString(origin + location.href);
        const prev = prevRef.current;
        const fromPathname = prev?.pathname ?? '';

        prevRef.current = { pathname: location.pathname, url: currentUrl };

        // Om brukeren blir redirected fra gammel til ny modia så vil vi ikke tracke besøk til gammel modia
        const willSkip = !isNewModiaUrl(location.pathname) && nyModia;
        const nyModiaRedirect = !!fromPathname && isNyModiaRedirect(fromPathname, location.pathname);

        if (nyModiaRedirect) {
            // For intern navigasjon via dekoratøren: bruk siste trackede side som referrer.
            if (lastTrackedUrlRef.current) {
                setAnalyticsReferrer(lastTrackedUrlRef.current);
            }
        } else if (!willSkip) {
            setAnalyticsReferrer(removeSearchString(prev?.url ?? document.referrer));
        }
        setAnalyticsUrl(currentUrl);

        // Ikke track om det kun er søkestrengen har endret seg
        const prevUrlWithoutSearch = prev ? removeSearchString(prev.url) : '';
        if (prevUrlWithoutSearch === currentUrl) return;
        if (willSkip) return;

        trackBesokUmami();
        lastTrackedUrlRef.current = currentUrl;
    }, [location.pathname, location.href, routerIsPending, nyModia, featureToggleisPending]);
}
