import { DecoratorButtonId as OppdateringsloggButtonId } from '../oppdateringslogg/OppdateringsloggContainer';
import bjelleIkon from '../../svg/bjelle.svg?raw';
import { parseQueryString, useQueryParams } from '../../utils/url-utils';
import { useValgtenhet } from '../../context/valgtenhet-state';
import useHandleGosysUrl from './useHandleGosysUrl';
import { useSettAktivBruker, useOnMount } from '../../utils/customHooks';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { Enhet } from '../../rest/resources/saksbehandlersEnheterResource';
import { trackNavigation, updateUserEnhet } from '../../utils/amplitude';
import { useCallback } from 'react';
import { DecoratorPropsV3, Hotkey } from './decoratorprops';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import { getEnvFromHost } from '../../utils/environment';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

export function useDecoratorConfig() {
    const valgtEnhet = useValgtenhet();
    const valgtEnhetId = valgtEnhet.enhetId;
    const setEnhetId = valgtEnhet.setEnhetId;
    const settAktivBruker = useSettAktivBruker();

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

    const configV3 = useCallback(lagConfigV3, [valgtEnhetId, settAktivBruker, handleSetEnhet, handleLinkClick])(
        valgtEnhetId,
        settAktivBruker,
        handleSetEnhet,
        handleLinkClick
    );

    return { configV3 };
}

const etterSokefelt = `
        <div class="knapper_container">
          <button class="personsok-button" id="toggle-personsok" aria-label="Åpne avansert søk" title="Åpne avansert søk">
            <span> A </span>
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

function lagConfigV3(
    enhet: string | undefined | null,
    settAktivBruker: (fnr: string | null) => void,
    settEnhet: (enhet: string, enhetValue?: Enhet) => void,
    onLinkClick?: (link: { text: string; url: string }) => void
): DecoratorPropsV3 {
    const { sokFnr, userKey } = getFnrFraUrl();
    const fnr = useGjeldendeBruker();
    const onsketFnr = sokFnr ?? fnr;
    const environment = import.meta.env.PROD ? getEnvFromHost() : 'mock';

    const { isOn: fjernBasePath } = useFeatureToggle(FeatureToggles.FjerneContextHolderBasepath);

    return {
        appName: 'Modia personoversikt',
        fnr: onsketFnr ?? undefined,
        userKey: userKey ?? fnr ?? undefined,
        onFnrChanged: (fnr) => {
            if (fnr && fnr.length > 0) {
                settAktivBruker(fnr);
            } else {
                settAktivBruker(null);
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
        enableHotkeys: true,
        // modiacontextholder kjører på samme domene som modiapersonoversikt.
        // Som default brukes app.adeo.no, så her tvinger vi dekoratøren over på nytt domene
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        proxy: import.meta.env.PROD
            ? `https://${window.location.host}${import.meta.env.BASE_URL}proxy${fjernBasePath ? '/modiacontextholder' : ''}`
            : import.meta.env.VITE_CONTEXTHOLDER_URL ?? `${import.meta.env.BASE_URL}proxy/modiacontextholder`,
        environment,
        urlFormat: import.meta.env.PROD ? (window.location.host.includes('adeo.no') ? 'ADEO' : 'NAV_NO') : 'LOCAL',
        showEnheter: true,
        showSearchArea: true,
        fetchActiveUserOnMount: true,
        fetchActiveEnhetOnMount: true
    };
}

function getFnrFraUrl(): { sokFnr: string | null; userKey: string | null } {
    const location = window.location;

    const queryParams = parseQueryString<{ sokFnr?: string; userKey?: string }>(location.search);

    return {
        sokFnr: queryParams.sokFnr ?? null,
        userKey: queryParams.userKey ?? null
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
