import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { aktivBrukerAtom, aktivBrukerLastetAtom, aktivEnhetAtom } from 'src/lib/state/context';
import type { Enhet } from 'src/rest/resources/saksbehandlersEnheterResource';
import { updateUserEnhet } from 'src/utils/analytics';
import { useOnMount, useSettAktivBruker } from 'src/utils/customHooks';
import { getDomainFromHost, getEnvFromHost } from 'src/utils/environment';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import { parseQueryString, useQueryParams } from 'src/utils/url-utils';
import config from '../../config';
import bjelleIkon from '../../svg/bjelle.svg?raw';
import { DecoratorButtonId as OppdateringsloggButtonId } from '../oppdateringslogg/OppdateringsloggContainer';
import type { DecoratorPropsV3, Hotkey } from './decoratorprops';

export function useDecoratorConfig() {
    const [aktivEnhet, setAktivEnhet] = useAtom(aktivEnhetAtom);

    const settAktivBruker = useSettAktivBruker();

    const queryParams = useQueryParams<{
        sokFnr?: string;
        sokFnrCode?: string;
    }>();

    useOnMount(() => {
        if (queryParams.sokFnr) {
            loggEvent('Oppslag', 'Puzzle');
        }
    });

    const handleSetEnhet = (enhet: string, enhetValue?: Enhet) => {
        if (enhetValue) {
            updateUserEnhet(enhetValue.navn, enhetValue.type ?? "Ingen type");
        }
        setAktivEnhet(enhet);
    };

    const configV3 = useCallback(lagConfigV3, [aktivEnhet, settAktivBruker, handleSetEnhet])(
        aktivEnhet,
        settAktivBruker,
        handleSetEnhet
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
    const fnr = useAtomValue(aktivBrukerAtom);
    const setContextLoaded = useSetAtom(aktivBrukerLastetAtom);
    const onsketFnr = sokFnr ?? fnr;
    const environment = import.meta.env.PROD ? getEnvFromHost() : 'mock';

    const urlFormat = import.meta.env.PROD
        ? getDomainFromHost()
        : import.meta.env.VITE_MOCK_ENABLED
          ? 'LOCAL'
          : 'NAV_NO';

    const contextProxy = 'modiacontextholder';

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

            setContextLoaded(true);
        },
        enhet: enhet ?? undefined,
        onEnhetChanged: (enhet, enhetValue) => {
            if (enhet) {
                settEnhet(enhet, enhetValue);
                setContextLoaded(true);
            }
        },
        onLinkClick: onLinkClick ?? undefined,
        showHotkeys: true,
        markup: {
            etterSokefelt: etterSokefelt
        },
        hotkeys: getHotkeys(),
        enableHotkeys: true,
        proxy: (import.meta.env.VITE_CONTEXTHOLDER_URL as string) ?? `${import.meta.env.BASE_URL}proxy/${contextProxy}`,
        environment,
        urlFormat: import.meta.env.PROD ? urlFormat : 'NAV_NO',
        showEnheter: true,
        showSearchArea: true,
        fetchActiveUserOnMount: true,
        fetchActiveEnhetOnMount: true
    };
}

function getFnrFraUrl() {
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
    const naisInternNavDomain = config.isProd ? '.intern.nav.no' : '.intern.dev.nav.no';
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
            key: { char: 'P', altKey: true },
            description: 'Vis oppgaver',
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
