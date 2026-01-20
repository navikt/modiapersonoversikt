import { useMemo } from 'react';
import { errorPlaceholder, responseErrorMessage } from 'src/components/ytelser/utils';
import type {
    Gjeldende14aVedtak,
    OppfolgingDto,
    UtvidetOppfolgingDto,
    Veileder
} from 'src/generated/modiapersonoversikt-api';
import { useGjeldende14aVedtak, useYtelserogkontrakter } from 'src/lib/clients/modiapersonoversikt-api';

interface Returns14aVedtak {
    gjeldende14aVedtak?: Gjeldende14aVedtak;
    pending: boolean;
    errorMessages: (string | undefined)[];
    hasError: boolean;
}

interface ReturnsOppfolging {
    utvidetOppfolging?: UtvidetOppfolgingDto;
    pending: boolean;
    errorMessages: (string | undefined)[];
    hasError: boolean;
}

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

export const use14aVedtak = (): Returns14aVedtak => {
    const gjeldende14aVedtakResponse = useGjeldende14aVedtak();

    return useMemo(() => {
        const gjeldende14aVedtak = gjeldende14aVedtakResponse?.data?.gjeldende14aVedtak;

        const errorMessages = [errorPlaceholder(gjeldende14aVedtakResponse, responseErrorMessage('14a vedtak'))];

        return {
            gjeldende14aVedtak: gjeldende14aVedtak,
            pending: gjeldende14aVedtakResponse.isLoading,
            errorMessages: errorMessages.filter(Boolean),
            hasError: gjeldende14aVedtakResponse.isError
        };
    }, [gjeldende14aVedtakResponse]);
};

export const useOppfolging = (): ReturnsOppfolging => {
    const oppfolgingResponse = useYtelserogkontrakter();

    return useMemo(() => {
        const oppfolging = oppfolgingResponse?.data;

        const errorMessages = [errorPlaceholder(oppfolgingResponse, responseErrorMessage('oppfølging'))];

        return {
            utvidetOppfolging: oppfolging,
            pending: oppfolgingResponse.isLoading,
            errorMessages: errorMessages.filter(Boolean),
            hasError: oppfolgingResponse.isError
        };
    }, [oppfolgingResponse]);
};
