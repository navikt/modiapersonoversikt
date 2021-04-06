export enum InfotabsType {
    OVERSIKT = 'OVERSIKT',
    OPPFOLGING = 'OPPFØLGING',
    MELDINGER = 'MELDINGER',
    UTBETALING = 'UTBETALING',
    SAKER = 'SAKER',
    YTELSER = 'YTELSER',
    VARSEL = 'VARSLER'
}

interface InfotabConfig {
    tittel: string;
    path: string;
}
interface Infotabs {
    [key: string]: InfotabConfig;
}

export const INFOTABS: Infotabs = {
    OVERSIKT: { tittel: 'Oversikt', path: 'oversikt' },
    OPPFOLGING: { tittel: 'Oppfølging', path: 'oppfolging' },
    MELDINGER: { tittel: 'Meldinger', path: 'meldinger' },
    UTBETALING: { tittel: 'Utbetaling', path: 'utbetaling' },
    SAKER: { tittel: 'Saker', path: 'saker' },
    YTELSER: { tittel: 'Ytelser', path: 'ytelser' },
    VARSLER: { tittel: 'Varsler', path: 'varsler' }
};
