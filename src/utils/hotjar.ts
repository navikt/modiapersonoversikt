import { loggError } from './logger/frontendLogger';

declare global {
    interface Window {
        // eslint-disable-next-line
        hj?: (command: string, ...args: any[]) => void;
    }
}

export enum HotjarTriggers {
    BRUKSMONSTER = 'modia-hotjar-bruksmonster'
}

// eslint-disable-next-line
function requireHotjar(cmd: string, ...args: any[]) {
    if (!window.hj) {
        loggError(new Error('Prøvde å kalle hotjar kommando før hotjar var lastet: ' + cmd));
    } else {
        // eslint-disable-next-line
        window.hj(cmd, ...args);
    }
}

class Hotjar {
    static formSubmitSuccess() {
        requireHotjar('formSubmitSuccessful');
    }

    static formSubmitFailed() {
        requireHotjar('formSubmitFailed');
    }

    static stateChange(relativePath: string) {
        requireHotjar('stateChange', relativePath);
    }

    static tagRecording(tags: string[]) {
        requireHotjar('tagRecording', tags);
    }

    static trigger(event: HotjarTriggers): void {
        requireHotjar('trigger', event);
    }

    static virtualPageView(funnel: string) {
        requireHotjar('vpv', funnel);
    }
}

export default Hotjar;
