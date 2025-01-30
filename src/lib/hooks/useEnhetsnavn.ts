import { useEnheter } from 'src/lib/clients/modiapersonoversikt-api';

export const useEnhetsnavn = (enhetId?: string) => {
    const enheter = useEnheter().data?.enhetliste ?? [];
    return enheter.find((enhet) => enhet.id === enhetId)?.navn ?? 'Ukjent enhet';
};
