import { loggError } from './logger/frontendLogger';

declare global {
    interface Window {
        hj?: (command: string, ...args: any[]) => void;
    }
}

export enum HotjarTriggers {
    BRUKSMONSTER = 'modia-hotjar-bruksmonster'
}

function requireHotjar(cmd: string, ...args: any[]) {
    if (!window.hj) {
        loggError(new Error('Prøvde å kalle hotjar kommando før hotjar var lastet: ' + cmd));
    } else {
        window.hj(cmd, ...args);
    }
}

export function formSubmitSuccess() {
    requireHotjar('formSubmitSuccessful');
}

export function formSubmitFailed() {
    requireHotjar('formSubmitFailed');
}

export function stateChange(relativePath: string) {
    requireHotjar('stateChange', relativePath);
}

export function tagRecording(tags: string[]) {
    requireHotjar('tagRecording', tags);
}

export function trigger(event: HotjarTriggers): void {
    requireHotjar('trigger', event);
}

export function virtualPageView(funnel: string) {
    requireHotjar('vpv', funnel);
}
