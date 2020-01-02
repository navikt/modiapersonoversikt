export interface Varsel {
    varselType: string;
    mottattTidspunkt: string;
    erRevarsling: boolean;
    meldingListe: Varselmelding[];
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
    'tilbakemelding.NAV.NO' = 'Sendt til Ditt NAV',
    'tilbakemelding.SMS' = 'Tlf. = ',
    '1.GangVarselBrevPensj' = 'Brev fra pensjon',
    '2.GangVarselBrevPensj' = 'Brev fra pensjon',
    'DOKUMENT' = 'Dokument',
    'DittNAV_000001' = 'Dokument - Møteinnkalling',
    'DittNAV_000002' = 'Dokument - Brev',
    'DittNAV_000003' = 'Dokument - Saksbehandlingstid',
    'DittNAV_000004' = 'Dokument - Vedtaksbrev',
    'DittNAV_000005' = 'Dokument - Vedtaksbrev',
    'DittNAV_000007' = 'Aktivitetsplan - Nye henvendelser',
    'DittNAV_000008' = 'Aktivitetsplan - Oppgave',
    'DittNAV_000010' = 'Dokument - Årsoppgave',
    'DittNAV_000011' = 'Dokument - Endringsoppgave',
    'EessiPenVarsleBrukerUfore' = 'EØS- Opplysninger',
    'ForeldrepengerSoknadsvarsel' = 'Foreldrepengesøknad',
    'GodkjentAMO' = 'Aktivitetsplan - Godkjent AMO',
    'Gruppeaktivitet' = 'Gruppeaktivitet',
    'IkkeLevMeldekortNO' = 'Påminnelse om å sende meldekort',
    'IkkeLevMeldekortNY' = 'Påminnelse om å sende meldekort',
    'IkkeMeldtSegFristNO' = 'Informasjon om for sen melding uten inaktivering',
    'IkkeMeldtSegFristNY' = 'Informasjon om for sen melding uten inaktivering',
    'IndividuellSamtale' = 'Individuellsamtale',
    'KRR_NyeDigitaleBrukere' = 'Brev fra pensjon',
    'MOTE' = 'Møte',
    'PermitteringSnartOppbrukt' = 'Dagpenger under permittering',
    'RettTil4UkerFerie' = 'Rett til Dagpenger under ferie',
    'RettTil4UkerFerieKonvertertInn' = 'Rett til Dagpenger under ferie',
    'RettTil4UkerFerieOppbrukt' = 'Opphør av dagpenger under ferie',
    'SPORSMAL' = 'Spørsmål',
    'SVAR' = 'Svar',
    'SyfoAktivitetskrav' = 'Sykmelding',
    'SyfoMoteAvbrutt' = 'Dialogmøte er avbrutt',
    'SyfoMoteNyeTidspunkt' = 'Dialogmøte nye tidspunkt foreslått',
    'SyfoMotebekreftelse' = 'Møtebekreftelse',
    'SyfoMoteforesporsel' = 'Dialogmøte',
    'SyfoOppgave' = 'Sykmelding',
    'SyfoSykepengesoknad' = 'Sykepengesøknad',
    'UR_StoppPrint' = 'Utbetalingsmelding',
    'NySykmelding' = 'Ny sykmelding',
    'SyfoplanOpprettetSyk' = 'Oppfølgingsplan påbegynt av leder',
    'SyfoplangodkjenningSyk' = 'Oppfølgingsplan venter godkjenning',
    'SyfoSvarMotebehov' = 'Avventer svar om behov for dialogmøte'
}
