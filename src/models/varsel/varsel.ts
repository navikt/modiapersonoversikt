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
    IkkeLevMeldekortNO = 'Påminnelse om å sende meldekort',
    IkkeLevMeldekortNY = 'Påminnelse om å sende meldekort',
    SyfoOppgave = 'Sykemelding',
    DittNAV_000001_temp = 'Dokument - Møteinnkalling',
    IkkeMeldtSegFristNO = 'Informasjon om for sen melding uten inaktivering',
    IkkeMeldtSegFristNY = 'Informasjon om for sen melding uten inaktivering'
}
