const standardTeksterMock = {
    'b4b67323-f57d-47a2-ac19-7ba4b62fe156': {
        id: 'b4b67323-f57d-47a2-ac19-7ba4b62fe156',
        overskrift: 'Signatur',
        tags: ['signatur', ''],
        innhold: {
            nb_NO: 'Med vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n',
            nn_NO: 'Med venleg helsing\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n',
            en_US: 'Sincerely,\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 19421
    },
    'a567133b-d320-4783-ae68-99d157ca623a': {
        id: 'a567133b-d320-4783-ae68-99d157ca623a',
        overskrift: 'Arena ytelser - frivillig skattetrekk',
        tags: ['NØS', 'Abetal', 'frivillig', 'skattetrekk'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nVi har nå registrert frivillig skattetrekk på kroner xxxx per måned.\nTrekket vil reduseres hvis du får utbetalt færre enn 10 dager per meldekort. Årsaken er at trekket registreres med en dagsats, som ganges med antall dager per meldekort.\n\nØnsker du å endre skattekortet, kan du gjøre det på skatteetaten.no, og be oss om å stoppe det frivillige skattetrekket.\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad',
            en_US: 'Hi\n\nWe have registered an optional tax withholding amount for you, at NOK xxxx per month.\nThis withholding will be reduced if your payment is based on less than 10 days per work  registration card. The reason for this is that your withholding is registered at a daily rate, which is multiplied by the number of days per work registration card.\n\nIf you want to change your tax card, you may do so at skatteetaten.no, and then you can ask us to cancel the optional tax withholding.\n\nYours sincerely,\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 60
    },
    '917754bd-6f7b-409c-8cde-58de76137a97': {
        id: '917754bd-6f7b-409c-8cde-58de76137a97',
        overskrift: 'Du må oppdatere utbetalingsopplysningene dine',
        tags: ['nøs', 'kontonummer', 'retur'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nHar du glemt å oppdatere bankkontonummeret ditt hos NAV?\n\nVi har forsøkt å utbetale penger til deg, men vi mangler korrekt kontonummer.\n\nDu kan endre kontonummer på nav.no. \n\nVi vil utbetale pengene til deg når du har registrert nytt kontonummer.\n\nMed vennlig hilsen\nNAV Økonomi stønad',
            en_US: 'Hi!\n\nDid you forget to update your account number?\n\nWe have attempted to make a payment to you, but your correct account number is missing.\n\nYou can change your account number at nav.no.  \n\nWe will make the payment to you when you have registered your new account number.\n\nKind regards,\nNAV Økonomi stønad'
        },
        vekttall: 45
    },
    '7bc33405-9228-4fa9-9f29-e2a3bb03390a': {
        id: '7bc33405-9228-4fa9-9f29-e2a3bb03390a',
        overskrift: 'Endring av skattetrekket fra tabell til prosenttrekk',
        tags: ['NØS', 'prosent', 'skatt'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nSkattetrekket ditt er endret til prosenttrekk, xx prosent.\n\nDersom du endrer skattekortet ditt på skatteetaten.no og du får utskrevet et nytt tabellkort, må du gi oss beskjed på nytt om du ønsker å trekkes etter prosentdelen av skattekortet.\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad',
            en_US: 'Hi\n\nYour tax withholding scheme has been changed and is now percentage-based, at xx percent.\n\nIf you change your tax card at skatteetaten.no and are assigned a new table-based tax withholding scheme, you must notify us again if you want your tax withholding to be percentage-based.\n\nYours sincerely,\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 35
    },
    '597de919-b4d2-486c-8e43-8296fb4b3cb8': {
        id: '597de919-b4d2-486c-8e43-8296fb4b3cb8',
        overskrift: 'Tilbakebetaling av skatt',
        tags: ['nøs', 'skatt', 'tilbakebetaling'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nJeg har nå korrigert skattetrekket ditt for periode og du vil få tilbakebetalt xxxx kroner i løpet av få dager.\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad',
            en_US: 'Hi\n\nI have corrected your tax withholding for the period dd/mm/yyyy, and you will be receive a reimbursement in the amount of NOK xxxx in a few days.\n\nYours sincerely,\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 24
    },
    'a61d8a35-7d00-443f-b627-26965d39f0a6': {
        id: 'a61d8a35-7d00-443f-b627-26965d39f0a6',
        overskrift: 'Mottatt endringsmelding trekk',
        tags: ['#nøs', '#trekk', '#endringsmelding', '#kreditor'],
        innhold: {
            nb_NO: 'Hei [bruker.navn]\n\nVi har mottatt endringsmelding på ditt utleggstrekk.  Vi har nå tilbakebetalt Beløp kroner som ble trukket i MND. \n\nPengene vil være på kontoen din om 1-2 virkedager.\n\nMed vennlig hilsen\nNAV Økonomi stønad'
        },
        vekttall: 14
    },
    '7c531b43-3037-4741-95e4-bc1702fcc75b': {
        id: '7c531b43-3037-4741-95e4-bc1702fcc75b',
        overskrift: 'Overføring av beløp fra betalingskort til bankkonto',
        tags: ['NØS', 'BAX', 'kontonummer', ''],
        innhold: {
            nb_NO: 'Hei\n\nGjenstående saldo på ditt betalingskort vil bli overført til din bankkonto i løpet av noen virkedager.\n \nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 11
    },
    '608d0681-4c59-4473-8012-38fc5d343740': {
        id: '608d0681-4c59-4473-8012-38fc5d343740',
        overskrift: 'Skriv til bruker, ny arbeidssøker',
        tags: ['skrivtilbruker', 'ny_arbeidssøker', 'kompetanseord'],
        innhold: {
            nb_NO: 'Hei [bruker.navn]\r\nDu er nå registrert som arbeidssøker hos NAV. For at vi i NAV skal kunne hjelpe deg på best mulig måte er det viktig at du tar i bruk aktivitetsplanen. Her kan du blant annet legge inn stillinger som du søker på og ha direkte dialog med veilederen om oppfølging som handler om arbeid. Du må også holde CV-en din oppdatert (legg inn riktige jobbønsker og kompetanseord)\r\nLes mer om Arbeidsledig – hva nå?: https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Arbeidsledig+-+hva+na\r\nJobbsøkertips:\r\nhttps://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips\r\n\r\nHva forventer NAV av deg?\r\nVi forventer at du selv aktivt forsøker å skaffe deg jobb. Du må derfor søke jobber. Dersom du ikke finner ledige stillinger innenfor det du ønsker å arbeide med, må du utvide jobbsøket ditt. Er det andre områder du kan bruke kompetansen din på? Ikke la deg begrense av geografi eller bransje.\r\n\r\nFor å lykkes med jobbjakten er det best å komme i gang raskest mulig – orienter deg i arbeidsmarkedet, benytt nettverket ditt, tenk utradisjonelt.  Lag en god CV, skriv målrettede jobbsøknader og ta kontakt med interessante arbeidsgivere. Du må også sende meldekort hver 14. dag og være tilgjengelig for kontakt med NAV. Lykke til!\r\n\r\nMed vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 9
    },
    '7cfaef91-660c-4100-a576-1ee13c3948e3': {
        id: '7cfaef91-660c-4100-a576-1ee13c3948e3',
        overskrift: 'Meldingen om utbetalingsopplysninger mangler legitimasjon ',
        tags: ['NØS', 'legitimasjon', 'utbetalingsopplysninger'],
        innhold: {
            nb_NO: 'Hei, [bruker.fornavn]\n \nNAV har mottatt melding om endring av utbetalingsopplysninger fra deg.\nVi kan ikke registrere dette før vi har mottatt kopi av gyldig legitimasjon av deg .\n\nDu kan registrere og endre kontonummer selv på nav.no\nHvis ikke, må du sende inn kopi av legitimasjon, for eksempel nasjonalt ID-kort, pass, førerkort, bankkort med bilde.\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad',
            en_US: "Hi [bruker.navn] \n\nNAV has received notification of a change in payment information from you.\n\nYou must enclose a copy of identification (for example national ID card, passport, driver's license, bank card with photo).\n\nYou can also register and change the account number and address yourself at nav.no\n\n\n\nWith best regards\n[saksbehandler.navn]\nNAV Økonomi stønad"
        },
        vekttall: 5
    },
    '2d085739-2841-430b-addb-02e0cc82bd5d': {
        id: '2d085739-2841-430b-addb-02e0cc82bd5d',
        overskrift: 'Omklassifisering/omgjøring mellom UR og Abetal for tidligere år',
        tags: ['NØS', 'Abetal/UR', 'omklassifisering', 'omgjøring', 'rapportering'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nDu har fått innvilget (ny ytelse) for en periode hvor du tidligere har fått utbetalt (tidl.ytelse). Dette vil ha betydning for skatteberegningen din. Dersom du får tilbakebetalt skatt for tidligere år, kan det være lurt å sette av disse pengene. Årsaken er at skatt på den nye ytelsene ikke blir beregnet før ved skatteoppgjøret neste år.\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 5
    },
    '07d4c2d7-0f76-4c73-bcb2-1e0f67f95d5b': {
        id: '07d4c2d7-0f76-4c73-bcb2-1e0f67f95d5b',
        overskrift: 'Medlemskap - innhente opplysninger søknad om medlemskap',
        tags: ['medlemskap'],
        innhold: {
            nb_NO: 'DU MÅ SENDE OSS FLERE OPPLYSNINGER\nVi trenger flere opplysninger fra deg for å kunne behandle søknaden din om medlemskap i folketrygden, som vi mottok DATO. \n\nDu må sende oss/svare på følgende: \n- FRITEKST\n\nDu kan sende oss opplysninger eller stille oss spørsmål ved å svare på denne meldingen. \n\nHar du har spørsmål, kan du også ringe oss på +47 21 07 37 00. Hvis du oppgir fødselsnummeret ditt når du tar kontakt med NAV, kan vi lettere gi deg rask og god hjelp. \n\nSLIK ETTERSENDER DU DOKUMENTER \nFor å ettersende dokumenter til søknaden din, må du følge veiledningen for ettersending av vedlegg på nav.no. Velg søknadsskjemaet du vil ettersende til og følg instruksjonene videre.  \n\nVennlig hilsen\n[saksbehandler.navn]\nNAV Medlemskap og avgift'
        },
        vekttall: 4
    },
    '541f3206-ff6f-4d02-b027-09190c52cef0': {
        id: '541f3206-ff6f-4d02-b027-09190c52cef0',
        overskrift: 'Signatur NØS',
        tags: ['NØS', 'signatur'],
        innhold: {
            nb_NO: 'Med vennlig hilsen\r\n[saksbehandler.navn]\r\nNAV Økonomi stønad'
        },
        vekttall: 4
    },
    '2e354a37-55d5-4e42-bdff-1c518e39ca50': {
        id: '2e354a37-55d5-4e42-bdff-1c518e39ca50',
        overskrift: 'Ønsker kontakt med saksbehandler',
        tags: ['kontakt', 'saksbehandler'],
        innhold: {
            nb_NO: '[bruker.navn] ønsker kontakt med saksbehandleren sin angående (TEKST). Jeg har gitt beskjed til saksbehandleren og opplyst om at svar kan ventes innen to virkedager.'
        },
        vekttall: 3
    },
    'bd5c3af1-a762-4f71-aa19-67f1e38f66df': {
        id: 'bd5c3af1-a762-4f71-aa19-67f1e38f66df',
        overskrift: 'Etterlyser sykepenger - midlertidig stanset',
        tags: ['sykepenger', 'stans', 'aktivitet'],
        innhold: {
            nb_NO: '[bruker.navn] etterlyser sykepenger for perioden (FRADATO-TILDATO). Jeg har opplyst om at sykepengene er midlertidig stanset på grunn av manglende aktivitet, og at hovedregelen for sykepenger ut over 8 uker, er at man deltar i arbeidsrelatert aktivitet. For de som har et arbeid, vil arbeidsrelatert aktivitet være å delta i eget ellet annet arbeid på arbeidsplassen,  helt eller delvis. Aktivitetskravet gjelder for alle sykmeldte, både de med og de uten arbeidsgiver. Hvis du ikke har en arbeidsgiver, er det NAV-kontoret ditt som skal følge deg opp.'
        },
        vekttall: 2
    },
    'b072525d-72aa-433a-99aa-84592ec83d87': {
        id: 'b072525d-72aa-433a-99aa-84592ec83d87',
        overskrift: 'Registrere seg som arbeidssøker',
        tags: ['veiledning', 'jobbsøkertips'],
        innhold: {
            nb_NO: '[bruker.navn] har fått bistand til å registrere seg som arbeidssøker. Jeg har opplyst om at det er viktig å gå gjennom disse punktene:\r\n\r\n- Les Arbeidsledig - hva nå? https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Arbeidsledig+-+hva+na\r\n\r\n- Det er viktig å registrere en god CV på nav.no, og husk å legge inn gode kompetanseord.\r\n- Les: Slik lager du en god CV https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips/Slik+lager+du+en+god+CV\r\n\r\n- Gå gjennom Jobbsøkertips https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips/Slik+lager+du+en+god+CV\r\n\r\nFor mer informasjon, se www.nav.no eller kontakt NAV på telefon 55 55 33 33\r\n\r\n'
        },
        vekttall: 2
    },
    '2a4f03ec-a3b6-4509-9021-628bd0a9505e': {
        id: '2a4f03ec-a3b6-4509-9021-628bd0a9505e',
        overskrift: 'Adresseendring',
        tags: ['adresse', 'adresseendring', 'folkeregisteret', 'NØP'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\n\r\nNAV benytter den adressen som til enhver tid er registrert i Folkeregisteret. Du kan endre adressen selv på www.skatteetaten.no.'
        },
        vekttall: 1
    },
    'bff3375d-fac4-460c-a44e-70c1c4238f67': {
        id: 'bff3375d-fac4-460c-a44e-70c1c4238f67',
        overskrift: 'Etterlyser sykepenger for periode-mangler dokumentasjon',
        tags: ['sykepenger', 'dokumentasjon', 'etterlyser'],
        innhold: {
            nb_NO: '[bruker.navn] etterlyser sykepenger for perioden FRADATO-TILDATO. Jeg har informert om at NAV mangler DOKUMENTASJON som er nødvendig for at sykepengene skal bli utbetalt. Jeg har bedt om at DOKUMENTASJON leveres så fort som mulig.',
            nn_NO: '[bruker.navn] etterspør sjukepengar for perioden FRÅDATO-TILDATO. Eg har informert om at NAV manglar DOKUMENTASJON som er naudsynt for at sjukepengane skal bli utbetalt. Eg har bedt om at DOKUMENTASJON leverast snarast mogleg.'
        },
        vekttall: 1
    },
    '29543898-1fe0-448a-b226-973afaa2fe8d': {
        id: '29543898-1fe0-448a-b226-973afaa2fe8d',
        overskrift: 'Levert søknad',
        tags: ['søknad', 'levering', 'levert_søknad', 'oppmøte'],
        innhold: {
            nb_NO: '[bruker.navn] har levert søknad om (YTELSE). NAV har mottatt søknaden og sender den videre til behandling. Jeg har opplyst om at behandlingstiden er på (ANTALL) uker og at det er mulig å følge med på Ditt NAV for status framover.'
        },
        vekttall: 1
    },
    'f3cab774-a286-413a-b036-2e699513369a': {
        id: 'f3cab774-a286-413a-b036-2e699513369a',
        overskrift: 'Privat bidragsavtale',
        tags: ['bidrag', 'beregning', 'privat_avtale'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nPrivat oppgjør eller privat avtale betyr at bidragsmottageren og den bidragspliktige selv blir enige om størrelsen på bidraget og hvordan dette gjøres opp dere imellom. På nav.no kan dere lese mer om privat avtale, og bruke bidragskalkulatoren dersom dere ønsker hjelp til å fastsette beløpet.\r\n'
        },
        vekttall: 1
    },
    '75556aa5-3a6f-49dd-be49-344dc3bee253': {
        id: '75556aa5-3a6f-49dd-be49-344dc3bee253',
        overskrift: 'Skattekort mangler',
        tags: ['NØS', 'Skattekort', '50%', ''],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nDu mangler skattekort.\n\nDu må bestille skattekort på https://www.skatteetaten.no/person/skatt/skattekort/bestille-endre/. \n\nHvis du ikke har skattekort og får utbetalinger fra NAV, vil vi trekke 50 prosent skatt inntil vi har mottatt skattekortet ditt.  \n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad',
            en_US: 'Hi \n\nYou do not have a tax card.\n\nYou must request a tax card at https://www.skatteetaten.no/en/person/taxes/tax-deduction-card-and-advance-tax/order-a-tax-deduction-card/\n\nIf you do not have a tax card and you are receiving payments from NAV, we will withhold 50 percent tax until we have received your tax card.\n\nYours sincerely,\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 1
    },
    '39430824-3240-4886-898e-ba7890f2e92e': {
        id: '39430824-3240-4886-898e-ba7890f2e92e',
        overskrift: 'Skattetrekk etterbetaling tidligere år',
        tags: ['NØS', '44%', 'etterbetalingtidligereår'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nDu har spørsmål om skattetrekket på etterbetaling av YTELSE for ÅRSTALL.\n\nVi har trukket 44 prosent skatt på etterbetalingen din fra tidligere år.\n\nSkattetrekket er trukket i tråd med satser fastsatt av Skatteetaten. \nhttps://www.skatteetaten.no/person/skatt/skattekort/om-skattekortet/skatt-pa-etterbetalinger-av-pensjon-og-ytelser-fra-nav/\n\nHvis du har spørsmål om skattetrekket, må du ta kontakt med Skatteetaten.\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad',
            en_US: 'Hi\n\nYou asked about the tax withholding on your retroactive payments of BENEFIT for YEAR.\n\nWe have withheld 44 percent tax on your retroactive payments from previous years.\n\nThe tax withholding rates are specified by the Tax Administration.\nhttps://www.skatteetaten.no/en/person/taxes/tax-deduction-card-and-advance-tax/about-tax-deduction-card/tax-on-back-payment-of-pension-and-benefits-from-nav/\n\nIf you have any questions concerning your tax withholding, please contact the Tax Administration.\n\nYours sincerely,\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 1
    },
    '40f47a92-f44d-4491-9b27-fa2160098cfa': {
        id: '40f47a92-f44d-4491-9b27-fa2160098cfa',
        overskrift: 'Skriv til bruker, arbeidsevnevurdering',
        tags: ['skrivtilbruker', 'arbeidsevnevurdering'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu er innkalt til en samtale med NAV (DATO og KLOKKESLETT og STED). På dette møtet skal vi snakke om mulighetene du har for å komme i arbeid. Noen av temaene på møtet er hva du har jobbet med før, kompetansen din og hvilke yrker du mener vil være riktig for deg. Vi skal også snakke om kravene og forventningene du vil møte i arbeidslivet. Denne gjennomgangen kaller vi en arbeidsevnevurdering, som vi bruker når vi skal utarbeide en plan for hvordan du skal komme i arbeid.\r\n\r\nMed vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 1
    },
    '38eed7a5-49c2-4147-b875-260fae4d0c04': {
        id: '38eed7a5-49c2-4147-b875-260fae4d0c04',
        overskrift: 'Aktivitetsplan',
        tags: ['Aktivitetsplan'],
        innhold: {
            nb_NO: 'aktivitetsplanen hjelper deg med å holde oversikt over jobbene du har søkt på. I planen kan du blant annet legge inn lenke til stillingsannonser, beskrivelse av stillingene, og kontaktperson hos arbeidsgiveren. For å holde oversikt over hvor du er i søkeprosessen, kan du merke stillingen med for eksempel «Innkalt til intervju.\r\nLes mer her:\r\nhttps://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips/Bruk+aktivitetsplanen+din'
        },
        vekttall: 0
    },
    '1a096440-e451-4ff2-952b-46a126fb3e78': {
        id: '1a096440-e451-4ff2-952b-46a126fb3e78',
        overskrift: 'Aktivitetsplan Intro',
        tags: ['aktivitetsplan'],
        innhold: {
            nb_NO: 'aktivitetsplanen viser alle de aktivitetene du og NAV skal gjennomføre for å nå det målet du og NAV har avtalt.'
        },
        vekttall: 0
    },
    '7d190e4d-ffac-4500-8c3a-dc238f9102ba': {
        id: '7d190e4d-ffac-4500-8c3a-dc238f9102ba',
        overskrift: 'Aktivitetsplikt - aktivitetsplan',
        tags: ['AAP', 'Utland', 'TLF'],
        innhold: {
            nb_NO: 'I forbindelse med servicen vår til [bruker.navn] er det avtalt en telefonsamtale den {ANGI DAG OG TIDSPUNKT}.\r\n\r\nDet er aktivitetsplikt på arbeidsavklaringspenger, hvor målet er å beholde eller skaffe arbeid. Derfor skal vi, sammen med [bruker.fornavn], legge opp en aktivitetsplan. Før samtalen gjennomføres er det viktig at [bruker.fornavn] tenker gjennom følgende punkter:\r\n- Nåværende situasjon\r\n- Mål for aktivitet fremover\r\n\r\nMuligheter for å komme tilbake i arbeid:\r\n- Hos nåværende arbeidsgiver\r\n- Yrkesbakgrunn og kompetanse\r\n- Heltid eller deltid\r\n- Arbeidsmuligheter på hjemstedet og andre steder\r\n\r\n[bruker.fornavn] er informert om at aktiviteten hovedsakelig skal foregår i bostedslandet.\r\n\r\nVi tar kontakt med [bruker.fornavn] på telefonnummer {ANGI TELEFONNUMMER TIL BRUKER, ELLER HENVIS TIL GJELDENDE KONTAKTOPPLYSNINGER}.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '3f7d1784-43a2-48b5-ba39-0c8fc7268490': {
        id: '3f7d1784-43a2-48b5-ba39-0c8fc7268490',
        overskrift: 'Arbeidssøker Aktivitetsplan',
        tags: ['arbeidssøker', 'aktivitetsplan'],
        innhold: {
            nb_NO: '- at du kan bruke aktivitetsplan til å registrere jobber du har søkt på, arbeidsgivere som er kontaktet og tilbakemeldinger fra arbeidsgivere. Se her: https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips/Bruk+aktivitetsplanen+din\r\n',
            nn_NO: '- at du kan nytta aktivitetsplan til å registrera jobbar du har søkt på, arbeidsgivarar som er kontakta og tilbakemeldingar frå arbeidsgivarar. Sjå her: https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips/Bruk+aktivitetsplanen+din\r\n',
            en_US: '- that you can use the activity plan to register jobs you have applied for, employers you have contacted and responses you have received from employers. You can find job log information here (text in Norwegian): https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips/Bruk+aktivitetsplanen+din'
        },
        vekttall: 0
    },
    '9085e522-0a76-45c4-8e0f-c0935ad95b39': {
        id: '9085e522-0a76-45c4-8e0f-c0935ad95b39',
        overskrift: 'Årsavgift og bil',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'bil', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nNAV betaler årsavgiften når du får stønad til kassebil med heis eller rampe. Det året bilen blir innlevert er det den som var eier ved årsskiftet som må betale årsavgiften.\r\n'
        },
        vekttall: 0
    },
    '32b6a5a4-ce82-41d6-b3f8-c7b4413fa2ef': {
        id: '32b6a5a4-ce82-41d6-b3f8-c7b4413fa2ef',
        overskrift: 'Barnets underholdskostnad',
        tags: ['bidrag', 'beregning'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nBidraget blir beregnet med utgangspunkt i hva det koster å forsørge barnet (underholdskostnad). Underholdskostnaden består av forbruksutgifter, boutgifter og eventuelle tilsynsutgifter. Utgiftene varierer med alderen til barnet. Varene som danner grunnlag for beregningene, holder enkel god kvalitet og lav pris. Det er dessuten et langtidsbudsjett slik at det er lagt inn noe ekstra hver måned for å dekke mer sjeldne og større utgifter.\r\n'
        },
        vekttall: 0
    },
    '1d9777fe-b7d2-4f02-a44a-3cbe5ffa38d7': {
        id: '1d9777fe-b7d2-4f02-a44a-3cbe5ffa38d7',
        overskrift: 'Begrunnelse for betalingsanmerkning',
        tags: ['bidrag', 'innkreving', 'trekk'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDet er fordi NAV Innkreving har et tvangstiltak mot deg. Det kan for eksempel være trekk i lønn eller ytelse. NAV Innkreving kan bare ta utleggstrekk i lønn eller andre ytelser i saker der du ikke betaler frivillig. Vi kan også ta utleggspant i formuesgoder (bankkonto, eiendom, bil, motorsykkel og så videre). Når vi tar utleggstrekk eller utleggspant vil du få en  betalingsanmerkning.\r\n'
        },
        vekttall: 0
    },
    'f6275226-8f73-4224-a3a3-25fbd5ea52b6': {
        id: 'f6275226-8f73-4224-a3a3-25fbd5ea52b6',
        overskrift: 'Bekreftelse på kontonummer',
        tags: ['Kontonummer', 'NØP'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nVi bekrefter med dette at kontonummeret ditt (KONTONUMMER) er registrert i systemet vårt.\r\nDu kan endre kontonummeret på Ditt NAV. Det kan du lese mer om på nav.no: https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Slik+registrerer+og+endrer+du+kontonummer+hos+NAV.\r\n'
        },
        vekttall: 0
    },
    '044c1ef8-02ae-4af2-be2d-dfbdae28d864': {
        id: '044c1ef8-02ae-4af2-be2d-dfbdae28d864',
        overskrift: 'Beløpsgrensen på frikortet er brukt opp',
        tags: ['NØS', 'Frikort', '50%'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nVi har fått overført frikortet ditt fra Skatteetaten. Du har nå nådd beløpsgrensen på 65 000 kroner.\n\nDu må bestille skattekort på https://www.skatteetaten.no/person/skatt/skattekort/bestille-endre/. \n\nHvis du ikke har skattekort og får utbetalinger fra NAV, vil vi trekke deg 50 prosent skatt inntil vi har mottatt et nytt skattekort.  \n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad',
            en_US: 'Hi \n\nWe have received your tax-exemption card from the Tax Administration. You have now reached the tax-exempt amount of NOK 65,000.\n\nYou must request a tax card at https://www.skatteetaten.no/en/person/taxes/tax-deduction-card-and-advance-tax/order-a-tax-deduction-card/\n\nIf you do not have a tax card and you are receiving payments from NAV, we will withhold 50 percent tax until we have received your tax card.\n\nYours sincerely,\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 0
    },
    'c5cbddc7-9536-4b39-b7d0-1ca72abe722e': {
        id: 'c5cbddc7-9536-4b39-b7d0-1ca72abe722e',
        overskrift: 'Betaling av bidrag med eFaktura og Avtalegiro',
        tags: ['bidrag', 'innkreving', 'giro', 'efaktura'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu kan bruke eFaktura til å betale et hvilket som helst krav til NAV innkreving. Du kan bruke Avtalegiro i barnebidragssaker. Les mer om hvordan du bruker eFaktura og avtalegiro på giroen eller på https://www.nav.no/no/Person/Flere+tema/Innkreving+og+innbetaling/eFaktura+og+avtalegiro.406407.cms\r\n'
        },
        vekttall: 0
    },
    '0c8c2af0-31b6-4034-8ee3-72a7988e1606': {
        id: '0c8c2af0-31b6-4034-8ee3-72a7988e1606',
        overskrift: 'Betalingsfrist barnebidrag',
        tags: ['bidrag', 'innkreving', 'giro'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu har plikt å betale innen fristen, selv om du ikke har mottatt giro en måned. Du kan bruke KID fra tidligere giro eller ta kontakt med NAV Innkreving på telefonnummer 21 05 11 00.\r\n'
        },
        vekttall: 0
    },
    'a649514a-d974-473f-bc98-5f0531c281d4': {
        id: 'a649514a-d974-473f-bc98-5f0531c281d4',
        overskrift: 'Bidrag - klage på vedtak',
        tags: ['bidrag', 'innkreving'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nSelv om du har klaget på vedtaket eller søkt om endring må du betale. Dette gir ikke automatisk betalingsutsettelse. Vedtaket gjelder fram til NAV gjør et nytt vedtak.\r\n'
        },
        vekttall: 0
    },
    '071b160f-0dec-4770-b65c-42a95e0330e2': {
        id: '071b160f-0dec-4770-b65c-42a95e0330e2',
        overskrift: 'Bilforsikring',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'bil', 'forsikring', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nHvis du har fått tilskudd til bil velger du selv hvilken type forsikring du vil ha på bilen. Har du fått lån til en kassebil med heis eller rampe, må denne være fullkaskoforsikret med salgspant og gjeldsbrev til NAV. Det må den være fra den dagen du får bilen utlevert fra bilforhandler og til den dagen bilen blir levert tilbake. Den som bygger om bilen er ansvarlig for at bilen er forsikret mens den er under ombygging.\r\n'
        },
        vekttall: 0
    },
    '52548ffb-34c4-4871-a73d-d43cc642af26': {
        id: '52548ffb-34c4-4871-a73d-d43cc642af26',
        overskrift: 'Bistand til å søke',
        tags: ['veiledning', 'bistand', 'søknad'],
        innhold: {
            nb_NO: '[bruker.navn] har fått bistand til å søke om (YTELSE). Jeg har opplyst om at (TEKST).'
        },
        vekttall: 0
    },
    '0d388497-1079-46c0-89e1-432279559f3d': {
        id: '0d388497-1079-46c0-89e1-432279559f3d',
        overskrift: 'Bygge om bil',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'bil', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu vil få beskjed av NAV om hvem som skal bygge om bilen din når dette er avklart.\r\n'
        },
        vekttall: 0
    },
    'a14d7f58-dc19-412a-839c-a5e24f3fcad6': {
        id: 'a14d7f58-dc19-412a-839c-a5e24f3fcad6',
        overskrift: 'CV',
        tags: ['CV'],
        innhold: {
            nb_NO: 'CV er en oversikt over arbeidserfaringen og utdanningen din, språk, kurs, sertifikater, verv og lignende. Den skal også inneholde en kort egenbeskrivelse av interessene dine og kompetansen din. CVen skal alltid være oppdatert og fullstendig med riktige kontaktopplysninger, som e-postadresse og telefonnummer.'
        },
        vekttall: 0
    },
    'e7cfc01d-5f7b-464c-b884-61c903aa6e27': {
        id: 'e7cfc01d-5f7b-464c-b884-61c903aa6e27',
        overskrift: 'Den bidragspliktige deler bolig',
        tags: ['bidrag'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDersom den bidragspliktige deler bolig med annen voksen vil det bli tatt hensyn til i beregningen. Hva det har å si konkret når det gjelder størrelsen på bidraget må beregnes i hver enkelt sak. Du kan gjøre dette selv ved å bruke bidragskalkulatoren på nav.no\r\n'
        },
        vekttall: 0
    },
    '0c4435db-5444-4e8e-a3fa-27e20fa877b0': {
        id: '0c4435db-5444-4e8e-a3fa-27e20fa877b0',
        overskrift: 'Ditt NAV',
        tags: ['dittnav'],
        innhold: {
            nb_NO: 'Her på Ditt NAV kan du ha digital dialog med NAV i en sikker kanal, levere meldekort, se utbetalingsoversikt, få tilgang til digitale søknader, se status i saken din og innsyn i dokumenter.'
        },
        vekttall: 0
    },
    'd02a771a-3479-4d53-907e-ca53e5bf3dc9': {
        id: 'd02a771a-3479-4d53-907e-ca53e5bf3dc9',
        overskrift: 'Dødsbo og bil',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'bil'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDødsboet må innbetale det beløpet som ikke er nedskrevet til NAV. Hvis NAV har gitt lån til bilen, skal bilen innleveres til oss. Du kan ta direkte kontakt med det bilsenteret brukeren tilhørte for å få gjeldsoppgjør på bilen. Du finner kontaktinfo på https://www.nav.no/no/Person/Hjelpemidler/Tjenester+og+produkter/Hjelpemidler/Kontakt+hjelpemiddelsentralen\r\n'
        },
        vekttall: 0
    },
    'dc484215-46b7-4821-bfa0-6693c29cc15c': {
        id: 'dc484215-46b7-4821-bfa0-6693c29cc15c',
        overskrift: 'Du har ikke fordelt fribeløp til NAV (Frikort med beløpsgrense)',
        tags: ['NØS', 'Frikort', '50%'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nVi har fått overført frikortet ditt fra Skatteetaten. NAV må vite hvor stor del av fribeløpet vi kan utbetale før vi skal trekke skatt.\n\nDu må dele frikortet ditt på https://www.skatteetaten.no/person/skatt/skattekort/frikort/del-frikortet-pa-flere-arbeidsgivere/.\n\nHvis du ikke flytter fribeløpet fra en arbeidsgiver og over til oss, vil vi trekke 50 prosent skatt av utbetalingene dine inntil vi har mottatt nye opplysninger. \n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad',
            en_US: 'Hi \n\nWe have received your tax-exemption card from the Tax Administration. NAV needs to know how much of your tax-exemption amount we can pay out to you before we need to start withholding tax.\n\nGo to https://www.skatteetaten.no/en/person/taxes/tax-deduction-card-and-advance-tax/exemption-card/\n\nIf you do not reduce the amount for one of your employers and transfer this amount to us, we will withhold 50 percent tax on all your payments until we have received new information from you.\n\nYours sincerely,\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 0
    },
    'af4a1d80-e8cd-4208-b528-5292cacf408f': {
        id: 'af4a1d80-e8cd-4208-b528-5292cacf408f',
        overskrift: 'Du må registrere adressen din',
        tags: ['NØS', 'adresse', 'retur'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\n\r\nDu har ingen registrert adresse hos NAV fordi du ikke har registrert bostedsadressen eller postadressen din i folkeregisteret.\r\n\r\nNAV får oversendt disse opplysningene fra folkeregisteret.\r\n\r\nFor at NAV skal kunne utbetale penger og sende post til deg, må du registrere adressen din i folkeregisteret.\r\n\r\nDu finner informasjon på http://www.skatteetaten.no om hvordan du gjør dette.'
        },
        vekttall: 0
    },
    'fc30e0b3-468e-41d7-8aac-c72a0c3dc1d9': {
        id: 'fc30e0b3-468e-41d7-8aac-c72a0c3dc1d9',
        overskrift: 'Du ønsker ikke skattereduksjon i desember',
        tags: ['NØS', 'halvskatt', 'desember', 'skatt'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nDu har tatt kontakt med NAV fordi du ikke ønsker skattereduksjon i desember på din ytelse. Vi må registrere dette manuelt som et ekstra skattetrekk. Du må derfor oppgi til oss hvor mye ekstra skatt du ønsker å bli trukket i desember. Du må oppgi det ekstra skattetrekket som et beløp  eller som en prosent.\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 0
    },
    'c8ffffc4-2181-46cc-becd-314809a7360c': {
        id: 'c8ffffc4-2181-46cc-becd-314809a7360c',
        overskrift: 'Egenvurdering',
        tags: ['egenvurdering'],
        innhold: {
            nb_NO: 'Egenvurdering er del av arbeidsevnevurdering i NAV. Egenvurderingen er en forberedelse til møtet med en veileder i NAV om mulighetene dine  for å komme i arbeid.\r\nLes mer her: https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=236217\r\n\r\n'
        },
        vekttall: 0
    },
    '86536285-683f-4036-a8e4-a135e73bf143': {
        id: '86536285-683f-4036-a8e4-a135e73bf143',
        overskrift: 'Endre kontonummer',
        tags: ['kontonummer', 'kontoendring'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu kan selv endre kontonummeret ditt på Ditt NAV. Du finner mer informasjon om dette på nav.no: https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Slik+registrerer+og+endrer+du+kontonummer+hos+NAV.\r\n\r\n'
        },
        vekttall: 0
    },
    '3484393d-90f1-49d5-8708-30c779615257': {
        id: '3484393d-90f1-49d5-8708-30c779615257',
        overskrift: 'Endre kontonummer - dødsbo',
        tags: ['dødsbo', 'kontonummer', 'kontoendring', 'NØP'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nVi ber om at du sender skriftlig kontoendring til NAV Økonomi Pensjon, postboks 6600 Etterstad, 0607 Oslo, sammen med en kopi av skifteattesten.\r\nDersom det finnes flere arvinger i skifteattesten, må du legge ved fullmakt fra disse.\r\n'
        },
        vekttall: 0
    },
    '0b982430-3194-45d7-ace7-fedc5229aa45': {
        id: '0b982430-3194-45d7-ace7-fedc5229aa45',
        overskrift: 'Endre kontonummer - samtalereferat',
        tags: ['veiledning', 'kontonummer'],
        innhold: {
            nb_NO: '[bruker.navn] har fått veiledning i hvordan endre kontonummer. Jeg har opplyst om at kontonummer enkelt kan endres ved å logge inn på Ditt NAV eller ved å fylle ut skjema Melding om nytt bankkontonummer https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=250914 og sende det til NAV.'
        },
        vekttall: 0
    },
    '06ab9493-ac09-46a0-9ba1-a75526061936': {
        id: '06ab9493-ac09-46a0-9ba1-a75526061936',
        overskrift: 'Endre skattetrekk',
        tags: ['veiledning', 'skatt', 'skattetrekk'],
        innhold: {
            nb_NO: '[bruker.navn] har fått veiledning i hvordan endre skattetrekk. Jeg har opplyst om at Skatteetaten må kontaktes for endring av skattetrekket.'
        },
        vekttall: 0
    },
    '9d8584cc-bfcb-40b2-b461-332f95cf8f95': {
        id: '9d8584cc-bfcb-40b2-b461-332f95cf8f95',
        overskrift: 'Endring i samvær',
        tags: ['bidrag', 'samvær'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nEr det endret samvær eller endringer i inntekt må du søke om endring på eget skjema. Skjemaet finner du på www.nav.no.\r\n'
        },
        vekttall: 0
    },
    '987d9e38-6c21-44a1-b2b5-6a368c944fa6': {
        id: '987d9e38-6c21-44a1-b2b5-6a368c944fa6',
        overskrift: 'Etterlyser sykepenger - opplyst om utbetalingsdato',
        tags: ['sykepenger', 'utbetaling'],
        innhold: {
            nb_NO: '[bruker.navn] etterlyser sykepenger for perioden (FRADATO-TILDATO). Jeg har sjekket at nødvendig dokumentasjon foreligger og opplyst om at sykepengene blir utbetalt innen den 25. i måneden.'
        },
        vekttall: 0
    },
    '91dc124a-a4e5-46bb-aa13-a5cba39cab00': {
        id: '91dc124a-a4e5-46bb-aa13-a5cba39cab00',
        overskrift: 'Familievernkontor',
        tags: ['Bidrag', 'Utland', 'Bufetat'],
        innhold: {
            nb_NO: 'Vi kan dessverre ikke hjelpe deg med å gjenopprette kontakt med barna, eller gi deg veiledning med hensyn til konfliktsituasjonen mellom deg og barnas mor eller far. Vi vil råde deg til å ta kontakt med familievernkontoret der du bor. Du kan finne nærmeste kontor på www.bufetat.no/familievernkontor.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '2887e779-f3f7-4f02-963a-b31ef97aaf35': {
        id: '2887e779-f3f7-4f02-963a-b31ef97aaf35',
        overskrift: 'Fjerne betalingsanmerkning –  innkreving av bidrag',
        tags: ['bidrag', 'innkreving', 'gjeld'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nFor å bli kvitt en betalingsanmerkning må du betale gjelden din til NAV. Hvis du betaler bidrag må du i tillegg lage avtale med NAV Innkreving for betaling av framtidige bidrag.\r\n'
        },
        vekttall: 0
    },
    '47fd9a87-bebd-4bf2-963f-fc9600acb3bb': {
        id: '47fd9a87-bebd-4bf2-963f-fc9600acb3bb',
        overskrift: 'Flytte til utlandet - AAP - Innenfor EØS',
        tags: ['AAP', 'Utland', 'Eksport'],
        innhold: {
            nb_NO: '[bruker.navn] ønsker å flytte til utlandet, og vil vite om det er mulig å beholde arbeidsavklaringspengene etter flyttingen.\r\n\r\n[bruker.fornavn] kan bare ta med seg arbeidsavklaringspengene innenfor EØS-området. HAN/HUN kan ikke ta med seg arbeidsavklaringspenger ved flytting utenfor EØS-området.\r\n\r\nHvis [bruker.fornavn] skal flytte til et EØS-land, må [saksbehandler.enhet] vurdere om [bruker.fornavn] kan ta med seg arbeidsavklaringspengene til det aktuelle landet.\r\n\r\nFor at [saksbehandler.enhet] skal kunne vurdere videre rett til arbeidsavklaringspenger, må [bruker.fornavn] fylle ut egenvurderingsskjemaet på nytt, dette finnes under skjemaveilederen på nav.no. I tillegg vil [bruker.fornavn] få tilsendt et eget spørreskjema som må besvares og returneres til [saksbehandler.enhet].\r\n\r\n[saksbehandler.enhet] vil vurdere saken når alle nødvendige opplysninger foreligger. [bruker.navn] må oppholde seg i Norge og fortsette med de avtalte aktivitetene inntil det kommer et endelig svar i posten.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    'dcd9ede2-4751-4bc7-95e6-786cd8f842ae': {
        id: 'dcd9ede2-4751-4bc7-95e6-786cd8f842ae',
        overskrift: 'Flytte til utlandet - AAP - Utenfor EØS',
        tags: ['AAP', 'Utland', 'Eksport'],
        innhold: {
            nb_NO: '[bruker.navn] ønsker å flytte til utlandet, og vil vite om det er mulig å beholde arbeidsavklaringspengene etter flyttingen.\r\n\r\n[bruker.fornavn] kan bare ta med seg arbeidsavklaringspengene innenfor EØS-området. Det aktuelle landet er ikke innenfor EØS-området, og [bruker.fornavn] har derfor fått beskjed om at HAN/HUN ikke kan ta med seg arbeidsavklaringspengene hvis flyttingen gjennomføres.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '69091082-2cbb-4b61-89f8-34234c2d69ad': {
        id: '69091082-2cbb-4b61-89f8-34234c2d69ad',
        overskrift: 'Forfallsdato innkreving av bidrag',
        tags: ['bidrag', 'innkreving', 'forfallsdato'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nBidrag har forfallsdato den 25. hver måned. Forfallsdatoen kan ikke endres.\r\n'
        },
        vekttall: 0
    },
    '87c23681-722c-4969-aa29-c1301f3ae57e': {
        id: '87c23681-722c-4969-aa29-c1301f3ae57e',
        overskrift: 'For reparasjon av hjelpemiddel kontakt kommunen',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'reparasjon', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu kontakter kommunen for å få hjelp til å reparere hjelpemiddelet ditt.\r\n'
        },
        vekttall: 0
    },
    'ee4c9bd6-e8ec-4674-b854-45834525a19a': {
        id: 'ee4c9bd6-e8ec-4674-b854-45834525a19a',
        overskrift: 'For vurdering av behov kontakt kommunen',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'vurdere_behov', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu bør kontakte kommunen for å få hjelpe til å vurdere behovet ditt for hjelpemidler. Hvis du og kommunens ansatte har behov for hjelp fra hjelpemiddelsentralen for å finne frem til riktig hjelpemiddel, finner dere henvisningsskjema på www.nav.no.\r\n'
        },
        vekttall: 0
    },
    '13fe4e62-19a2-408c-a97a-6cd2361669ea': {
        id: '13fe4e62-19a2-408c-a97a-6cd2361669ea',
        overskrift: 'Frivillig skattetrekk - ikke pensjon og uføre',
        tags: ['skat', 'skattetrekk', 'tilleggstrekk', 'NØP'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\n\r\nVi har registrert tilleggstrekk for skatt med (X)  prosent  (X KRONER).  Trekket vil gjelde fra neste måned.'
        },
        vekttall: 0
    },
    'c261968b-901c-45d8-afc1-7e4a1cadd664': {
        id: 'c261968b-901c-45d8-afc1-7e4a1cadd664',
        overskrift: 'Gebyr for fastsettelse av bidrag',
        tags: ['bidrag', 'innkreving', 'fastsettelsesgebyr'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nNei, men dere må betale et gebyr hvis NAV skal fastsette bidraget. Dersom dere har avtalt bidrag privat, koster det ikke noe å ha innkreving gjennom NAV.\r\n'
        },
        vekttall: 0
    },
    '92ee8db4-0b8a-4cb7-9d43-313151eba2e9': {
        id: '92ee8db4-0b8a-4cb7-9d43-313151eba2e9',
        overskrift: 'Generell bistand',
        tags: ['veiledning', 'bistand'],
        innhold: {
            nb_NO: '[bruker.navn] har fått bistand til å (TEKST). Jeg har opplyst om at (TEKST).'
        },
        vekttall: 0
    },
    '4268971d-42f1-40e4-b491-04f80c21ebb1': {
        id: '4268971d-42f1-40e4-b491-04f80c21ebb1',
        overskrift: 'Generell veiledning',
        tags: ['veiledning', 'generell', 'veiledning'],
        innhold: {
            nb_NO: '[bruker.navn] har fått generell veiledning om (YTELSE). Jeg har opplyst om at (TEKST).'
        },
        vekttall: 0
    },
    '01e8ba6d-8409-4e29-aae0-6903dff7c2a2': {
        id: '01e8ba6d-8409-4e29-aae0-6903dff7c2a2',
        overskrift: 'Ileggelse av gebyr',
        tags: ['bidrag', 'innkreving', 'fastsettelsesgebyr'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nFordi du er blitt ilagt dette i vedtaket om bidrag (se mer om dette i vedtaket).\r\n'
        },
        vekttall: 0
    },
    '2cfdd410-28ea-413f-8a02-a30428eff44d': {
        id: '2cfdd410-28ea-413f-8a02-a30428eff44d',
        overskrift: 'Informasjon om vilkår for bil og søknad',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'bil', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu finner informasjon om vilkårene for å få støtte til bil, og søknadsskjema på https://www.nav.no/no/Person/Hjelpemidler/Tjenester+og+produkter/Bil+og+transport.\r\n\r\nHvis du har spørsmål kan du kontakte oss på telefon 55 55 33 35.\r\n'
        },
        vekttall: 0
    },
    '258b577b-e047-4147-b114-703cde8055ce': {
        id: '258b577b-e047-4147-b114-703cde8055ce',
        overskrift: 'Innbetaling uten KID',
        tags: ['bidrag', 'innkreving', 'efaktura', 'kidnummer'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nMerk innbetalingen med fødselsnummeret ditt (11 siffer).\r\n'
        },
        vekttall: 0
    },
    'd2e9acfe-aa09-450f-bfa1-a0dd339da5e0': {
        id: 'd2e9acfe-aa09-450f-bfa1-a0dd339da5e0',
        overskrift: 'Inngå samværsavtale - familievernkontor',
        tags: ['bidrag', 'samvær'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nNAV anbefaler at du tar kontakt med familievernkontoret i kommunen for å avtale meglingstime. Dersom dette ikke fører til noen endring, er det mulig å ta saken videre til domstolen for å få en avgjørelse der. Dere må søke NAV hvis det blir en endring i samværsavtalen som får betydning for størrelsen på bidraget.\r\n'
        },
        vekttall: 0
    },
    '4560b239-0cf0-462c-995b-96cee6c8e42d': {
        id: '4560b239-0cf0-462c-995b-96cee6c8e42d',
        overskrift: 'Innkreving av bidrag – trekk i lønn',
        tags: ['bidrag', 'trekk'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nHvis den bidragspliktige ikke innbetaler på giroen som NAV Innkreving sender, vil vi tidligst sette i gang lønnstrekk etter fire måneder.\r\n'
        },
        vekttall: 0
    },
    '4aae9d51-6af8-40e3-bf64-5c6045abae21': {
        id: '4aae9d51-6af8-40e3-bf64-5c6045abae21',
        overskrift: 'Innlevering av kassebil',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'bil', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nNAV gjenbruker kassebiler med heis eller rampe som er mindre enn fem år gamle og som har kort kjørelengde. Disse skal derfor alltid innleveres. Du kan kjøpe ut biler som er eldre enn fem år. Ta kontakt med bilsenteret for å avtale dette på https://www.nav.no/no/Person/Hjelpemidler/Tjenester+og+produkter/Relatert+informasjon/Regionale+bilsentre.358771.cms\r\n'
        },
        vekttall: 0
    },
    '5541fa29-abf9-4c2c-8428-23b4fee7cbbc': {
        id: '5541fa29-abf9-4c2c-8428-23b4fee7cbbc',
        overskrift: 'Jobbønsker',
        tags: ['jobbønske'],
        innhold: {
            nb_NO: 'et jobbønske skal stemme med CVen din og etterspørselen i arbeidsmarkedet. Kan du øke sjansene dine for arbeid ved å utvide jobbønskene dine? Les mer her: https://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Arbeidsledig+-+hva+na'
        },
        vekttall: 0
    },
    '88ed9266-ed2d-466c-8be3-ec5c014069bc': {
        id: '88ed9266-ed2d-466c-8be3-ec5c014069bc',
        overskrift: 'Karriereveiledning',
        tags: ['karriereveiledning'],
        innhold: {
            nb_NO: 'Karriereveiledning:\r\nhttps://www.nav.no/Karriereveiledning.378415.cms\r\n\r\nSenter for jobbmestring:\r\nhttps://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+%C3%A5+komme+i+jobb/Relatert+informasjon/Senter+for+jobbmestring.346074.cms\r\n\r\nOm Akademia – ønsker du å få hjelp av en veileder?\r\nhttps://www.nav.no/no/Person/Arbeid/Test+deg+for+jobb+og+utdanning/Relatert+informasjon/Om+Akademia+-+%C3%98nsker+du+%C3%A5+f%C3%A5+hjelp+av+en+veileder%3F.347276.cms\r\n'
        },
        vekttall: 0
    },
    '0c54f0e5-3c7b-4c5f-8a13-5daaa6f7270c': {
        id: '0c54f0e5-3c7b-4c5f-8a13-5daaa6f7270c',
        overskrift: 'Kildeskattekort lønn kan ikke kombineres med ytelser fra NAV',
        tags: ['NØS', 'kildeskattlønn', ''],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nDu kan ikke være med i kildeskatt ordningen for lønn når du mottar ytelse fra NAV.\n\nDu må ta kontakt Skatteetaten for å gå ut av ordningen med kildeskatt, det gjør du ved å bestille et nytt skattekort. Inntil du har fått nytt skattekort, vil vi trekke 50 prosent skatt.\n\nhttps://www.skatteetaten.no/person/utenlandsk/skal-du-arbeide-i-norge/skattekort/kildeskatt-pa-lonn/ \n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad',
            en_US: 'Hi\n\nYou cannot participate in the PAYE scheme for salary when you receive a benefit from NAV.\n\nYou must contact Skatteetaten to exit The PAYE scheme, you do this by ordering a new tax card. Until you have received a new tax card, we will deduct 50 percent tax.\n\nhttps://www.skatteetaten.no/en/person/foreign/are-you-intending-to-work-in-norway/tax-deduction-cards/paye/\n\nWith best regards\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 0
    },
    '64b3b366-b3fc-4507-9191-826a6f5e5ef4': {
        id: '64b3b366-b3fc-4507-9191-826a6f5e5ef4',
        overskrift: 'Klage på tiltak',
        tags: ['tiltak', 'klage'],
        innhold: {
            nb_NO: 'Hei [bruker.navn]\n\n[bruker.navkontor] har mottatt klagen din på vedtaket om at du ikke har fått (tiltak).\n\nNår du klager skal NAV-kontoret som har gjort vedtaket vurdere saken din på nytt.\nDersom vedtaket ikke blir endret, blir klagen sendt videre til behandling hos NAV Klageinstans. Du vil få kopi av oversendelsesbrevet fra NAV-kontoret til NAV Klageinstans, med mulighet for å uttale deg om NAV-kontorets begrunnelse.\n\nI spesielle tilfeller kan du få en forlenget klagefrist, og vi kan også behandle klagen selv om klagefristen er utløpt.'
        },
        vekttall: 0
    },
    '26723542-60ed-4fbb-a094-8e91ad31fe23': {
        id: '26723542-60ed-4fbb-a094-8e91ad31fe23',
        overskrift: 'Klage på vedtak og oppsettende virkning',
        tags: ['bidrag', 'klage'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nHovedregelen er at bidraget løper til tross for at det er sendt inn en klage. Det er mulig å søke om å fryse bidraget, det heter oppsettende virkning.\r\n'
        },
        vekttall: 0
    },
    '9bbb3bff-d669-44f6-85c5-278a02b5ffde': {
        id: '9bbb3bff-d669-44f6-85c5-278a02b5ffde',
        overskrift: 'Klage på vedtak om bidrag',
        tags: ['bidrag', 'klage'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nEr du uenig i vedtaket må du klage. Klagefristen går fram av vedtaket ditt. Vi anbefaler at du sender klagen skriftlig, enten som et vanlig brev eller benytt klageskjema på www.nav.no.\r\n'
        },
        vekttall: 0
    },
    '09427a59-0a28-43f0-9c59-0e41cf5a0ef7': {
        id: '09427a59-0a28-43f0-9c59-0e41cf5a0ef7',
        overskrift: 'Kompetanseord',
        tags: ['kompetanseord'],
        innhold: {
            nb_NO: 'kompetanseord eller nøkkelkvalifikasjoner er ord som utdyper den formelle kompetansen din. Kompetanseord er viktig for at arbeidsgivere skal finne profilen din. Les mer om kompetanseord her: https://www.nav.no/no/Lokalt/Rogaland/Nyttig+a+vite/Kompetanseordbrosjyre.385419.cms'
        },
        vekttall: 0
    },
    '277a911c-4e54-4288-bece-76fa158ed1d1': {
        id: '277a911c-4e54-4288-bece-76fa158ed1d1',
        overskrift: 'Kontakt NAV om bil ',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'bil', 'spesialutstyr', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu finner informasjon om dette på https://www.nav.no/no/Person/Hjelpemidler/Tjenester+og+produkter/Bil+og+transport/Kontakt+NAV\r\n'
        },
        vekttall: 0
    },
    'f40480f7-a74f-448d-a5b5-eee3a8d57977': {
        id: 'f40480f7-a74f-448d-a5b5-eee3a8d57977',
        overskrift: 'Kontoendring grunn - og hjelpestønad barn',
        tags: [
            '#nøs,',
            '#barn,',
            '#kontoendring,',
            '#samtykke,',
            '#foreldre,',
            '#grunn',
            '-',
            'og',
            'hjelpestønad,',
            '#kontonummer'
        ],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nVi har mottatt ulike kontonummerendringer for xxxxxxxx fra mor og far. Nå er kontonummer xxxxxxxxxxx registrert.\n\nGrunn- og hjelpestønad til barn skal utbetales til den kontoen som foreldrene, eventuelt oppnevnt verge, bestemmer. Konto kan opprettes i en av foreldrenes/verges navn eller i barnets navn. Dersom vergene ikke blir enige om hvilket kontonummer stønaden skal utbetales til, vil den utbetales på giro til barnets folkeregistrerte adresse. \n\nVi legger til grunn at vergene blir enige om et felles kontonummer. Blir dere ikke enige, kan dere kontakte Statsforvalteren for mekling.\n\nDenne meldingen sendes til begge foreldrene.\n\n\nMvh\n[saksbehandler.navn]'
        },
        vekttall: 0
    },
    '5a3831b1-33b7-41ef-87fd-9903791031d7': {
        id: '5a3831b1-33b7-41ef-87fd-9903791031d7',
        overskrift: 'Krykker',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu får krykker hvis du har et varig behov for det. Hvis du trenger krykker fordi du har brukket benet eller lignende, må du skaffe deg krykker selv. Du kan også kontakte kommunen du bor i.\r\n'
        },
        vekttall: 0
    },
    '3ebbe7bb-9435-4d0b-a55a-bc4c81da6e07': {
        id: '3ebbe7bb-9435-4d0b-a55a-bc4c81da6e07',
        overskrift: 'Levert dokumentasjon',
        tags: ['dokumentasjon', 'levering', 'levert_dokument', 'oppmøte'],
        innhold: {
            nb_NO: '[bruker.navn] har levert (DOKUMENTASJON). Jeg har opplyst om at (TEKST).'
        },
        vekttall: 0
    },
    'c586ee7e-7087-405d-b453-2f7e4268c9e1': {
        id: 'c586ee7e-7087-405d-b453-2f7e4268c9e1',
        overskrift: 'Levert manuelt korrigert meldekort',
        tags: ['meldekort', 'manuelt_meldekort', 'oppmøte'],
        innhold: {
            nb_NO: '[bruker.navn] har levert manuelt korrigert meldekort. NAV har mottatt meldekortet og sender det videre til behandling. Jeg har opplyst om at behandlingstiden er på (ANTALL) dager'
        },
        vekttall: 0
    },
    '686b6f23-ae42-49e0-82a9-5248e5142506': {
        id: '686b6f23-ae42-49e0-82a9-5248e5142506',
        overskrift: 'Levert søknad om sykepenger',
        tags: ['sykepenger', 'søknad', 'oppmøte'],
        innhold: {
            nb_NO: '[bruker.navn] har levert søknad om sykepenger (del D) for perioden (FRADATO-TILDATO). NAV har mottatt søknaden og sender den videre for behandling. Jeg har opplyst om at behandlingstiden er på (ANTALL) uker.'
        },
        vekttall: 0
    },
    '392996c9-8fd2-422b-9838-f5272a7e5914': {
        id: '392996c9-8fd2-422b-9838-f5272a7e5914',
        overskrift: 'Mal for oppfølgingsreferat',
        tags: ['oppfølgingsreferat', 'oppfølgingssamtale'],
        innhold: {
            nb_NO: 'I dette møtet skal vi snakke om: (FRITEKST- FORVENTNINGSAVKLARING)\r\nEr det andre ting du ønsker å ta opp? (AVKLARINGSPUNKTER)\r\nDette har vi snakket om: (KORT OPPSUMMERING – ER BRUKEREN ENIG?)\r\nVi har avtalt hva du skal gjøre og hva NAV skal gjøre til neste oppfølging: (ANSVARSFORDELING)\r\nNeste oppfølgingspunkt er: (DATO OG KANAL)\r\n'
        },
        vekttall: 0
    },
    '9eb6d6d9-ee99-4190-b17f-6cc22440e389': {
        id: '9eb6d6d9-ee99-4190-b17f-6cc22440e389',
        overskrift: 'Medlemskap - ikke registrert unntak fra norsk trygd',
        tags: ['Medlemskap', 'Utland', 'Unntak'],
        innhold: {
            nb_NO: '[bruker.navn] har fått informasjon om at NAV ikke har registrert unntak fra norsk trygd i perioden fra DATO til DATO. Normalt blir unntak fra norsk trygd registrert i løpet av to uker etter at vi har mottatt unntaket. Når perioden er registrert overføres dette elektronisk til Skatteetaten. [bruker.fornavn] blir bedt om å kontakte Skatteetaten for å få avgiften refundert.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '1079fe8a-2bdf-48c6-8f67-1f2168705205': {
        id: '1079fe8a-2bdf-48c6-8f67-1f2168705205',
        overskrift: 'Medlemskap - innhente opplysninger søknad om attest A1',
        tags: ['medlemskap'],
        innhold: {
            nb_NO: 'DU MÅ SENDE OSS FLERE OPPLYSNINGER\nVi trenger flere opplysninger fra deg for å kunne behandle søknaden din om avklaring av trygdetilhørighet og attest A1, som vi mottok DATO.\n\nDu må sende oss/svare på følgende: \n- FRITEKST\n\nDu kan sende oss opplysninger eller stille oss spørsmål ved å svare på denne meldingen. \n\nHar du har spørsmål, kan du også ringe oss på +47 21 07 37 00. Hvis du oppgir fødselsnummeret ditt når du tar kontakt med NAV, kan vi lettere gi deg rask og god hjelp. \n\nSLIK ETTERSENDER DU DOKUMENTER \nFor å ettersende dokumenter til søknaden din, må du følge veiledningen for ettersending av vedlegg på nav.no. Velg søknadsskjemaet du vil ettersende til og følg instruksjonene videre.  \n\nVennlig hilsen\n[saksbehandler.navn]\nNAV Medlemskap og avgift'
        },
        vekttall: 0
    },
    'a0c8bb58-0eb6-464f-90f4-df402e67418c': {
        id: 'a0c8bb58-0eb6-464f-90f4-df402e67418c',
        overskrift: 'Medlemskap - påminnelse innhente opplysninger søknad om attest A1',
        tags: ['medlemskap'],
        innhold: {
            nb_NO: 'PÅMINNELSE: DU MÅ SENDE OSS FLERE OPPLYSNINGER\n\nVi sendte deg en melding DATO der vi ba om opplysninger som vi trenger for å kunne behandle søknaden din om avklaring av trygdetilhørighet og attest A1, som vi mottok DATO. Vi har ikke mottatt opplysningene, og ber om at du sender disse så snart som mulig.\n\nDu må sende oss/svare på følgende:\n- FRITEKST\n\nDu kan sende oss opplysninger eller stille oss spørsmål ved å svare på denne meldingen. \n\nHar du har spørsmål, kan du også ringe oss på +47 21 07 37 00. Hvis du oppgir fødselsnummeret ditt når du tar kontakt med NAV, kan vi lettere gi deg rask og god hjelp.\n\nSLIK ETTERSENDER DU DOKUMENTER\nFor å ettersende dokumenter til søknaden din, må du følge veiledningen for ettersending av vedlegg på nav.no. Velg søknadsskjemaet du vil ettersende til og følg instruksjonene videre.\n\nVennlig hilsen \n[saksbehandler.navn]\nNAV Medlemskap og avgift'
        },
        vekttall: 0
    },
    '3161b177-e763-4432-906d-52ce27face1c': {
        id: '3161b177-e763-4432-906d-52ce27face1c',
        overskrift: 'Medlemskap - påminnelse innhente opplysninger søknad om medlemskap',
        tags: ['medlemskap'],
        innhold: {
            nb_NO: 'PÅMINNELSE: DU MÅ SENDE OSS FLERE OPPLYSNINGER\n\nVi sendte deg en melding DATO der vi ba om opplysninger som vi trenger for å kunne behandle søknaden din om medlemskap i folketrygden, som vi mottok DATO. Vi har ikke mottatt opplysningene, og ber om at du sender disse så snart som mulig. \n\nDu må sende oss/svare på følgende: \n- FRITEKST\n\nDu kan sende oss opplysninger eller stille oss spørsmål ved å svare på denne meldingen. \n\nHar du har spørsmål, kan du også ringe oss på +47 21 07 37 00. Hvis du oppgir fødselsnummeret ditt når du tar kontakt med NAV, kan vi lettere gi deg rask og god hjelp. \n\nSLIK ETTERSENDER DU DOKUMENTER \nFor å ettersende dokumenter til søknaden din, må du følge veiledningen for ettersending av vedlegg på nav.no. Velg søknadsskjemaet du vil ettersende til og følg instruksjonene videre.  \n\nVennlig hilsen \n[saksbehandler.navn]\nNAV Medlemskap og avgift'
        },
        vekttall: 0
    },
    '946b0664-2224-4e81-82d7-c1837720c64d': {
        id: '946b0664-2224-4e81-82d7-c1837720c64d',
        overskrift: 'Medlemskap - unntak fra norsk trygd',
        tags: ['Medlemskap', 'Utland', 'Unntak'],
        innhold: {
            nb_NO: '[bruker.navn] har fått informasjon om at NAV har registrert unntak fra norsk trygd i perioden fra DATO til DATO. Perioder med unntak blir elektronisk overført til Skatteetaten hver 14. dag. [bruker.fornavn] blir bedt om å kontakte Skatteetaten for å få avgiften refundert.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    'b8fc7fc3-e29c-4b76-a1e4-c4d47e06e20b': {
        id: 'b8fc7fc3-e29c-4b76-a1e4-c4d47e06e20b',
        overskrift: 'Medlemskap ved arbeid innenfor EØS',
        tags: ['Medlemskap', 'Utland', 'EØS'],
        innhold: {
            nb_NO: '[bruker.navn] har fått generell informasjon om medlemskap i folketrygden ved arbeid innenfor EØS-området. [bruker.fornavn] er veiledet til søknadsskjemaet på nav.no.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '5dbaa5ce-f956-4853-aeb7-7d2bf6d95a90': {
        id: '5dbaa5ce-f956-4853-aeb7-7d2bf6d95a90',
        overskrift: 'Medlemskap ved arbeid i utlandet',
        tags: ['Medlemskap', 'Utland', 'Arbeid'],
        innhold: {
            nb_NO: '[bruker.navn] har fått generell informasjon om medlemskap i folketrygden ved arbeid i utlandet. [bruker.fornavn] er veiledet til søknadsskjemaet på nav.no.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '015fc02f-eb98-4bdc-8284-c40f66cf5fe9': {
        id: '015fc02f-eb98-4bdc-8284-c40f66cf5fe9',
        overskrift: 'Medlemsskap - Opphold i utlandet',
        tags: ['Medlemskap', 'Utland', '12mnd'],
        innhold: {
            nb_NO: '[bruker.navn] har fått generell informasjon om medlemskap i folketrygden ved opphold i utlandet. Videre er [bruker.fornavn] informert om at så lenge utenlandsoppholdet varer kortere enn 12 måneder vil HAN/HUN fortsatt være medlem i folketrygden.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '9b55d406-8239-4ae7-ba40-a35bcbca674e': {
        id: '9b55d406-8239-4ae7-ba40-a35bcbca674e',
        overskrift: 'Medlemsskap - Støtte fra Lånekassen',
        tags: ['Medlemskap', 'Utland', 'Student'],
        innhold: {
            nb_NO: '[bruker.navn] har fått generell informasjon om medlemskap i folketrygden ved studier i utlandet. Videre er [bruker.fornavn] informert om at ved støtte fra Lånekassen til utenlandsstudiene vil HAN/HUN fortsatt være medlem i folketrygden under studiene.\r\n\r\nDersom [bruker.fornavn] får avslag fra Lånekassen må HUN/HAN søke om medlemskap i folketrygden. [bruker.fornavn] er veiledet til søknadsskjemaet på nav.no.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '33fc763c-0473-4139-850f-81cb9e3ae2cd': {
        id: '33fc763c-0473-4139-850f-81cb9e3ae2cd',
        overskrift: 'NAV kan ikke behandle innsendt melding om endring av kontoopplysninger',
        tags: ['nøs', 'kontonummer', 'manglende', 'signatur'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nNAV har mottatt melding om endring av\nutbetalingsopplysninger fra deg. Meldingen mangler gyldig\nsignatur/kontonummer. Du kan registrere og endre\nkontonummer og adresse ved å logge inn på nav.no'
        },
        vekttall: 0
    },
    '3dbdda21-9819-44cb-81e7-3c27e2b3310b': {
        id: '3dbdda21-9819-44cb-81e7-3c27e2b3310b',
        overskrift: 'NAV-kontor Generell henvendelse om tiltak',
        tags: ['tiltak'],
        innhold: {
            nb_NO: 'Hei [bruker.navn]\n\n[bruker.navkontor] har mottatt henvendelsen din om (tiltak).'
        },
        vekttall: 0
    },
    '1e2afa55-e44d-47b1-ab2a-8bdd5804e8d0': {
        id: '1e2afa55-e44d-47b1-ab2a-8bdd5804e8d0',
        overskrift: 'NAV-kontor Kvittering – ikke tildelt tiltak',
        tags: ['tiltak', 'klage', 'kvittering'],
        innhold: {
            nb_NO: 'Hei [bruker.navn]\n\n[bruker.navkontor] har mottatt henvendelsen din om at du ikke er tildelt et tiltak fra NAV.\n\nDu oppgir i henvendelsen din at du ønsker (tiltak).\n\nDu vil få en skriftlig begrunnelse fra oss i posten om årsaken til at du ikke kan få det tiltaket du ønsker. Vanlig saksbehandlingstid er tre uker.\n\nHvis du er uenig i begrunnelsen vår, har du rett til å klage. Klagefristen er seks uker fra du har mottatt den skriftlige begrunnelsen vår. Du finner mer informasjon om retten til å klage på tiltak på www.nav.no.\n\nhttps://www.nav.no/no/Person/Skjemaer-for-privatpersoner/Klage%20p%C3%A5%20vedtak'
        },
        vekttall: 0
    },
    'a75cb85a-8e29-476c-9b91-0e6e75e463a0': {
        id: 'a75cb85a-8e29-476c-9b91-0e6e75e463a0',
        overskrift: 'Navneendring',
        tags: ['navneendring', 'folkeregisteret', 'NØP'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\n\r\nNAV har ikke mulighet til å foreta navneendring, men benytter det navnet som er registrert i Folkeregisteret. På skattetaten.no finner du mer informasjon om hvordan du kan melde navneendring.\r\n\r\nBrukere bosatt i utlandet og/eller med D-nummer kan sende melding til Skatt nord Hammerfest, postboks 6310, 9293 Hammerfest, Norway.\r\n\r\nNAV oppdaterer daglig registrene våre med endringer som er registrert i Folkeregisteret.\r\n'
        },
        vekttall: 0
    },
    '4473c9c0-0c2e-40f3-9329-d8c8498ebaeb': {
        id: '4473c9c0-0c2e-40f3-9329-d8c8498ebaeb',
        overskrift: 'Ny fastsetting av skatt for deg som har tilbakebetalingskrav hos NAV - brutto tilbakekreving',
        tags: ['NØS', 'NØP', 'brutto', 'tilbakekreving'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nVi viser til vedtak fra NAV den (xx.xx.xxxx). Vi har nå sendt en melding til Skatteetaten om at inntekten din er redusert for følgende år:\n20xx – xx kroner\n20xx – xx kroner\n\nDette tilsvarer beløpet som er feilutbetalt til deg i denne perioden.\n\nDersom feilutbetalingen også gjelder for perioder etter 2014, vil dette bli endret maskinelt og du vil få en egen endringsmelding på dette.\n\nDenne henvendelsen er kun en informasjon. Du trenger ikke å gjøre noe. Skatteetaten vil beregne skatten på nytt på bakgrunn av de endringene vi har gjort. Du vil få et brev fra Skatteetaten med informasjon om ny skatteberegning når de har behandlet saken din.\n\nDu kan lese mer om ny fastsetting av skatt for deg som har tilbakebetalingskrav hos NAV her på skatteetaten.no:\nhttps://www.skatteetaten.no/presse/nyhetsrommet/skatteetaten-endrer-regelverk-og-praksis-for-tilbakebetaling-av-nav-ytelser/\n\nMed vennlig hilsen\n[saksbehandler.navn]\n[saksbehandler.enhet]'
        },
        vekttall: 0
    },
    'c1334825-eaed-4d29-8d14-6e3ed992c2e4': {
        id: 'c1334825-eaed-4d29-8d14-6e3ed992c2e4',
        overskrift: 'Ny fastsetting av skatt for deg som har tilbakebetalingskrav hos NAV - netto tilbakekreving',
        tags: ['NØS', 'NØP', 'netto', 'tilbakekreving'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nVi viser til vedtak fra NAV den (xx.xx.xxxx). Vi har sendt melding til Skatteetaten om at inntekten din og forskuddstrukket skatt er redusert. Reduksjonen tilsvarer beløpet som er feilutbetalt til deg.\nInntekt:\n20xx – xx kroner\n20xx – xx kroner\n\nForskuddstrekk:\n20xx – xx kroner\n20xx – xx kroner\n\nDersom feilutbetalingen også gjelder for perioder etter 2014, vil dette bli endret maskinelt og du vil få en egen endringsmelding på dette.\n\nDenne henvendelsen er kun en informasjon. Du trenger ikke å gjøre noe. Skatteetaten vil beregne skatten på nytt på bakgrunn av de endringene vi har gjort. Du vil få et brev fra Skatteetaten med informasjon om ny skatteberegning når de har behandlet saken din.\n\nDu kan lese mer om ny fastsetting av skatt for deg som har tilbakebetalingskrav hos NAV her på skatteetaten.no:\nhttps://www.skatteetaten.no/presse/nyhetsrommet/skatteetaten-endrer-regelverk-og-praksis-for-tilbakebetaling-av-nav-ytelser/\n\nMed vennlig hilsen\n[saksbehandler.navn]\n[saksbehandler.enhet]'
        },
        vekttall: 0
    },
    '4406a8b0-1136-4cb3-bf4b-0f48dc09ebd2': {
        id: '4406a8b0-1136-4cb3-bf4b-0f48dc09ebd2',
        overskrift: 'Nytt kontonummerregister',
        tags: ['#nøs', '#kontonummerregister', '#kontonummer'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn], \nNAV har gått over til et nytt kontonummerregister.\nSiden du ikke har mottatt penger fra NAV de to siste årene, ble ikke kontonummeret overført. Overgangen skjedde i det du fikk utbetalingen, og da hadde vi ikke kontonummeret i det nye registeret. Vi beklager ulempene dette medførte for deg. Neste utbetaling vil gå til din konto.\n\nMvh\n[saksbehandler.enhet]'
        },
        vekttall: 0
    },
    'e7c8f867-19a8-4805-b229-5065eb24dcb3': {
        id: 'e7c8f867-19a8-4805-b229-5065eb24dcb3',
        overskrift: 'Økonomisk rådgivning',
        tags: ['Bidrag', 'Utland', 'Gjeld'],
        innhold: {
            nb_NO: 'Vi vil også gjøre deg oppmerksom på NAVs økonomirådstelefon 800 45353 som kan gi økonomisk rådgivning, og hjelp til selvhjelp om det å komme i gang med å finne løsninger på betalingsproblemer.\r\n\r\nNummeret er gratis å ringe til fra fasttelefon. Hvis du ringer fra mobil vil du få tilbud om å bli ringt opp med én gang du kommer igjennom til tjenesten. Åpningstidene til 800gjeld er kl. 09.00-15.00.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '26c666f7-a28a-4ef5-b7e6-e595097ac07c': {
        id: '26c666f7-a28a-4ef5-b7e6-e595097ac07c',
        overskrift: 'Oppsettende virkning/stans i innkreving',
        tags: ['bidrag', 'innkreving'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu kan søke om oppsettende virkning til NAV-enheten som gjorde vedtaket om bidrag. Dersom NAV Innkreving benytter tvangstiltak, vil du også kunne kreve at vi tar stilling til innsigelsen din.\r\n'
        },
        vekttall: 0
    },
    '8e09a948-70d5-49d2-8124-76d2ffd9e6d9': {
        id: '8e09a948-70d5-49d2-8124-76d2ffd9e6d9',
        overskrift: 'Overføring til utenlandsk konto - gebyr',
        tags: ['utbetalingsgebyr', 'gebyr', 'utbetaling', 'overføring', 'utland', 'NØP'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\n\r\nOverføring til utenlandsk konto er et alternativ til norsk kontonummer. Omkostningene ved overføring til utenlandsk bank (per i dag ca. 22 kroner) trekkes fra den månedlige utbetalingen. Dette tilsvarer merkostnaden det er for NAV å sende utbetalingen til utlandet sammenlignet med en overføring til en norsk konto.\r\n\r\nAndre gebyrer som bankene eventuelt tar har NAV ingen oversikt over, og det må du undersøke med banken din.\r\n\r\nUtbetaling til norsk konto er den enkleste og raskeste måten å overføre utbetalingen på, og du vil da slippe gebyret for overføring til en utenlandsk konto. Du kan selv avtale med en norsk bank om faste overføringsoppdrag til en utenlandsk konto, eller benytte VISA-kort for uttak fra en norsk konto i utlandet.\r\n'
        },
        vekttall: 0
    },
    'f5b0f7d6-0143-4bda-a6b0-cc19077edcdf': {
        id: 'f5b0f7d6-0143-4bda-a6b0-cc19077edcdf',
        overskrift: 'Oversikt utbetaling av bidrag',
        tags: ['bidrag', 'innkreving', 'utbetaling'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu finner en oversikt over utbetalinger ved å logge på Ditt NAV\r\n'
        },
        vekttall: 0
    },
    '37c61ab2-410f-4f19-b4c8-f39b21ed4083': {
        id: '37c61ab2-410f-4f19-b4c8-f39b21ed4083',
        overskrift: 'Prioritering av sak',
        tags: ['ka', 'prioritering', 'av', 'sak'],
        innhold: {
            nb_NO: 'Hei,\r\nVi har mottatt din henvendelse om prioritering av saken din.\r\n\r\nVi har forståelse for at du ønsker å få en rask behandling av saken din, men har dessverre ikke anledning til å prioritere enkeltsaker foran andre i køen. Vi beklager den lange saksbehandlingstiden og viser til vårt brev av [DATO]  der vi skriver at saken vil bli behandlet innen 4 mnd.\r\n\r\nMed vennlig hilsen\r\nNavn\r\nNAV Klageinstans\r\n'
        },
        vekttall: 0
    },
    'ab51c16c-3239-4db3-ba3d-7f232ad43db3': {
        id: 'ab51c16c-3239-4db3-ba3d-7f232ad43db3',
        overskrift: 'Purrer på sak',
        tags: ['Medlemskap', 'Utland', 'Purring'],
        innhold: {
            nb_NO: '[bruker.navn] purrer på saken. [bruker.fornavn] blir informert om at saken vil bli prioritert.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    'd836266d-fbdb-4d6a-ab3e-378bed5c5d95': {
        id: 'd836266d-fbdb-4d6a-ab3e-378bed5c5d95',
        overskrift: 'Registrere midlertidig adresse',
        tags: ['midlertidig', 'adresse', 'tilleggsadresse', 'NØP'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\n\r\nDu kan selv registrere en midlertidig adresse på Ditt NAV. Når du sletter denne adressen, vil vi igjen benytte adressen som er registrert i Folkeregisteret.\r\n\r\nDu kan lese mer om dette på nav.no: https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/vil-du-ha-post-fra-nav-til-en-annen-adresse.'
        },
        vekttall: 0
    },
    '8039dfad-f280-48b0-9115-93fc5ccd73a0': {
        id: '8039dfad-f280-48b0-9115-93fc5ccd73a0',
        overskrift: 'Registrere seg på nav.no/meldekort',
        tags: ['veiledning', 'bistand', 'registrering', 'arbeidssøker'],
        innhold: {
            nb_NO: '[bruker.navn] har fått bistand til å registrere seg på nav.no og generell veiledning om meldekort.'
        },
        vekttall: 0
    },
    '49e30548-8ed3-49b5-b4de-26340b9a4530': {
        id: '49e30548-8ed3-49b5-b4de-26340b9a4530',
        overskrift: 'Reiseutgifter – samvær ',
        tags: ['bidrag'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDeling av reiseutgifter i forbindelse med samvær mellom samværsforelderen og barnet er et forhold mellom foreldrene, og er ikke med i bidragsberegningen. Dersom dere ikke blir enige om hvordan dere skal dele reiseutgiftene, kan dere ta saken videre til fylkesmannen og/eller retten.\r\n'
        },
        vekttall: 0
    },
    '33a1fb66-4d36-4bb2-a41b-130431aedb0d': {
        id: '33a1fb66-4d36-4bb2-a41b-130431aedb0d',
        overskrift: 'Reparasjon av hjelpemiddel',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'reparasjon', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nJa, i enkelte tilfeller. I utgangspunktet er det kommunen som er ansvarlig for å hjelpe deg mens hjelpemiddelet er til reparasjon.\r\n'
        },
        vekttall: 0
    },
    '47057d9b-eaa6-436d-94e4-199490250968': {
        id: '47057d9b-eaa6-436d-94e4-199490250968',
        overskrift: 'Rett til å søke uføretrygd - Bosatt i EØS',
        tags: ['AAP', 'Utland', 'Uføre'],
        innhold: {
            nb_NO: '[saksbehandler.enhet] har kommet til at [bruker.navn] bør søke om uføretrygd på grunn av varig nedsatt arbeidsevne.\r\n\r\nSiden [bruker.fornavn] er bosatt i et EØS-land, og skal ha uføretrygd fra et annet EØS-land, må [bruker.fornavn] kontakte trygdemyndighetene i bostedslandet, og få deres hjelp til å sende uføresøknaden til NAV. [bruker.fornavn] må kontakte {AKTUELLE MYNDIGHETER}. De sender så søknaden videre til NAV. Søknadsblankettene heter E 204, E 205 og E 207.\r\n\r\n[bruker.fornavn] er gjort oppmerksom på at vi kan innvilge arbeidsavklaringspenger i inntil åtte måneder mens vi behandler uføresøknaden. Dette kan [bruker.fornavn] kun få, hvis vi mottar dokumentasjon på at [bruker.fornavn] har søkt om uføretrygd via myndighetene i bostedslandet. Dokumentasjonen skal helst være at [saksbehandler.enhet] har mottatt søknaden fra myndighetene i bostedslandet. Det kan også være en bekreftelse på at myndighetene i bostedslandet behandler søknaden.\r\n\r\n[bruker.fornavn] har fått beskjed om at NAV må ha mottatt dokumentasjon på ovennevnte søknad snarest, og senest innen {OPPGI FRIST}.\r\n\r\nHvis NAV ikke mottar søknad om uføretrygd innen den oppgitte fristen, vil vi stanse arbeidsavklaringspengene.\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '2a70bc35-1446-4ed9-a6e4-e895384709c6': {
        id: '2a70bc35-1446-4ed9-a6e4-e895384709c6',
        overskrift: 'Retur av trekk fra kreditor',
        tags: ['#nøs', '#trekk#', '#retur', '#kreditor'],
        innhold: {
            nb_NO: 'Hei [bruker.navn]\n\nVi har mottatt Beløp kroner i retur fra kreditor.\nBeløpet er tilbakebetalt til deg og vil være på kontoen din om 1-2 virkedager\n\nMed vennlig hilsen\nNAV Økonomi stønad'
        },
        vekttall: 0
    },
    '019d3839-2303-4225-b6d5-dcbf528cb88d': {
        id: '019d3839-2303-4225-b6d5-dcbf528cb88d',
        overskrift: 'Saksbehandlingstid bidragssak',
        tags: ['bidrag', 'behandlingstid'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nBehandlingstiden på bidragssaker er på [ANTALL] måneder.\r\n'
        },
        vekttall: 0
    },
    'f50dd3b6-0814-426c-8cc9-49f59ef1fe52': {
        id: 'f50dd3b6-0814-426c-8cc9-49f59ef1fe52',
        overskrift: 'Saksbehandlingstid oppsettende virkning ',
        tags: ['bidrag', 'innkreving', 'behandlingstid'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nVanlig saksbehandlingstid er fire til seks uker.\r\n'
        },
        vekttall: 0
    },
    'b6fad9cd-4b36-4217-95eb-8871ff5aa0c1': {
        id: 'b6fad9cd-4b36-4217-95eb-8871ff5aa0c1',
        overskrift: 'Samværsavtale overholdes ikke',
        tags: ['bidrag', 'samvær'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDersom en av partene hevder at avtalen eller offentlig fastsatt samvær eller rettsforlik ikke blir overholdt, må den som setter fram påstanden, klart bevise at dette er tilfelle. Bevisene må komme fra nøytralt hold. I praksis vil det si fra offentlige eller private instanser som barnehage, skole og lignende. Et eksempel kan være der bidragsmottakeren legger fram dokumentasjon fra barnehagen eller skolen om at det er hun/han som kjører og henter barnet i barnehagen eller på skolen når  barnet i henhold til samværsavtalen/-avgjørelsen skulle vært hos den bidragspliktige. NAV Forvaltning må i alle tilfeller vurdere de opplysningene/bevisene som bidragsmottakeren legger fram.\r\n'
        },
        vekttall: 0
    },
    'a5389ce4-9573-4d16-a4b4-b6a9c61cd462': {
        id: 'a5389ce4-9573-4d16-a4b4-b6a9c61cd462',
        overskrift: 'Skattetrekk på barnepensjon',
        tags: ['barnepensjon', 'skatt', 'skattetrekk', 'NØP'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\n\r\nBarnepensjon er skattepliktig, men ikke trekkpliktig. For å få skattetrekk må du melde inn et ønske om frivillig trekk.  Dette gjør du via Ditt NAV på nav.no, eller per post til NAV Pensjon, postboks 6600 Etterstad, 0607 Oslo.',
            en_US: 'Hi, [bruker.navn]\n\nChild pension is taxable, but not tax deductible. To get a tax deduction, you must register a request for a voluntary deduction. You do this via Ditt NAV at nav.no, or by post to NAV Pensjon, PO Box 6600 Etterstad, 0607 Oslo.'
        },
        vekttall: 0
    },
    'b51619cd-1c79-4ca3-9fc3-6c9f1f5f2b77': {
        id: 'b51619cd-1c79-4ca3-9fc3-6c9f1f5f2b77',
        overskrift: 'Skriv til bruker, aktivitetsplan',
        tags: ['skrivtilbruker', 'aktivitetsplan'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu er innkalt til en samtale med NAV (DATO og KLOKKESLETT og STED). På dette møtet skal vi lage en aktivitetsplan, som beskriver hva du og NAV skal gjøre for at du skal komme i arbeid. Med aktivitet mener vi for eksempel jobbsøking, arbeidstrening, opplæring og behandling. Du kan forberede deg til møtet ved å lese om tiltak for å komme i jobb her: https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+%C3%A5+komme+i+jobb/Tiltak+for+a+komme+i+jobb\r\n\r\nMed vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '82e153c9-2763-4f83-807a-71411eda5f01': {
        id: '82e153c9-2763-4f83-807a-71411eda5f01',
        overskrift: 'Skriv til bruker, aktivitetsplan endring',
        tags: ['skrivtilbruker', 'aktivitetsplan', 'endring'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nNAV har mottatt opplysninger fra (FRITEKST: BRUKER, TILTAKSARRANGØR, BEHANDLER, FASTLEGE, ARBEIDSGIVER, ANDRE). Disse opplysningene betyr at vi må endre aktivitetsplanen din. Vi ønsker derfor et møte med deg.\r\n\r\nMed vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    'd91b5dba-b074-4c2d-ac2f-892ca087991e': {
        id: 'd91b5dba-b074-4c2d-ac2f-892ca087991e',
        overskrift: 'Skriv til bruker, aktivitetsplan gjennomført',
        tags: ['skrivtilbruker', 'aktivitetsplan', 'gjennomført'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu har snart gjennomført de avtalte aktivitetene som er oppført i aktivitetsplanen din. Vi vil derfor ha et møte med deg for å vurdere om du har nådd målene dine eller om vi må endre planen.\r\n\r\nMed vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]'
        },
        vekttall: 0
    },
    '43b4c04d-da22-4d80-8bed-c06b24008448': {
        id: '43b4c04d-da22-4d80-8bed-c06b24008448',
        overskrift: 'Skriv til bruker, aktivitetsplan oppfølging',
        tags: ['skrivtilbruker', 'aktivitetsplan', 'oppfølging'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu er i gang med å gjennomføre aktivitetene vi ble enige om i aktivitetsplanen din. Vi ønsker et møte med deg for å høre hvordan det går.\r\n\r\nMed vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]'
        },
        vekttall: 0
    },
    'd8e5654e-fc73-4d26-bea1-9e95a75f25aa': {
        id: 'd8e5654e-fc73-4d26-bea1-9e95a75f25aa',
        overskrift: 'Skriv til bruker, arbeidsevne',
        tags: ['skrivtilbruker', 'arbeidsevne'],
        innhold: {
            nb_NO: 'Hei [bruker.navn]\r\nJeg viser til informasjonen vår om egenvurdering og møte (DATO og KLOKKESLETT og STED). Jeg håper du er i gang med å reflektere over mulighetene dine  for arbeid.\r\nDu kan lese mer om egenvurdering og vurdering av arbeidsevne her: https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+%C3%A5+komme+i+jobb/Oppfolging+fra+NAV/Arbeidsevnevurdering\r\nHar du spørsmål knyttet til egenvurderingen, kan du svare på denne meldingen.\r\n\r\nMed vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '3914d641-8741-4016-9f1a-8b81a67fa316': {
        id: '3914d641-8741-4016-9f1a-8b81a67fa316',
        overskrift: 'Skriv til bruker, kompetanseord',
        tags: ['skrivtilbruker', 'kompetanseord'],
        innhold: {
            nb_NO: 'Hei [bruker.navn]\r\nJeg ser at CVen din mangler en god oversikt over kompetanseord. Når du legger inn kompetanseord som beskriver ferdighetene dine , får både du og NAV et bedre bilde av den kompetansen du har, noe som er nødvendig for at vi skal kunne gi deg riktig bistand.\r\nArbeidsgivere kan finne profilen på nav.no hvis de søker etter kompetanseord du har lagt inn, og dermed ta kontakt med deg om jobbmuligheter.\r\nLes mer om kompetanseord her: https://www.nav.no/no/Lokalt/Rogaland/Nyttig+a+vite/Kompetanseordbrosjyre.385419.cms\r\n\r\nMed vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    'dc1ad159-9c7b-433c-884e-fe45fa21170d': {
        id: 'dc1ad159-9c7b-433c-884e-fe45fa21170d',
        overskrift: 'Skriv til bruker, påminnelse om CV',
        tags: ['skrivtilbruker', 'påminnelse', 'CV'],
        innhold: {
            nb_NO: 'Hei [bruker.navn]\r\nJeg ser at CVen din ikke er fullstendig utfylt. Vi ber om at du oppdaterer følgende: (fritekst)\r\nSlik lager du en god CV:\r\nhttps://www.nav.no/no/Person/Arbeid/Arbeidsledig+og+jobbsoker/Jobbsokertips/Slik+lager+du+en+god+CV\r\n\r\nMed vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '63eb04e4-3252-473f-bea8-9dda340af5df': {
        id: '63eb04e4-3252-473f-bea8-9dda340af5df',
        overskrift: 'Skriv til bruker, ung arbeidssøker',
        tags: ['skrivtilbruker', 'ung_arbeidssøker', 'ungdom'],
        innhold: {
            nb_NO: 'Hei [bruker.navn]\r\nVisste du at NAV har en egen nettside for deg som er ung og på jobbjakt? Her finner du blant annet interessetester og yrkesvalgprogrammer.\r\nLes mer her: https://www.nav.no/no/Person/Arbeid/Ungdom\r\nFølg gjerne NAV Jobblyst på Facebook, hvor du kan få både gode tips og veiledning.\r\n\r\nMed vennlig hilsen\r\n[saksbehandler.navn]\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '05216298-3b2b-4367-a467-628943370178': {
        id: '05216298-3b2b-4367-a467-628943370178',
        overskrift: 'Søke innkreving av bidrag',
        tags: ['bidrag', 'innkreving'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nVi ber om at du sender oss et brev eller tar kontakt med oss på telefon 55 55 33 33 for å informere om at du også søker innkreving av bidrag.\r\n'
        },
        vekttall: 0
    },
    '04e55c8e-c5aa-4eae-a55e-007b046f274b': {
        id: '04e55c8e-c5aa-4eae-a55e-007b046f274b',
        overskrift: 'Søke om endring av bidragstrekk',
        tags: ['bidrag', 'innkreving'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nFyll ut Opplysningsblankett om økonomi for innkreving på https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=248707&veiledertype=privatperson. Opplysningsskjemaet sender du til NAV Innkreving med dokumentasjon på husstandens samlede inntekter og utgifter. En veiledning ligger i opplysningsskjemaet.\r\n'
        },
        vekttall: 0
    },
    '5e4baeee-b6bc-4c53-bf74-38f55ed6248c': {
        id: '5e4baeee-b6bc-4c53-bf74-38f55ed6248c',
        overskrift: 'Søknadsskjema på nav.no - Hjelpemidler',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'søknad', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu finner søknadsskjema på www.nav.no. Du bør ta kontakt med kommunen du bor i for å få hjelp med å søke. Hjelpemiddelsentralen kan også hjelpe deg med å fylle ut søknadsskjemaet.\r\n'
        },
        vekttall: 0
    },
    '70f1f7b5-e890-42cd-b442-1d17e6dee438': {
        id: '70f1f7b5-e890-42cd-b442-1d17e6dee438',
        overskrift: 'Status i sak',
        tags: ['status', 'saksbehandling'],
        innhold: {
            nb_NO: '[bruker.navn] lurer på status i sak om (YTELSE). Jeg har opplyst at (STATUS) og at behandlingstiden er på (ANTALL) uker. Jeg informerte også om at det er mulig å følge med på Ditt NAV for status framover.',
            nn_NO: '[bruker.navn] spør kor langt søknaden om (YTING) har kome. Søknaden er motteke (DATO) og det er (TAL) veker sakshandsamingstid. [bruker.fornavn] har fått informasjon om å følgje med på Ditt NAV for status framover.'
        },
        vekttall: 0
    },
    'baa45998-f99d-466e-bc3b-c81789839bec': {
        id: 'baa45998-f99d-466e-bc3b-c81789839bec',
        overskrift: 'Stønad til tilskudd til bil',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'bil', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu kan få ny stønad til tilskudd til bil til arbeid og utdanning hvis bilen er brukt i minst åtte år. Du kan få ny stønad til kassebil med heis eller rampe til arbeid og utdanning når den gamle bilen er minst åtte år og har gått 150 000 kilometer. Hvis du har fått stønaden til bruk i dagliglivet, må bilen være minst elleve år. Du kan søke om ny stønad tre måneder før brukstiden har gått ut.\r\n'
        },
        vekttall: 0
    },
    '6f420834-ef5f-41eb-a21e-1680f81a1184': {
        id: '6f420834-ef5f-41eb-a21e-1680f81a1184',
        overskrift: 'Støtte til reise ved reparasjon av bil',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'bil', 'reparasjon'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nNAV har ingen biler til utlån mens bilen din er til reparasjon. Hvis du bruker bil til og fra arbeid, kan du søke om å få støtte til arbeids- og utdanningsreiser den perioden du er uten bil. Du finner informasjon om dette på https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/Skjemaer/Arbeid%2C+helse+og+sykdom/Arbeids-+og+utdanningsreiser\r\n'
        },
        vekttall: 0
    },
    '946bc745-fabd-4418-ad66-fad38179120f': {
        id: '946bc745-fabd-4418-ad66-fad38179120f',
        overskrift: 'Svar på klage på restskatt - tabell er brukt av NAV og arbeidsgiver',
        tags: ['NØS', 'restskatt', 'skatt'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nDu har fått restskatt fordi det totalt er trukket for lite skatt i 20xx.\n\nVi har trukket skatt etter tabell xxxx på utbetalinger av (ytelse) foretatt i 20xx. Er det en arbeidsgiver som også har trukket deg etter tabell i 20xx?\n\nHvis du mottar utbetalinger fra flere, må du passe på at tabelltrekk kun blir brukt der du har høyest inntekt.\nSe punktet om "Flere arbeidsgivere":\nhttps://www.skatteetaten.no/person/skatt/skattekort/om-skattekortet/hvem-har-hentet/\n\nHvis tabell blir brukt hos både NAV og en arbeidsgiver, blir du trukket for lite skatt og det er risiko for at du får restskatt.\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 0
    },
    '80d46cac-b7fb-4d26-bece-33b7005f87ab': {
        id: '80d46cac-b7fb-4d26-bece-33b7005f87ab',
        overskrift: 'Svar på klage på restskatt - tabell er brukt på to ytelser fra NAV',
        tags: ['NØS', 'restskatt', 'skatt'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\n\nDu har fått restskatt fordi det totalt er trukket for lite skatt i 20xx.\n\nVi har trukket skatt etter tabell xxxx på utbetalinger av både (ytelse) og (ytelse), foretatt i 20xx.\n\nHvis du har flere ytelser fra NAV, må du sørge for at tabell kun benyttes på én av ytelsene.\nSe punktet om "Flere arbeidsgivere":\nhttps://www.skatteetaten.no/person/skatt/skattekort/om-skattekortet/hvem-har-hentet/\n\nHvis tabell blir brukt på to ytelser fra NAV, blir du trukket for lite skatt og det er risiko for at du får restskatt.\n\nDu mottar to ytelser fra NAV også nå i 20xx, jeg har derfor registrert at du fremover trekkes skatt etter prosent på (ytelse).\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 0
    },
    '03725f5c-06d9-4d3f-bfc0-63447d2f6853': {
        id: '03725f5c-06d9-4d3f-bfc0-63447d2f6853',
        overskrift: 'Tidspunkt for utbetaling av bidrag',
        tags: ['bidrag', 'innkreving', 'utbetaling'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu vil få utbetalt bidraget når innbetalingen fra den bidragspliktige er klargjort hos NAV Innkreving. Dette tar som regel tre virkedager.\r\nHvis vi ikke har kontonummeret til bidragsmottakeren, vil utbetalingen ta lengre tid.\r\nBidragspliktig må betale den 25. hver måned.\r\n'
        },
        vekttall: 0
    },
    '36cb8e09-f615-4740-81c4-6e8ce5e92031': {
        id: '36cb8e09-f615-4740-81c4-6e8ce5e92031',
        overskrift: 'Tidspunkt for utbetaling av forskudd',
        tags: ['bidrag', 'innkreving', 'utbetaling', 'forskudd'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nNår du oppfyller vilkårene for forskudd vil du normalt ha pengene på konto innen den 10. hver måned.\r\n'
        },
        vekttall: 0
    },
    'f3cc9992-e578-4f2a-a42b-9c3d3683a2c4': {
        id: 'f3cc9992-e578-4f2a-a42b-9c3d3683a2c4',
        overskrift: 'Tilbakebetaling av trukket forskudd',
        tags: ['NØS', 'dagpenger', 'forskudd', 'trekk'],
        innhold: {
            nb_NO: 'Hei\n\nDu vil få tilbakebetalt xxxx kroner i løpet av få virkedager. Du har fått tilbakebetalt alt vi har trukket deg i dagpenger som gjelder forskuddet.\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 0
    },
    '14eccc3e-cb22-4ce4-a10e-bbac0a3b8a46': {
        id: '14eccc3e-cb22-4ce4-a10e-bbac0a3b8a46',
        overskrift: 'Tilbakebetaling fra NAV',
        tags: ['trekk', 'kreditortrekk', 'tilbakebetaling', 'NØP'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\n\r\nVi mottok dokumentet om endring/stans av trekk etter at vi hadde utbetalt for denne måneden. Vi utbetaler nå differansen.'
        },
        vekttall: 0
    },
    '8590443d-71cf-4de3-a975-523ed0a568e4': {
        id: '8590443d-71cf-4de3-a975-523ed0a568e4',
        overskrift: 'Tiltak',
        tags: ['tiltak'],
        innhold: {
            nb_NO: 'med tiltak menes aktivitet som vil øke sjansene dine for å komme i arbeid.'
        },
        vekttall: 0
    },
    '80b047fb-14bd-4edd-9a42-43407d3e787d': {
        id: '80b047fb-14bd-4edd-9a42-43407d3e787d',
        overskrift: 'Underholdsbidrag og bidragsforskudd',
        tags: ['Bidrag', 'Utland', 'Barnevern'],
        innhold: {
            nb_NO: 'Hvis barnet er plassert utenfor hjemmet, får du ikke underholdsbidrag og bidragsforskudd etter hovedregelen måneden etter plasseringen.\r\n\r\nDen forelderen barnet ikke bor fast hos betaler underholdsbidrag.\r\n\r\nNAV utbetaler bidragsforskudd hver måned hvis det ikke er betalt bidrag, eller hvis bidraget er fastsatt til et lavere beløp enn det som kan gis i forskudd. Forskuddsmottakeren har plikt til å gi alle opplysninger som kan ha betydning for retten til bidragsforskudd. Bidragsmottakeren mister retten til bidragsforskudd hvis barnet er plassert i fosterhjem eller kommunal eller statlig institusjon. NAV kan kreve tilbake bidragsforskudd som er feilutbetalt.\r\n\r\nMer informasjon om underholdsbidrag/bidragsforskudd finner du på https://www.nav.no/no/Person/Familie/Barnebidrag\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    '47b76d4f-3b9e-4037-8573-02b77ad7e949': {
        id: '47b76d4f-3b9e-4037-8573-02b77ad7e949',
        overskrift: 'Utbetalinger',
        tags: ['utbetalinger'],
        innhold: {
            nb_NO: 'Du kan se utbetalingene dine  fra NAV de siste tre månedene ved å logge deg inn på Ditt NAV. Ytelser fra kommunen vises ikke i denne tjenesten'
        },
        vekttall: 0
    },
    '7ae0402b-ba94-4e55-bbfe-65dcc5e0169e': {
        id: '7ae0402b-ba94-4e55-bbfe-65dcc5e0169e',
        overskrift: 'Utbetalng til utlandet - utenlandssjekk',
        tags: ['utenlandssjekk', 'sjekk', 'utbetaling', 'NØP'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\n\r\nNår det gjelder ønsket ditt om å motta utbetalingen på utenlandssjekk, opplyser bankforbindelsen vår i Norge at dette er et produkt som fases ut og vil forsvinne helt. Vi kan derfor dessverre ikke tilby dette lenger.\r\n\r\nOverføring til utenlandsk konto er et alternativ til norsk kontonummer. Omkostningene ved overføring til utenlandsk bank (per i dag ca. 22 kroner) trekkes fra den månedlige utbetalingen. Dette tilsvarer merkostnaden det er for NAV å sende utbetalingen til utlandet sammenlignet med en overføring til en norsk konto.\r\n\r\nUtbetaling til norsk konto er den enkleste og raskeste måten å overføre utbetalingen på, og du vil da slippe gebyret for overføring til en utenlandsk konto. Du kan selv avtale med en norsk bank om faste overføringsoppdrag til en utenlandsk konto, eller benytte VISA-kort for uttak fra en norsk konto i utlandet.\r\n'
        },
        vekttall: 0
    },
    'e0ae1442-4688-4c4d-9eb8-393564122d85': {
        id: 'e0ae1442-4688-4c4d-9eb8-393564122d85',
        overskrift: 'Utgifter til underhold av barn - underholdskostnad',
        tags: ['bidrag'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nUtgiftene varierer med alderen til barnet. Foruten barnetrygd inngår\r\n- forbruksutgifter\r\n- boutgifter\r\n- tilsynsutgifter\r\n\r\nUtgiftene er fastsatt med utgangspunkt i Statens institutt for forbruksforsknings standardbudsjett. Dette budsjettet omfatter de viktigste forbruksområdene, og er ment å gi uttrykk for et nøkternt og rimelig forbruksnivå. Varene som danner grunnlag for beregningene, holder enkel god kvalitet og lav pris. Det er dessuten et langtidsbudsjett slik at det er lagt inn noe ekstra hver måned for å dekke mer sjeldne og større utgifter.\r\n'
        },
        vekttall: 0
    },
    '850ac4af-bfe4-4dc8-b83a-b6008390f8d8': {
        id: '850ac4af-bfe4-4dc8-b83a-b6008390f8d8',
        overskrift: 'Utlevering av bil',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'bil', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDu kan hente bilen når alle gjeldsdokumentene i saken er underskrevet og returnert til bilsenteret. Pant i bilen må også være registrert i Brønnøysundregisteret. Hvis du er umyndig, må Fylkesmannen ha godkjent gjeldsdokumentene før du får utlevert bilen.\r\n'
        },
        vekttall: 0
    },
    '30c165d8-9bd1-4c3d-b407-8e46a04d4a98': {
        id: '30c165d8-9bd1-4c3d-b407-8e46a04d4a98',
        overskrift: 'Utsette utlevering ',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'utsette', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nDet er mulig å utsette utleveringen av hjelpemidler. Ta kontakt med hjelpemiddelsentralen på forhånd, så avtaler vi leveringstidspunkt.\r\n'
        },
        vekttall: 0
    },
    '9244a035-71c1-4d21-aa54-6b2430561364': {
        id: '9244a035-71c1-4d21-aa54-6b2430561364',
        overskrift: 'Valuta Abetal',
        tags: ['nøs', 'nks', 'valuta', 'utbetaling', 'valutakoder', 'kontonummer'],
        innhold: {
            nb_NO: 'Du kan ikke velge valuta når du får dagpenger eller arbeidsavklaringspenger.  Du må selv dekke  ekstrakostnadene når pengene skal overføres til utlandet. Disse trekkes før du får pengene på konto. ',
            en_US: '\nYou cannot choose currency when you receive dagpenger or arbeidsavklaringspenger. You must cover the extra costs when the money is transferred abroad. These are deducted before you get the money in the account.'
        },
        vekttall: 0
    },
    '062490ca-0637-4bc7-98f7-616878713f90': {
        id: '062490ca-0637-4bc7-98f7-616878713f90',
        overskrift: 'Ved reise til utlandet',
        tags: ['hjelpemiddelsentralen', 'hjelpemidler', 'reparasjon', 'utlandet', 'hms'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nSkal du til utlandet, må du alltid informere hjelpemiddelsentralen om dette før du reiser. Det er mulig å få reparert hjelpemidler i utlandet etter avtale med oss. Vi tar ofte service på utstyr før avreise, og/eller sender med slitedeler.\r\n'
        },
        vekttall: 0
    },
    '410ae3cf-7372-42c6-abf9-67f44a510397': {
        id: '410ae3cf-7372-42c6-abf9-67f44a510397',
        overskrift: 'Vedtak om arbeidsavklaringspenger etter flytting til utlandet',
        tags: ['AAP', 'Utland', 'Eksport'],
        innhold: {
            nb_NO: '[saksbehandler.enhet] har kommet frem til at [bruker.navn] vil ha rett til arbeidsavklaringspenger etter flyttingen sin til utlandet. Godkjenningen er tatt på bakgrunn av mottatte opplysninger og tilgjengelige saksdokumenter.\r\n\r\nEtter flyttingen skal ikke [bruker.fornavn] lenger ha kontakt med det nåværende NAV-kontoret, men vil i stedet få en fast saksbehandler hos [saksbehandler.enhet], som vil ha ansvaret for oppfølgingen så lenge [bruker.fornavn] mottar arbeidsavklaringspenger. Denne overføringen vil først gjennomføres når NAV har mottatt bekreftelse på flyttingen.\r\n\r\nEtter at [bruker.fornavn] har flyttet vil [saksbehandler.enhet] ta kontakt for å utarbeide en aktivitetsplan. Aktivitetsplanen skal beskrive hva som skal til for at [bruker.fornavn] skal komme i arbeid.\r\n\r\nDet er viktig at [bruker.fornavn] gjør følgende når flyttingen er gjennomført:\r\n- Melde flyttingen til myndighetene i bostedslandet\r\n- Gi NAV skriftlig beskjed om ny bostedsadresse (dette kan også oppdateres på Ditt NAV)\r\n- {FYLL INN ANDRE AKTIVITETER}\r\n\r\n[saksbehandler.enhet]\r\n'
        },
        vekttall: 0
    },
    'ec7dc6d0-4c6d-4b71-9c7b-b5caf331541e': {
        id: 'ec7dc6d0-4c6d-4b71-9c7b-b5caf331541e',
        overskrift: 'Veiledning i hvordan søke',
        tags: ['veiledning', 'søknad'],
        innhold: {
            nb_NO: '[bruker.navn] har fått veiledning i hvordan søke om (YTELSE). Jeg har opplyst om at (TEKST).'
        },
        vekttall: 0
    },
    '2cfc0822-fadf-44f7-9037-6317c3e3c53f': {
        id: '2cfc0822-fadf-44f7-9037-6317c3e3c53f',
        overskrift: 'Virkningstidspunkt for fastsettelse av bidrag',
        tags: ['bidrag'],
        innhold: {
            nb_NO: 'Hei [bruker.fornavn]\r\nHovedregelen er at bidraget blir fastsatt fra den måneden du oppfyller vilkårene og NAV mottok søknaden, maksimalt tre år tilbake i tid.  Er det snakk om endring av bidraget er hovedregelen at bidraget endres fra måneden etter at du sendte søknad om endring til NAV. For mer informasjon om virkningstidspunktet som er fastsatt i saken din, må du ta kontakt med NAV på telefon 55 55 33 33.\r\n'
        },
        vekttall: 0
    },
    'a12864e7-2e87-4210-ae0d-7d550cfe9ac5': {
        id: 'a12864e7-2e87-4210-ae0d-7d550cfe9ac5',
        overskrift: 'Vi trenger bekreftelse før nødutbetaling',
        tags: ['NØS', 'nødutbetaling', 'utbetalingskort'],
        innhold: {
            nb_NO: 'Hei\n\nDu ønsker å få beløpet som vi har utbetalt til deg på utbetalingskort utbetalt til bankkontoen din. For at vi skal utbetale beløpet på nytt, må du bekrefte at du ikke skal heve utbetalingskortet.\n\nMed vennlig hilsen\n[saksbehandler.navn]\nNAV Økonomi stønad',
            en_US: 'Hi\n\nYou want to have the amount we paid out to you on check paid to your bank account. In order for us to repay the amount, you must confirm that you will not redeem the check.\n\nWith best regards\n[saksbehandler.navn]\nNAV Økonomi stønad'
        },
        vekttall: 0
    },
    'dd28f09a-0c18-4335-bd8d-69d8767534e5': {
        id: 'dd28f09a-0c18-4335-bd8d-69d8767534e5',
        overskrift: 'Yrkesmål',
        tags: ['yrkesmål'],
        innhold: {
            nb_NO: 'yrkesmål er det konkrete yrket som er målet for aktivitetsplanen din.'
        },
        vekttall: 0
    }
};

export default standardTeksterMock;
