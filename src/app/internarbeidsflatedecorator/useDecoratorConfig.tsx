import { DecoratorButtonId as OppdateringsloggButtonId } from '../oppdateringslogg/OppdateringsloggContainer';
import bjelleIkon from '../../svg/bjelle.svg';
import { parseQueryString, useQueryParams } from '../../utils/url-utils';
import { matchPath, useHistory } from 'react-router';
import { fjernBrukerFraPath, paths, setNyBrukerIPath } from '../routes/routing';
import { useValgtenhet } from '../../context/valgtenhet-state';
import useHandleGosysUrl from './useHandleGosysUrl';
import { useOnMount } from '../../utils/customHooks';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { Enhet } from '../../rest/resources/saksbehandlersEnheterResource';
import { trackNavigation, updateUserEnhet } from '../../utils/amplitude';
import { useCallback } from 'react';
import { History } from 'history';
import { DecoratorProps, DecoratorPropsV3, EnhetDisplay, FnrDisplay, Hotkey, RESET_VALUE } from './decoratorprops';
import { removePrefix } from '../../utils/string-utils';

export function useDecoratorConfig() {
    const valgtEnhet = useValgtenhet();
    const valgtEnhetId = valgtEnhet.enhetId;
    const setEnhetId = valgtEnhet.setEnhetId;

    const history = useHistory();
    const queryParams = useQueryParams<{ sokFnr?: string }>();

    useHandleGosysUrl();

    useOnMount(() => {
        if (queryParams.sokFnr) {
            loggEvent('Oppslag', 'Puzzle');
        }
    });

    const handleSetEnhet = (enhet: string, enhetValue?: Enhet) => {
        if (enhetValue) {
            updateUserEnhet(enhetValue.navn);
        }
        setEnhetId(enhet);
    };

    const handleLinkClick = (link: { text: string; url: string }) => {
        trackNavigation(link.text, link.url);
    };

    const configV2 = useCallback(lagConfig, [valgtEnhetId, history, handleSetEnhet])(
        valgtEnhetId,
        history,
        handleSetEnhet
    );

    const configV3 = useCallback(lagConfigV3, [valgtEnhetId, history, handleSetEnhet, handleLinkClick])(
        valgtEnhetId,
        history,
        handleSetEnhet,
        handleLinkClick
    );

    return { configV2, configV3 };
}

const etterSokefelt = `
        <div class="knapper_container">
          <button class="personsok-button" id="toggle-personsok" aria-label="Åpne avansert søk" title="Åpne avansert søk">
            <span> A <span class="personsok-pil"></span></span>
          </button>
          <button class="${OppdateringsloggButtonId}" id="${OppdateringsloggButtonId}" title="Åpne oppdateringslogg">
            <div class="oppdateringslogg__ikon">
              ${bjelleIkon}
            </div>
            <span class="oppdateringslogg__beskrivelse" aria-label="Åpne oppdateringslogg"></span>
            <span class="oppdateringslogg__ulestindikator" aria-label="(Uleste)"></span>
          </button>
        </div>
    `;

function lagConfig(
    enhet: string | undefined | null,
    history: History,
    settEnhet: (enhet: string) => void
): DecoratorProps {
    const { sokFnr, pathFnr } = getFnrFraUrl();
    const onsketFnr = sokFnr || pathFnr;
    const fnrValue = onsketFnr === '0' ? RESET_VALUE : onsketFnr;
    return {
        appname: 'Modia personoversikt',
        fnr: {
            value: fnrValue,
            display: FnrDisplay.SOKEFELT,
            onChange(fnr: string | null): void {
                if (fnr === getFnrFraUrl().pathFnr) {
                    return;
                }
                if (fnr && fnr.length > 0) {
                    setNyBrukerIPath(history, fnr);
                } else {
                    fjernBrukerFraPath(history);
                }
            }
        },
        enhet: {
            initialValue: enhet || null,
            display: EnhetDisplay.ENHET_VALG,
            onChange(enhet: string | null): void {
                if (enhet) {
                    settEnhet(enhet);
                }
            }
        },
        toggles: {
            visVeileder: true,
            visHotkeys: true
        },
        markup: {
            etterSokefelt: etterSokefelt
        },
        hotkeys: getHotkeys(),
        // modiacontextholder kjører på samme domene som modiapersonoversikt.
        // Som default brukes app.adeo.no, så her tvinger vi dekoratøren over på nytt domene
        useProxy: `https://${window.location.host}${import.meta.env.BASE_URL}proxy`
    };
}

function lagConfigV3(
    enhet: string | undefined | null,
    history: History,
    settEnhet: (enhet: string, enhetValue?: Enhet) => void,
    onLinkClick?: (link: { text: string; url: string }) => void
): DecoratorPropsV3 {
    const { sokFnr, pathFnr, userKey } = getFnrFraUrl();
    const onsketFnr = sokFnr || pathFnr;
    const getEnvFromHost = () => {
        switch (window.location.host) {
            case 'app.adeo.no':
            case 'modiapersonoversikt.intern.nav.no':
                return 'prod';
            case 'app-q1.adeo.no':
                return 'q1';
            case 'app-q0.adeo.no':
                return 'q0';
            case 'modiapersonoversikt.intern.dev.nav.no':
                return 'q2';
        }
        return 'mock';
    };

    const environment = import.meta.env.PROD ? getEnvFromHost() : 'mock';

    return {
        appName: 'Modia personoversikt',
        fnr: onsketFnr ?? undefined,
        userKey: userKey ?? pathFnr ?? undefined,
        onFnrChanged: (fnr) => {
            if (fnr === getFnrFraUrl().pathFnr) {
                return;
            }
            if (fnr && fnr.length > 0) {
                setNyBrukerIPath(history, fnr);
            } else {
                fjernBrukerFraPath(history);
            }
        },
        enhet: enhet ?? undefined,
        onEnhetChanged: (enhet, enhetValue) => {
            if (enhet) {
                settEnhet(enhet, enhetValue);
            }
        },
        onLinkClick: onLinkClick ?? undefined,
        showHotkeys: true,
        markup: {
            etterSokefelt: etterSokefelt
        },
        hotkeys: getHotkeys(),
        // modiacontextholder kjører på samme domene som modiapersonoversikt.
        // Som default brukes app.adeo.no, så her tvinger vi dekoratøren over på nytt domene
        proxy: import.meta.env.PROD
            ? `https://${window.location.host}${import.meta.env.BASE_URL}proxy`
            : import.meta.env.VITE_CONTEXTHOLDER_URL ?? `${import.meta.env.BASE_URL}proxy`,
        environment,
        urlFormat: import.meta.env.PROD ? (window.location.host.includes('adeo.no') ? 'ADEO' : 'NAV_NO') : 'LOCAL',
        showEnheter: true,
        showSearchArea: true,
        fetchActiveUserOnMount: true,
        fetchActiveEnhetOnMount: true
    };
}

function getPathnameFromUrl(): string {
    const { pathname, hash } = window.location;
    return removePrefix(pathname + hash, import.meta.env.BASE_URL, '/#', '#');
}

function getFnrFraUrl(): { sokFnr: string | null; pathFnr: string | null; userKey: string | null } {
    const location = window.location;
    const pathname = getPathnameFromUrl();

    const queryParams = parseQueryString<{ sokFnr?: string; userKey?: string }>(location.search);
    const sakerUriMatch = matchPath<{ fnr: string }>(pathname, `${paths.sakerFullscreen}/:fnr`);
    const saksdokumentUriMatch = matchPath<{ fnr: string }>(pathname, `${paths.saksdokumentEgetVindu}/:fnr`);
    const personUriMatch = matchPath<{ fnr: string }>(pathname, `${paths.personUri}/:fnr`);

    return {
        sokFnr: queryParams.sokFnr ?? null,
        userKey: queryParams.userKey ?? null,
        pathFnr: sakerUriMatch?.params.fnr ?? saksdokumentUriMatch?.params.fnr ?? personUriMatch?.params.fnr ?? null
    };
}

function getHotkeys(): Hotkey[] {
    /**
     * TODO ønskelig å fjerne dobbelt-bokføring her og ved bruken av useHook
     * hurtigtastene kan definere actions her om det er enkelt (litt avhengig av funksjon)
     * Evt kan bruken av `useHotkey` hooken føre til at dette blir registrert i en global context som kan brukes her
     */
    const isProd = window.location.host === 'app.adeo.no';
    const naisInternNavDomain = isProd ? '.intern.nav.no' : '.intern.dev.nav.no';
    return [
        {
            key: { char: 'O', altKey: true },
            description: 'Vis oversikt',
            documentationOnly: true
        },
        {
            key: { char: 'T', altKey: true },
            description: 'Vis oppfølging',
            documentationOnly: true
        },
        {
            key: { char: 'M', altKey: true },
            description: 'Vis meldinger',
            documentationOnly: true
        },
        {
            key: { char: 'U', altKey: true },
            description: 'Vis utbetalinger',
            documentationOnly: true
        },
        {
            key: { char: 'S', altKey: true },
            description: 'Vis saker',
            documentationOnly: true
        },
        {
            key: { char: 'Y', altKey: true },
            description: 'Vis ytelser',
            documentationOnly: true
        },
        {
            key: { char: 'V', altKey: true },
            description: 'Vis varsler',
            documentationOnly: true
        },
        {
            key: { char: 'N', altKey: true },
            description: 'Åpne/lukke visitkort',
            documentationOnly: true
        },
        {
            key: { char: 'B', altKey: true },
            description: 'Gå til personforvalter',
            documentationOnly: true
        },
        {
            key: { char: 'C', altKey: true },
            description: 'Åpne samtalemaler',
            documentationOnly: true
        },
        {
            key: { char: 'D', altKey: true },
            description: 'Gå til modia sosialhjelp',
            action(event: KeyboardEvent) {
                event.preventDefault();
                const url = `https://sosialhjelp-modia${naisInternNavDomain}/sosialhjelp/modia/`;
                window.open(url, '_blank');
            }
        }
    ];
}
