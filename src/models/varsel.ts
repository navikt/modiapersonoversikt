export interface VarselResponse {
    data: Varsel[];
}

export interface Varsel {
    varselType: string;
    mottattTidspunkt: string;
    erRevarsling: boolean;
    meldingListe: Varselmelding[];
}

export interface Varselmelding {
    kanal: string;
    innhold: string;
    mottakerInformasjon: string;
    utsendingsTidspunkt: string;
    feilbeskrivelse: string;
    epostemne: string;
    url: string;
    erRevarsel: boolean;
}

export enum Varseltype {
    'IkkeLevMeldekortNO' = 'Påminnelse om å sende meldekort',
    'IkkeLevMeldekortNY' = 'Påminnelse om å sende meldekort',
    'SyfoOppgave' = 'Sykemelding',
    'DittNAV_000001_temp' = 'Dokument - Møteinnkalling',
    'IkkeMeldtSegFristNO' = 'Informasjon om for sen melding uten inaktivering',
    'IkkeMeldtSegFristNY' = 'Informasjon om for sen melding uten inaktivering',
    'DittNAV_000002_temp' = 'Dokument - Møteinnkalling',
    'IndividuellSamtale' = 'Individuellsamtale',
    'EessiPenVarsleBrukerUfore' = 'EØS-Opplysninger',
    'SVAR' = 'Svar',
    'Gruppeaktivitet' = 'Gruppeaktivitet',
    'SPORSMAL' = 'Spørsmål',
    'RettTil4UkerFerieKonvertertInn' = 'Rett til Dagpenger under ferie',
    'SyfoMoteforesporsel' = 'Dialogmøte',
    '1.GangVarselBrevPensj' = 'Brev fra pensjon',
    'RettTil4UkerFerieOppbrukt' = 'Opphør av dagpenger under ferie',
    'KRR_NyeDigitaleBrukere' = 'Brev fra pensjon',
    'GodkjentAMO' = 'Aktivitetsplan - Godkjent AMO',
    'SyfoMoteNyeTidspunkt' = 'Dialogmøte nye tidspunkt foreslått',
    'PermitteringSnartOppbrukt' = 'Dagpenger under permittering',
    '2.GangVarselBrevPensj' = 'Brev fra pensjon',
    'DittNAV_000008' = 'Aktivitetsplan - Oppgave',
    'DittNAV_000007' = 'Aktivitetsplan - Nye henvendelser',
    'DittNAV_000006' = 'Aktivitetsplan_ikke_godkjent_brukervilkarene',
    'DittNAV_000005' = 'Dokument - Vedtaksbrev',
    'DittNAV_000004' = 'Dokument - Vedtaksbrev',
    'DittNAV_000003' = 'Dokument - Saksbehandlingstid',
    'DittNAV_000002' = 'Dokument - Møteinnkalling',
    'DittNAV_000001' = 'Dokument - Møteinnkalling',
    'SyfoMotebekreftelse' = 'Møtebekreftelse',
    'ForeldrepengerSoknadsvarsel' = 'Foreldrepengesøknad',
    'DittNAV_000011' = 'Dokument - Endringsoppgave',
    'DittNAV_000010' = 'Dokument - Årsoppgave',
    'MOTE' = 'Møte',
    'UR_StoppPrint' = 'Utbetalingsmelding',
    'RettTil4UkerFerie' = 'Rett til Dagpenger under ferie',
    'SyfoAktivitetskrav' = 'Sykmelding',
    'SyfoMoteAvbrutt' = 'Dialogmøte er avbrutt',
    'SyfoSykepengesoknad' = 'Sykepengesøknad',
    'DOKUMENT' = 'Dokument'
}
