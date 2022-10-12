import { useValgtenhet } from '../context/valgtenhet-state';

export function erKontaktsenter(enhet: string): boolean {
    return enhet.slice(0, 2) === '41';
}

export function useErKontaktsenter(): boolean {
    const valgtEnhet = useValgtenhet().enhetId;
    if (!valgtEnhet) {
        return false;
    }
    return erKontaktsenter(valgtEnhet);
}
