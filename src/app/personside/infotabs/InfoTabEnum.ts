export enum InfotabsType {
    OVERSIKT = 'OVERSIKT',
    OPPFOLGING = 'OPPFOLGING',
    MELDINGER = 'MELDINGER',
    UTBETALING = 'UTBETALING',
    SAKER = 'SAKER',
    YTELSER = 'YTELSER',
    VARSLER = 'VARSLER'
}

export interface InfotabConfig {
    tittel: string;
    path: string;
}

export const INFOTABS = {
    OVERSIKT: { tittel: 'Oversikt', path: 'oversikt' },
    OPPFOLGING: { tittel: 'Oppfølging', path: 'oppfolging' },
    MELDINGER: { tittel: 'Kommunikasjon', path: 'meldinger' },
    UTBETALING: { tittel: 'Utbetaling', path: 'utbetaling' },
    SAKER: { tittel: 'Saker', path: 'saker' },
    YTELSER: { tittel: 'Ytelser', path: 'ytelser' },
    VARSLER: { tittel: 'Varsler', path: 'varsler' }
} as const;
