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
    'varsel.kanal.EPOST' = 'EPOST',
    'varsel.kanal.NAV.NO' = 'NAV.NO',
    'varsel.kanal.SMS' = 'SMS',
    'varsel.ledetekst.header.dato' = 'Dato',
    'varsel.ledetekst.header.kanal' = 'Sendt i kanal',
    'varsel.ledetekst.header.type' = 'Type',
    'varsel.ledetekst.rad.datoformat' = 'DD. MMM YYYY',
    'varsel.tilbakemelding.EPOST' = 'Epost = ',
    'varsel.tilbakemelding.NAV.NO' = 'Sendt til Ditt NAV',
    'varsel.tilbakemelding.SMS' = 'Tlf. = ',
    'varsel.varseltype.1.GangVarselBrevPensj' = 'Brev fra pensjon',
    'varsel.varseltype.2.GangVarselBrevPensj' = 'Brev fra pensjon',
    'varsel.varseltype.DOKUMENT' = 'Dokument',
    'varsel.varseltype.DittNAV_000001' = 'Dokument - Møteinnkalling',
    'varsel.varseltype.DittNAV_000002' = 'Dokument - Brev',
    'varsel.varseltype.DittNAV_000003' = 'Dokument - Saksbehandlingstid',
    'varsel.varseltype.DittNAV_000004' = 'Dokument - Vedtaksbrev',
    'varsel.varseltype.DittNAV_000005' = 'Dokument - Vedtaksbrev',
    'varsel.varseltype.DittNAV_000007' = 'Aktivitetsplan - Nye henvendelser',
    'varsel.varseltype.DittNAV_000008' = 'Aktivitetsplan - Oppgave',
    'varsel.varseltype.DittNAV_000010' = 'Dokument - Årsoppgave',
    'varsel.varseltype.DittNAV_000011' = 'Dokument - Endringsoppgave',
    'varsel.varseltype.EessiPenVarsleBrukerUfore' = 'EØS- Opplysninger',
    'varsel.varseltype.ForeldrepengerSoknadsvarsel' = 'Foreldrepengesøknad',
    'varsel.varseltype.GodkjentAMO' = 'Aktivitetsplan - Godkjent AMO',
    'varsel.varseltype.Gruppeaktivitet' = 'Gruppeaktivitet',
    'varsel.varseltype.IkkeLevMeldekortNO' = 'Påminnelse om å sende meldekort',
    'varsel.varseltype.IkkeLevMeldekortNY' = 'Påminnelse om å sende meldekort',
    'varsel.varseltype.IkkeMeldtSegFristNO' = 'Informasjon om for sen melding uten inaktivering',
    'varsel.varseltype.IkkeMeldtSegFristNY' = 'Informasjon om for sen melding uten inaktivering',
    'varsel.varseltype.IndividuellSamtale' = 'Individuellsamtale',
    'varsel.varseltype.KRR_NyeDigitaleBrukere' = 'Brev fra pensjon',
    'varsel.varseltype.MOTE' = 'Møte',
    'varsel.varseltype.PermitteringSnartOppbrukt' = 'Dagpenger under permittering',
    'varsel.varseltype.RettTil4UkerFerie' = 'Rett til Dagpenger under ferie',
    'varsel.varseltype.RettTil4UkerFerieKonvertertInn' = 'Rett til Dagpenger under ferie',
    'varsel.varseltype.RettTil4UkerFerieOppbrukt' = 'Opphør av dagpenger under ferie',
    'varsel.varseltype.SPORSMAL' = 'Spørsmål',
    'varsel.varseltype.SVAR' = 'Svar',
    'varsel.varseltype.SyfoAktivitetskrav' = 'Sykmelding',
    'varsel.varseltype.SyfoMoteAvbrutt' = 'Dialogmøte er avbrutt',
    'varsel.varseltype.SyfoMoteNyeTidspunkt' = 'Dialogmøte nye tidspunkt foreslått',
    'varsel.varseltype.SyfoMotebekreftelse' = 'Møtebekreftelse',
    'varsel.varseltype.SyfoMoteforesporsel' = 'Dialogmøte',
    'varsel.varseltype.SyfoOppgave' = 'Sykmelding',
    'varsel.varseltype.SyfoSykepengesoknad' = 'Sykepengesøknad',
    'varsel.varseltype.UR_StoppPrint' = 'Utbetalingsmelding',
    'varsel.varseltype.nysykemelding' = '<span>Ny sykemelding</span>',
    'varsler.epostemne' = 'Emne:',
    'varsler.oversikt.lenke' = 'Vis brukers varslinger',
    'varsler.oversikt.lenke.feil.uthenting' = 'Feil ved uthenting av varsler',
    'varsler.oversikt.lenke.ingen.varsler' = 'Brukeren har ingen varslinger',
    'varsler.oversikt.lenke.nye.varsler' = 'Vis brukers varslinger (%d)',
    'varsler.revarsling' = 'Revarsling',
    'varsling.lerret.feilmelding.ingenvarsler' = 'Det finnes ingen varsler for brukeren'
}
