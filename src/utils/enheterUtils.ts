import { useAppState } from './customHooks';

export function erKontaktsenter(enhet: string): boolean {
    return enhet.slice(0, 2) === '41';
}

export function useErKontaktsenter(): boolean {
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);
    if (!valgtEnhet) {
        return false;
    }
    return erKontaktsenter(valgtEnhet);
}
