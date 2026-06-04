import { useRouterState } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { brukerHarValgtAtom, nyModiaAtom } from 'src/components/NyModia';
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

const isNewModiaUrl = (pathname: string): boolean => pathname.startsWith('/new');

const isNyModiaRedirect = (fromPathname: string, toPathname: string): boolean =>
    isNewModiaUrl(toPathname) && fromPathname === toPathname.slice('/new'.length);

export function usePageTracking() {
    const nyModia = useAtomValue(nyModiaAtom);
    const brukerHarValgt = useAtomValue(brukerHarValgtAtom);
    const { isOn, pending: featureToggleisPending } = useFeatureToggle(FeatureToggles.NyModiaKnapp);

    const { location, isLoading: routerIsPending } = useRouterState({
        select: (s) => ({ location: s.location, isLoading: s.isLoading })
    });
    const prevRef = useRef<{ pathname: string; url: string } | null>(null);
    // Siste faktisk trackede URL — brukes som referrer neste gang vi tracker.
    // Skiller seg fra prevRef fordi vi ikke oppdaterer denne for skippede navigasjoner (gammel modia URL).
    const lastTrackedUrlRef = useRef<string>('');

    useEffect(() => {
        if (featureToggleisPending || routerIsPending) return;

        const prev = prevRef.current;
        const fromPathname = prev?.pathname ?? '';
        const toPathname = location.pathname;
        const currentUrl = removeSearchString(window.location.origin + toPathname);

        prevRef.current = { pathname: toPathname, url: currentUrl };

        // Om brukeren blir redirected fra gammel til ny modia så vil vi ikke tracke besøk til gammel modia
        const nyModiaWillBeEnabled = isOn && !brukerHarValgt;
        const willSkip = !isNewModiaUrl(toPathname) && (nyModia || nyModiaWillBeEnabled);

        // Dette er den faktiske urlen vi vil tracke
        const nyModiaRedirect = !!fromPathname && isNyModiaRedirect(fromPathname, toPathname);

        if (nyModiaRedirect) {
            if (lastTrackedUrlRef.current) {
                setAnalyticsReferrer(lastTrackedUrlRef.current);
            }
        } else if (!willSkip) {
            setAnalyticsReferrer(removeSearchString(prev?.url ?? document.referrer));
        }
        setAnalyticsUrl(currentUrl);

        // Ikke track om det kun er søkestrengen som har endret seg
        const prevUrlWithoutSearch = prev ? removeSearchString(prev.url) : '';
        if (prevUrlWithoutSearch === currentUrl) return;
        if (willSkip) return;

        trackBesokUmami();
        lastTrackedUrlRef.current = currentUrl;
    }, [location.pathname, routerIsPending, nyModia, featureToggleisPending, isOn, brukerHarValgt]);
}
