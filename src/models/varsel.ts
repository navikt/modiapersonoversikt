import type { Varsel } from 'src/lib/types/modiapersonoversikt-api';

export interface VarslerResult {
    feil: string[];
    varsler: Varsel[];
}

export interface Varselmelding {
    kanal: Kanal;
    innhold: string;
    mottakerInformasjon: null | string;
    utsendingsTidspunkt: string;
    feilbeskrivelse: string;
    epostemne: null | string;
    url: null | string;
    erRevarsel: boolean;
}

export enum Kanal {
    EPOST = 'EPOST',
    NAVNO = 'NAV.NO',
    SMS = 'SMS'
}

export enum Varseltype {
    'tilbakemelding.EPOST' = 'Epost = ',
    'tilbakemelding.NAV.NO' = 'Sendt til Ditt Nav',
    'tilbakemelding.SMS' = 'Tlf. = ',
    '1.GangVarselBrevPensj' = 'Brev fra pensjon',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    '2.GangVarselBrevPensj' = 'Brev fra pensjon',
    DOKUMENT = 'Dokument',
    DittNAV_000001 = 'Dokument - Møteinnkalling',
    DittNAV_000002 = 'Dokument - Brev',
    DittNAV_000003 = 'Dokument - Saksbehandlingstid',
    DittNAV_000004 = 'Dokument - Vedtaksbrev',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    DittNAV_000005 = 'Dokument - Vedtaksbrev',
    DittNAV_000007 = 'Aktivitetsplan - Nye henvendelser',
    DittNAV_000008 = 'Aktivitetsplan - Oppgave',
    DittNAV_000010 = 'Dokument - Årsoppgave',
    DittNAV_000011 = 'Dokument - Endringsoppgave',
    DittNAV_000001_temp = 'Innkalling til møte med Nav',
    EessiPenVarsleBrukerUfore = 'EØS- Opplysninger',
    ForeldrepengerSoknadsvarsel = 'Foreldrepengesøknad',
    GodkjentAMO = 'Aktivitetsplan - Godkjent AMO',
    Gruppeaktivitet = 'Gruppeaktivitet',
    AktivitetsplanMoteVarsel = 'Aktivitetsplan - Møte',
    IkkeLevMeldekortNO = 'Påminnelse om å sende meldekort',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    IkkeLevMeldekortNY = 'Påminnelse om å sende meldekort',
    IkkeMeldtSegFristNO = 'Informasjon om for sen melding uten inaktivering',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    IkkeMeldtSegFristNY = 'Informasjon om for sen melding uten inaktivering',
    IndividuellSamtale = 'Individuellsamtale',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    KRR_NyeDigitaleBrukere = 'Brev fra pensjon',
    MOTE = 'Møte',
    PermitteringSnartOppbrukt = 'Dagpenger under permittering',
    RettTil4UkerFerie = 'Rett til Dagpenger under ferie',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    RettTil4UkerFerieKonvertertInn = 'Rett til Dagpenger under ferie',
    RettTil4UkerFerieOppbrukt = 'Opphør av dagpenger under ferie',
    SPORSMAL = 'Spørsmål',
    SVAR = 'Svar',
    INFOMELDING = 'Infomelding',
    SyfoAktivitetskrav = 'Informasjon om aktivitetsplikt',
    SyfoMoteAvbrutt = 'Dialogmøte er avbrutt',
    SyfoMoteNyeTidspunkt = 'Dialogmøte nye tidspunkt foreslått',
    SyfoMotebekreftelse = 'Møtebekreftelse',
    SyfoMoteforesporsel = 'Dialogmøte',
    SyfoOppgave = 'Sykmelding',
    SyfoSykepengesoknad = 'Sykepengesøknad',
    NyttSykepengevedtak = 'Nytt sykepengevedtak',
    UR_StoppPrint = 'Utbetalingsmelding',
    NySykmelding = 'Ny sykmelding',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    NySykmeldingUtenLenke = 'Ny sykmelding',
    SyfoplanOpprettetSyk = 'Oppfølgingsplan påbegynt av leder',
    SyfoplangodkjenningSyk = 'Oppfølgingsplan venter godkjenning',
    SyfoSvarMotebehov = 'Avventer svar om behov for dialogmøte',
    SyfoplanRevideringSyk = 'Venter på revidering fra bruker',
    SyfoMerVeiledning = 'Snart slutt på sykepenger',
    PAM_KONV01 = 'Ny og forbedret CV-løsning',
    PAM_SYNLIGHET_01 = 'Informasjon om CV på Ditt Nav',
    SyfomoteNyetidspunkt = 'Forespørsel om nye tidspunkt for møte',
    NaermesteLederMoteAvbrutt = 'Møteforespørsel avbrutt',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    SyfoMoteForesporsel = 'Dialogmøte'
}
