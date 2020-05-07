import { loggEvent } from '../frontendLogger';
import { detect } from 'detect-browser';
import { runOnceDaily } from '../../runOnceDaily';
import { useAppState, useOnMount } from '../../customHooks';

export function useLoggSkjermInfoDaglig() {
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);
    useOnMount(() => {
        runOnceDaily('Skjerminfo', () => loggInfo(valgtEnhet || ''));
    });
}

function loggInfo(enhet: string) {
    const browser = detect();

    const tags = {
        browser: (browser && browser.name) || undefined
    };

    const fields = {
        enhet: enhet
    };

    loggEvent('LoggSkjerminfo', 'Maskinvare', tags, fields);
}
