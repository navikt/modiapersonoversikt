import { errorPlaceholder, type QueryResult, responseErrorMessage } from 'src/components/ytelser/utils';
import type {
    Gjeldende14aVedtakResponse,
    OppfolgingDto,
    UtvidetOppfolgingDto,
    Veileder
} from 'src/generated/modiapersonoversikt-api';
import { useGjeldende14aVedtak, useYtelserogkontrakter } from 'src/lib/clients/modiapersonoversikt-api';

export function getOppfolgingEnhet(oppfolging?: OppfolgingDto): string {
    return oppfolging
        ? oppfolging.enhet
            ? `${oppfolging.enhet.enhetId} ${oppfolging.enhet.navn}`
            : 'Ikke angitt'
        : '-';
}

export function getVeileder(veileder?: Veileder): string {
    return veileder ? `${veileder.navn} (${veileder.ident})` : '-';
}

export function getMeldeplikt(meldeplikt?: boolean): string {
    return meldeplikt ? 'Ja' : meldeplikt === false ? 'Nei' : 'Meldeplikt Ukjent';
}

export const use14aVedtak = (): QueryResult<Gjeldende14aVedtakResponse> => {
    const gjeldende14aVedtakResponse = useGjeldende14aVedtak();
    const errorMessages = [errorPlaceholder(gjeldende14aVedtakResponse, responseErrorMessage('14a vedtak'))];
    return {
        ...gjeldende14aVedtakResponse,
        errorMessages
    } as QueryResult<Gjeldende14aVedtakResponse>;
};

export const useOppfolging = (): QueryResult<UtvidetOppfolgingDto> => {
    const oppfolgingResponse = useYtelserogkontrakter();
    const errorMessages = [errorPlaceholder(oppfolgingResponse, responseErrorMessage('oppfølging'))];
    return {
        ...oppfolgingResponse,
        errorMessages
    } as QueryResult<UtvidetOppfolgingDto>;
};
