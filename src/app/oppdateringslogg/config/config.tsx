import { BodyShort, Heading, VStack } from '@navikt/ds-react';

import type { OppdateringsloggInnslag } from '../OppdateringsloggContainer';
import AutofullforBarnetrygd from './img/autofullfor-barnetrygd.png';
import AvansertSokKnappBilde from './img/avansertSok-knapp.jpg';
import AvansertsokPdlsok from './img/avansertsok-pdlsok.png';
import AvansertsokTelefonnummer from './img/avansertsok-telefonnummer.png';
import AvsluttDialog from './img/avslutt-dialog.png';
import BjelleikonBilde from './img/bjelleikon.jpg';
import BjelleikonVarselBilde from './img/bjelleikon-varsel.jpg';
import ChatModia from './img/chat-modia.png';
import FiltreringSakstema from './img/filtrering-sakstema.png';
import ForbedretAvansertSok from './img/forbedret-avansertsok.jpg';
import ForeldreansvarBilde from './img/foreldreansvar1.png';
import FortlopendeJournalforing from './img/fortlopende-journalforing.png';
import Gjeldende14aVedtak from './img/gjeldende_14a-vedtak.png';
import InfomeldingBilde from './img/infomelding.jpg';
import JournalforFlere from './img/journalfor-flere.png';
import JournalforingGenerellSak from './img/journalforing_generell_sak.png';
import Journalforing from './img/journaloring.png';
import KassertDokumentBilde from './img/kassert.jpg';
import Kontonummersok from './img/kontonummersok.png';
import Kunnskapsbasen from './img/kunnskapsbasen.png';
import LestDatoSak from './img/lest-dato-sak.png';
import MarkeringDodeBarnBilde from './img/markering-dode-barn.png';
import MeldingsVisning from './img/meldinger.png';
import NotifikasjonKanal from './img/notifikasjon-kanal.png';
import NyKommunikasjon from './img/ny-kommunikasjon-knapper.png';
import NyeYtelser from './img/nye_ytelser.png';
import NyModia from './img/nyModia.png';
import OppdateringsloggKnappBilde from './img/oppdateringslogg-knapp.jpg';
import OppdateringsloggNyttDesign from './img/oppdateringslogg-nytt-design.png';
import OppgaveDestinasjon from './img/oppgave-destinasjon.png';
import OppslagPaaInaktivIdent from './img/oppslag-paa-inaktiv-ident.png';
import Revarsling from './img/revarsling.png';
import Samtalemaler from './img/samtalemaler.png';
import VisningSikkerhetstiltak from './img/sikkerhetstiltakt-popup.png';
import SladdEnkeltmelding from './img/sladdEnkeltmelding.png';
import SladdeArsak from './img/sladde-arsak.png';
import Speil from './img/speil.png';
import SvarAvslutterDialog from './img/svar-avslutter-dialog.png';
import TemaHelseBilde from './img/temaHelse.jpg';
import UtenlandskIDBilde from './img/utenlandskID.jpg';
import VelgDialog from './img/velg-dialog.png';
import VisittkortV2 from './img/visittkortV2.png';

export function lagOppdateringsloggConfig(): OppdateringsloggInnslag[] {
    return [
        {
            id: 1,
            tittel: 'Modia personoversikt har fått oppdateringslogg',
            dato: new Date('2020-09-25 08:00'),
            aktiv: false,
            ingress: (
                <BodyShort>
                    Ved å trykke på bjelleikonet <img src={BjelleikonBilde} alt="bjelleikon" width="20em" /> vil du se
                    hva som er nytt i Modia personoversikt.
                </BodyShort>
            ),
            beskrivelse: (
                <>
                    <BodyShort>Oppdateringene vil vises her fra den nyeste til den eldste.</BodyShort>
                    <BodyShort>
                        Ved nye oppdateringer vil bjelleikonet
                        <img src={BjelleikonVarselBilde} alt="bjelleikon med varsel" width="20em" /> være markert med
                        rødt.
                    </BodyShort>
                </>
            ),
            src: OppdateringsloggKnappBilde
        },
        {
            id: 2,
            tittel: 'Modia personoversikt har fått infomelding',
            dato: new Date('2020-10-12 10:00'),
            aktiv: false,
            ingress: (
                <BodyShort>
                    Infomelding er melding til bruker sin innboks. Det er ikke mulig for bruker å svare på denne
                    meldingen.
                </BodyShort>
            ),
            beskrivelse: (
                <BodyShort>
                    Bruker vil på lik linje med de andre meldingsformene i Modia personoversikt bli varslet om ny
                    melding fra NAV på SMS, e-post og når man logger seg på Ditt NAV.
                </BodyShort>
            ),
            src: InfomeldingBilde
        },
        {
            id: 3,
            tittel: 'Modia personoversikt har fått et nytt tema Helse',
            dato: new Date('2020-11-13 08:00'),
            aktiv: false,
            ingress: <BodyShort>Tema Helse er tilsvarende tema Syk i skriv til oss på ditt NAV.</BodyShort>,
            beskrivelse: (
                <BodyShort>
                    Når bruker sender melding til NAV vil meldinger fra tema Syk på Ditt NAV havne under tema Helse i
                    Modia Personoversikt. Nå kan man velge temagruppe Helse for nye meldinger relatert til helse. Dette
                    gjelder blant annet meldinger relatert til sykemelding, AAP, grunn- og hjelpestønad,
                    yrkesskade/menerstatning etc.
                </BodyShort>
            ),
            src: TemaHelseBilde
        },
        {
            id: 4,
            tittel: 'Nå kan du søke på Utenlandsk ID i Modia Personoversikt',
            dato: new Date('2020-11-20 11:00'),
            aktiv: false,
            ingress: <BodyShort>Nå kan det gjøres søk på Utenlandsk ID i Avansert Søk.</BodyShort>,
            beskrivelse: (
                <BodyShort>
                    Søk på Utenlandsk ID kan ikke kombineres med andre søk. Det er ett frittstående søkefelt. Du finner
                    funksjonaliteten under <img src={AvansertSokKnappBilde} alt="Avansert Søk" width="20em" />
                </BodyShort>
            ),
            src: UtenlandskIDBilde
        },
        {
            id: 5,
            tittel: 'Visning av foreldreansvar',
            dato: new Date('2021-04-08 13:00'),
            aktiv: false,
            ingress: <BodyShort>Nå vises foreldreansvar i visittkortet</BodyShort>,
            beskrivelse: (
                <BodyShort>
                    Foreldreansvar handler om hvem som har ansvar for å ta seg av barnet og gi god omsorg, og om hvem
                    som har rett og plikt til å ta store personlige avgjørelser for barnet. Foreldreansvar er ikke
                    direkte knyttet til barnets bosted.
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://navno.sharepoint.com/sites/enhet-kontaktsenter/SitePages/Familie-Felles-Barneloven.aspx"
                    >
                        Les mer om Foreldreansvar på Navet.
                    </a>
                    Foreldreansvar vil kun bli vist på barnet og ikke foreldre.
                </BodyShort>
            ),
            src: ForeldreansvarBilde
        },
        {
            id: 6,
            tittel: 'Oppdatert oppdateringslogg-varslingen',
            dato: new Date('2021-05-03 15:00'),
            aktiv: false,
            ingress: <BodyShort>Oppdateringsloggen har fått fikset problemet med varsling.</BodyShort>,
            beskrivelse: (
                <BodyShort>
                    Det var problemer med at det kom opp varsel om nye oppdateringer når det ikke var tilfellet. Dette
                    er nå løst. Hvis noen likevel opplever at dette skjer, så lag gjerne en sak i Porten slik at vi får
                    melding om det.
                </BodyShort>
            ),
            src: OppdateringsloggKnappBilde
        },
        {
            id: 7,
            tittel: 'Markering ved døde barn',
            dato: new Date('2021-07-21 12:00'),
            aktiv: false,
            ingress: (
                <BodyShort>Ikonet gir en tidlig indikasjon på at man bør undersøke barns status nærmere.</BodyShort>
            ),
            beskrivelse: (
                <>
                    <BodyShort>
                        Man sjekker i dag bare personens status, men dette vil muligens endres i fremtiden.
                    </BodyShort>
                    <BodyShort>
                        Det er derfor anbefalt å åpne visittkortet for en nærmere titt om ikonet dukker opp.
                    </BodyShort>
                </>
            ),
            src: MarkeringDodeBarnBilde
        },
        {
            id: 8,
            tittel: 'Viser at dokument er kassert',
            dato: new Date('2021-08-19 10:00'),
            aktiv: false,
            ingress: <BodyShort>Vi viser nå at dokument er kassert i en sak.</BodyShort>,
            beskrivelse: (
                <BodyShort>
                    Hvis et dokument er blitt kassert så står det i parentes bak det aktuelle dokumentet.
                </BodyShort>
            ),
            src: KassertDokumentBilde
        },
        {
            id: 9,
            tittel: 'Endret kilde for informasjon i visittkortet',
            dato: new Date('2021-11-17 10:00'),
            aktiv: false,
            ingress: (
                <BodyShort>
                    Visittkortet i Modia Personoversikt har frem til nå basert seg på NAVs eget personregister.
                </BodyShort>
            ),
            beskrivelse: (
                <BodyShort>
                    Vi har gått over til å hente opplysninger fra modernisert folkeregister. Denne overgangen medfører
                    mindre endringer i visittkortet.
                </BodyShort>
            ),
            src: VisittkortV2
        },
        {
            id: 10,
            tittel: 'Forkortelser for barnetrygd i autofullfør',
            dato: new Date('2021-12-17 09:00'),
            aktiv: false,
            ingress: (
                <BodyShort>Vi har lagt til to forkortelser for barnetrygd når man skal sende en melding.</BodyShort>
            ),
            beskrivelse: (
                <BodyShort>
                    Forkortelsene er BAUT og BAOR for hhv. utvidet barnetrygd og ordinær barnetrygd. Trykk på
                    spørsmålstegnet i meldingsboksen for mer informasjon.
                </BodyShort>
            ),
            src: AutofullforBarnetrygd
        },
        {
            id: 11,
            tittel: 'Forkortelse for arbeidsgiver- og arbeidstakerregisteret',
            dato: new Date('2022-01-06 12:00'),
            aktiv: false,
            ingress: <BodyShort>Vi har lagt til en ny forkortelse for Aa-registeret.</BodyShort>,
            beskrivelse: (
                <BodyShort>
                    Forkortelsen er AAREG, som gir teksten "arbeidsgiver- og arbeidstakerregisteret". Trykk på
                    spørsmålstegnet i meldingsboksen for mer informasjon.
                </BodyShort>
            ),
            src: AutofullforBarnetrygd
        },
        {
            id: 12,
            tittel: 'Endringer på avansert søk',
            dato: new Date('2022-01-21 12:00'),
            aktiv: false,
            ingress: (
                <BodyShort>
                    Hovedkilden til søket er endret, og dette kan medføre noen forskjeller på resultatet.
                </BodyShort>
            ),
            beskrivelse: (
                <BodyShort>
                    Det vil ikke lengre være mulig å kombinere søk på kontonummer med andre felter. Det åpnes opp for å
                    kombinere søk på utenlandsk id med andre felter.
                </BodyShort>
            ),
            src: AvansertsokPdlsok
        },
        {
            id: 13,
            tittel: 'Ny innstilling tilgjengelig',
            dato: new Date('2022-01-31 12:00'),
            aktiv: false,
            ingress: (
                <BodyShort>Du kan nå velge standardvalget for hvor oppgave skal sendes når bruker svarer.</BodyShort>
            ),
            beskrivelse: <BodyShort>Det vil fortsatt være mulig å overstyre dette ved utsending.</BodyShort>,
            src: OppgaveDestinasjon
        },
        {
            id: 14,
            tittel: 'Fortløpende journalføring',
            dato: new Date('2022-02-23 08:00'),
            aktiv: false,
            ingress: (
                <BodyShort>Salesforce åpner opp for fortløpende journalføring og oppretting av dokumenter.</BodyShort>
            ),
            beskrivelse: (
                <>
                    <BodyShort>
                        Når en dialog blir journalført vil dokumenter bli tilgjengelig i Gosys etter kort tid. Mens en
                        dialog er åpen for videre meldinger vil dokumenttypen være "Notat"/"N".
                    </BodyShort>
                </>
            ),
            src: FortlopendeJournalforing
        },
        {
            id: 15,
            tittel: 'Visning av sikkerhetstiltak',
            dato: new Date('2022-02-25 16:00'),
            aktiv: false,
            ingress: (
                <BodyShort>Ved oppslag av bruker med sikkerhetstiltak vil det dukke opp et popup-vindu.</BodyShort>
            ),
            beskrivelse: (
                <>
                    <BodyShort>
                        Vinduet vil inneholde hvilke sikkerhetstiltak bruker har og gyldighetsperiode. Informasjonen om
                        sikkerhetstiltakene vil fortsatt være tilgjengelig i visittkortet.
                    </BodyShort>
                </>
            ),
            src: VisningSikkerhetstiltak
        },
        {
            id: 16,
            tittel: 'Avslutt dialog',
            dato: new Date('2022-03-04 14:00'),
            aktiv: false,
            ingress: <BodyShort>Dialoger bestående av spørsmål og svar kan nå manuelt avsluttes.</BodyShort>,
            beskrivelse: (
                <>
                    <BodyShort>
                        Ved avslutting vil det ikke være mulig å skrive flere meldinger i dialogen for verken Nav eller
                        bruker.
                    </BodyShort>
                </>
            ),
            src: AvsluttDialog
        },
        {
            id: 17,
            tittel: 'Filtrering på sakstema',
            dato: new Date('2022-03-30 08:00'),
            aktiv: false,
            ingress: <BodyShort>Du kan nå filtrere på flere ulike sakstemaer.</BodyShort>,
            beskrivelse: (
                <>
                    <BodyShort>
                        Det gjør det mulig å se journalposter fra flere sakstemaer samtidig ved å huke av på flere
                        sakstemaer i menyen til venstre.
                    </BodyShort>
                </>
            ),
            src: FiltreringSakstema
        },
        {
            id: 18,
            tittel: 'Journalføring på flere saker',
            dato: new Date('2022-04-27 14:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Det vil nå være mulig å journalføre en dialog selv om den allerede er journalført.
                    </BodyShort>
                    <BodyShort>
                        Informasjon om at melding er journalført er flyttet fra bunnen av melding til toppen av
                        meldingslisten.
                    </BodyShort>
                </>
            ),
            src: JournalforFlere
        },
        {
            id: 19,
            tittel: 'Avslutt dialog ved svar',
            dato: new Date('2022-05-20 08:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Ved bruk av "svar" vil dialogen automatisk avsluttes, og ingen flere meldinger kan sendes i
                        dialogen. Dette gjelder både ved bruk av svar fra bruker og fra veileder/saksbehandler.
                    </BodyShort>
                    <BodyShort>Det vil ikke bli opprettet "svar ikke mottatt" oppgaver for denne dialogen.</BodyShort>
                </>
            ),
            src: SvarAvslutterDialog
        },
        {
            id: 20,
            tittel: 'Forbedret Avansert Søk',
            dato: new Date('2022-06-13 08:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <BodyShort>
                    Ved å sette anførselstegn rundt de delene av navn/adresse du er sikker på kan du nå avgrense søk på
                    navn/adresse. Eksempel på søk på navn med det nye søket er: "Ola" Normann. Her spesifiserer du da at
                    navnet må inneholde Ola, og unngår å få opp treff på liknende navn.
                </BodyShort>
            ),
            src: ForbedretAvansertSok
        },
        {
            id: 21,
            tittel: 'Chat i Modia Personoversikt',
            dato: new Date('2022-06-13 11:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>Det er nå mulig å se chatmeldinger fra Salesforce i Modia Personoversikt.</BodyShort>
                    <BodyShort>
                        Disse kan ikke besvares fra Modia, men man kan journalføre, opprette oppgave og sende til
                        sladding.
                    </BodyShort>
                </>
            ),
            src: ChatModia
        },
        {
            id: 22,
            tittel: 'Vise kanaler for notifikasjoner',
            dato: new Date('2022-09-02 14:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Notifikasjoner viser nå hvilke kanaler som har blitt brukt til å varsle bruker på lik linje som
                        tidligere varsler.
                    </BodyShort>
                    <BodyShort>
                        Informasjon om hvorvidt notifikasjonen er ferdigstilt er flyttet for å få plass til kanalene.
                    </BodyShort>
                </>
            ),
            src: NotifikasjonKanal
        },
        {
            id: 23,
            tittel: 'Velge årsak til sladding',
            dato: new Date('2022-10-11 11:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Valg av årsak dukker opp når man velger "Send til sladding" fra "Merk"-panelet.
                    </BodyShort>
                    <BodyShort>
                        Årsaken dukker opp for brukerstøtte ved håndtering av sladdingen, <br />
                        men det skal fortsatt meldes inn i porten.
                    </BodyShort>
                </>
            ),
            src: SladdeArsak
        },
        {
            id: 24,
            tittel: 'Velge enkelt melding for sladding',
            dato: new Date('2022-10-11 12:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Velg hvilke meldinger du ønsker at brukerstøtte skal behandle for sladding. <br />
                        Huk av for en eller flere meldinger, og velg årsak som tidligere.
                    </BodyShort>
                </>
            ),
            src: SladdEnkeltmelding
        },
        {
            id: 25,
            tittel: 'Lest dato for utgående dokument',
            dato: new Date('2022-12-14 12:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Nå vil du kunne se dato for når utgående dokument er lest av bruker på
                        <a href="https://www.nav.no" target="_blank" rel="noreferrer">
                            nav.no
                        </a>
                        i saksoversikten. <br /> Alle dokument som er lest etter 12.10.22 vil få opp denne
                        informasjonen.
                    </BodyShort>
                </>
            ),
            src: LestDatoSak
        },
        {
            id: 26,
            tittel: 'Oppslag på inaktiv ident',
            dato: new Date('2022-12-20 12:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Ved oppslag av bruker med inaktiv ident vil det dukke opp et popup-vindu. Dette vinduet
                        informerer deg om at identen er inaktiv og tar deg til den aktive identen istedet.
                    </BodyShort>
                </>
            ),
            src: OppslagPaaInaktivIdent
        },
        {
            id: 29,
            tittel: 'Endringer på meldingsvisning',
            dato: new Date('2023-02-23 07:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Det er gjort endringer på meldingsvisning. Nå er det kun tre valg, referat, samtale og
                        infomelding. Se fagmelding på
                        <a
                            href="https://navno.sharepoint.com/sites/fag-og-ytelser-fagsystemer/SitePages/Endringer-i-Modia-personoversikt-fra-27.-mars.aspx"
                            target="_blank"
                            rel="noreferrer"
                        >
                            navet
                        </a>
                    </BodyShort>
                </>
            ),
            src: MeldingsVisning
        },
        {
            id: 30,
            tittel: 'Informasjon om revarsling',
            dato: new Date('2023-04-11 07:00'),
            aktiv: false,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Informasjon om revarslinger som har skjedd etter 15. mars vil nå vises i varsler. Om varsling
                        eller revarsling har feilet vises årsaken til dette.
                    </BodyShort>
                </>
            ),
            src: Revarsling
        },
        {
            id: 31,
            tittel: 'Lenke til Kunnskapsbasen NKS',
            dato: new Date('2024-02-20 10:00'),
            aktiv: true,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>Nå finner du lenke til Kunnskapsbasen NKS i hovedmenyen under andre systemer.</BodyShort>
                </>
            ),
            src: Kunnskapsbasen
        },
        {
            id: 32,
            tittel: 'Journalføring av melding fra bruker',
            dato: new Date('2024-02-20 12:00'),
            aktiv: true,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Det er nå mulig å journalføre melding fra bruker uten svar fra NAV. Merk at man vil miste
                        tilgang til innholdet i samtaler når de journalføres på et tema du ikke har tilgang til.
                    </BodyShort>
                </>
            ),
            src: Journalforing
        },
        {
            id: 33,
            tittel: 'Søk etter person med kontonummer',
            dato: new Date('2024-05-27 12:00'),
            aktiv: true,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Søk etter person med kontonummer er nå fjernet fra "Avansert søk". For å søke etter personer med
                        et gitt kontonummer kan man benytte kontonummersøk i
                        <a href="https://utbetalingsportalen.intern.nav.no" target="_blank" rel="noreferrer">
                            utbetalingsportalen
                        </a>
                    </BodyShort>
                </>
            ),
            src: Kontonummersok
        },
        {
            id: 34,
            tittel: 'Oppdaterte samtalemaler',
            dato: new Date('2024-07-03 12:00'),
            aktiv: true,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Nå er alle lenker i samtalemaler oppdatert, og skal fungere. Meld gjerne fra om feil eller
                        ønsker til maler i porten.
                    </BodyShort>
                </>
            ),
            src: Samtalemaler
        },
        {
            id: 36,
            tittel: 'Søk på telefonnummer',
            dato: new Date('2024-08-29 12:00'),
            aktiv: true,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        Det er nå mulig å søke etter en bruker på telefonnummer. Søket støtter kun brukerens
                        telefonnummer lagret i persondataløsningen(PDL).
                    </BodyShort>
                </>
            ),
            src: AvansertsokTelefonnummer
        },
        {
            id: 37,
            tittel: '14a vedtak',
            dato: new Date('2025-02-03 12:00'),
            aktiv: true,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>Det er nå mulig å se om en bruker har 14a vedtak i oppfølgingsoversikten.</BodyShort>
                </>
            ),
            src: Gjeldende14aVedtak
        },
        {
            id: 38,
            tittel: 'Oppdatering ytelser',
            dato: new Date('2026-01-05 12:00'),
            aktiv: true,
            ingress: null,
            beskrivelse: (
                <VStack justify="start" gap="space-16">
                    <p className="font-ax-bold">
                        Vi har de siste månedene gjort noen endringer på dataen som er tilgjengelig i Modia
                        personoversikt:
                    </p>
                    <ul className="!list-disc mb-4" aria-labelledby="header-underliste-1">
                        <ul className="!list-disc mb-4">
                            <Heading level="3" size="xsmall" id="header-underliste-1">
                                Nye ytelser inn i Modia personoversikt:
                            </Heading>
                            <li>Arbeidsavklaringspenger: fra Kelvin og Arena</li>
                            <li>Tiltakspenger: fra TPSAK og Arena</li>
                            <li>Pensjon: fra Pesys</li>
                        </ul>
                        <ul className="!list-disc" aria-labelledby="header-underliste-2">
                            <Heading level="3" size="xsmall" id="header-underliste-2">
                                Ytelser vi viser alle vedtak på, men datainnholdet er mer begrenset enn før:
                            </Heading>

                            <li>
                                Foreldrepenger (foreldrepenger, engangsstøand, svangerskapspenger): fra Infotrygd og
                                FPSAK
                            </li>
                            <li>Sykepenger: Infotrygd og Speil. Oppdateres 1. mars</li>
                        </ul>
                    </ul>
                </VStack>
            ),
            src: NyeYtelser
        },
        {
            id: 40,
            tittel: 'Informasjon om sykepenger beholdes til 1. mars',
            dato: new Date('2026-01-13 12:00'),
            aktiv: true,
            ingress: null,
            beskrivelse: (
                <>
                    <BodyShort>
                        <p className="mb-2 font-ax-bold">Dette er ikke gyldig lenger. Se ny oppdatering.</p>
                        Det er bestemt at sykepenger under ytelser vil være likt som i dag fram til 1. mars 2026.
                        <br />
                        Etter 1. mars vil ikke sykepenger lenger inneholde informasjon om sykemelding og
                        arbeidssituasjon. Det er kun utbetalingsperioder og grad for periodene som vil bli synlig i
                        Modia personoversikt. Mer informasjon finnes i andre fagsystem angående sykepenger og
                        sykefravær. Denne endringen skjer grunnet overgang fra Infotrygd til Speil. Vi jobber med å få
                        på plass mer informasjon om ytelsen på sikt.
                    </BodyShort>
                </>
            ),
            src: Speil
        },
        {
            id: 41,
            tittel: 'Rettelse: Sykepenger fra Infotrygd beholdes',
            dato: new Date('2026-02-12 12:00'),
            aktiv: true,
            ingress: null,
            beskrivelse: (
                <>
                    <p className="font-ax-bold my-2">Oppdatering fra 13.januar er ikke lenger gjeldende.</p>
                    Sykepenger fra Infotrygd vil fortsette å eksistere i Modia Personoversikt.
                    <p>
                        Det er ikke satt bestemt dato når dette skal fases ut, men sykepenger fra Infotrygd forblir i
                        hvert fall ut året. Vi jobber med å få inn vedtak frå Speil også, men datagrunnlaget fra Speil
                        vil være mer begrenset.
                    </p>
                </>
            )
        },
        {
            id: 42,
            tittel: 'Mandag 23.mars vil Modia personoversikt oppdateres',
            dato: new Date('2026-03-17 12:00'),
            aktiv: true,
            ingress: null,
            src: NyModia,
            beskrivelse: (
                <>
                    <p className="my-2">
                        Endringene er stort sett visuelle, slik at personoversikten får et mer moderne utseende. Det vil
                        også være noen funksjonelle forbedringer som vi håper forenkler bruken. Det vil fortsatt være
                        mulig å benytte seg av den gamle versjonen av personoversikten i en overgangsperiode.
                    </p>
                    <p>
                        Mer informasjon finner dere i ny brukermanual på Navet (tilgjengelig fra 23.mars), og i
                        introduksjonen som vises i systemet ved åpning 23.mars
                    </p>
                </>
            )
        },
        {
            id: 43,
            tittel: 'Ny funksjonalitet for kommunikasjon og dialog fra 18.mai',
            dato: new Date('2026-05-13 14:00'),
            aktiv: true,
            ingress: null,
            src: NyKommunikasjon,
            beskrivelse: (
                <>
                    <p className="my-2">
                        Fra og med 18.mai vil ikke meldings-panelet lenger åpne seg automatisk i Modia Personoversikt.
                        Bruk "Skriv ny melding" øverst i høyre hjørne for nye meldinger, eller "Svar" på en eksisterende
                        dialog under Kommunikasjon-fanen.
                    </p>
                    <p>
                        Endringene innføres for å hindre at meldinger blir sendt i feil tråd og at du som bruker aktivt
                        må ta et valg om du velger å skrive ny melding, eller svare. Endringen vil også føre til mer
                        plass i personoversikten de gangene du ikke har behov for å benytte dialogen.
                    </p>
                </>
            )
        },
        {
            id: 44,
            tittel: 'Forenklet utseende ved journalføring på generell sak',
            dato: new Date('2026-06-15 11:00'),
            aktiv: true,
            ingress: null,
            src: JournalforingGenerellSak,
            beskrivelse: (
                <BodyShort>
                    Ved journalføring på generell sak så trenger en kun å velge et tema. Det opprettes da en generell
                    sak i Joark på dette temaet. For å journalføre på eksisterende saker fra fagsystemer må det velges
                    en sak under fagsaker-fanen slik som tidligere.
                </BodyShort>
            )
        },
        {
            id: 45,
            tittel: 'Fjernet forhåndsvalgt dialogtype ved oppretting av ny melding',
            dato: new Date('2026-06-26 11:00'),
            aktiv: true,
            ingress: null,
            src: VelgDialog,
            beskrivelse: (
                <BodyShort>
                    Dialogtypen er ikke lenger forhåndsvalgt til referat. Du må nå ta et aktivt valg av hvilken type
                    dialog du ønsker å opprette. Dette er for å unngå at dialoger blir opprettet med feil type.
                </BodyShort>
            )
        },
        {
            id: 46,
            tittel: 'Nytt design for oppdateringsloggen',
            dato: new Date('2026-07-08 10:30'),
            aktiv: true,
            ingress: null,
            src: OppdateringsloggNyttDesign,
            beskrivelse: (
                <BodyShort>
                    Oppdateringsloggen har fått et nytt og forbedret design. Formålet med endringen er å gjøre det
                    enklere å navigere mellom innslag, enten med mus eller piltaster.
                </BodyShort>
            )
        }
    ];
}
