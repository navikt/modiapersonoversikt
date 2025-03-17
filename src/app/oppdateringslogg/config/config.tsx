import { Normaltekst } from 'nav-frontend-typografi';
import type { OppdateringsloggInnslag } from '../OppdateringsloggContainer';
import AutofullforBarnetrygd from './img/autofullfor-barnetrygd.png';
import AvansertSokKnappBilde from './img/avansertSok-knapp.jpg';
import AvansertsokPdlsok from './img/avansertsok-pdlsok.png';
import AvansertsokTelefonnummer from './img/avansertsok-telefonnummer.png';
import AvsluttDialog from './img/avslutt-dialog.png';
import BjelleikonVarselBilde from './img/bjelleikon-varsel.jpg';
import BjelleikonBilde from './img/bjelleikon.jpg';
import ChatModia from './img/chat-modia.png';
import FiltreringSakstema from './img/filtrering-sakstema.png';
import ForbedretAvansertSok from './img/forbedret-avansertsok.jpg';
import ForeldreansvarBilde from './img/foreldreansvar1.png';
import FortlopendeJournalforing from './img/fortlopende-journalforing.png';
import Gjeldende14aVedtak from './img/gjeldende_14a-vedtak.png';
import InfomeldingBilde from './img/infomelding.jpg';
import JournalforFlere from './img/journalfor-flere.png';
import Journalforing from './img/journaloring.png';
import KassertDokumentBilde from './img/kassert.jpg';
import Kontonummersok from './img/kontonummersok.png';
import Kunnskapsbasen from './img/kunnskapsbasen.png';
import LestDatoSak from './img/lest-dato-sak.png';
import MarkeringDodeBarnBilde from './img/markering-dode-barn.png';
import MeldingsVisning from './img/meldinger.png';
import NotifikasjonKanal from './img/notifikasjon-kanal.png';
import OppdateringsloggKnappBilde from './img/oppdateringslogg-knapp.jpg';
import OppgaveDestinasjon from './img/oppgave-destinasjon.png';
import OppslagPaaInaktivIdent from './img/oppslag-paa-inaktiv-ident.png';
import Revarsling from './img/revarsling.png';
import Samtalemaler from './img/samtalemaler.png';
import VisningSikkerhetstiltak from './img/sikkerhetstiltakt-popup.png';
import SladdEnkeltmelding from './img/sladdEnkeltmelding.png';
import SladdeArsak from './img/sladde-arsak.png';
import SvarAvslutterDialog from './img/svar-avslutter-dialog.png';
import TemaHelseBilde from './img/temaHelse.jpg';
import UtenlandskIDBilde from './img/utenlandskID.jpg';
import VisittkortV2 from './img/visittkortV2.png';

export function lagOppdateringsloggConfig(): OppdateringsloggInnslag[] {
    return [
        {
            id: 1,
            tittel: 'Modia personoversikt har fått oppdateringslogg',
            dato: new Date('2020-09-25 08:00'),
            aktiv: false,
            ingress: (
                <Normaltekst>
                    Ved å trykke på bjelleikonet <img src={BjelleikonBilde} alt="bjelleikon" width="20em" /> vil du se
                    hva som er nytt i Modia personoversikt.
                </Normaltekst>
            ),
            beskrivelse: (
                <>
                    <Normaltekst>Oppdateringene vil vises her fra den nyeste til den eldste.</Normaltekst>
                    <Normaltekst>
                        Ved nye oppdateringer vil bjelleikonet{' '}
                        <img src={BjelleikonVarselBilde} alt="bjelleikon med varsel" width="20em" /> være markert med
                        rødt.
                    </Normaltekst>
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
                <Normaltekst>
                    Infomelding er melding til bruker sin innboks. Det er ikke mulig for bruker å svare på denne
                    meldingen.
                </Normaltekst>
            ),
            beskrivelse: (
                <Normaltekst>
                    Bruker vil på lik linje med de andre meldingsformene i Modia personoversikt bli varslet om ny
                    melding fra NAV på SMS, e-post og når man logger seg på Ditt NAV.
                </Normaltekst>
            ),
            src: InfomeldingBilde
        },
        {
            id: 3,
            tittel: 'Modia personoversikt har fått et nytt tema Helse',
            dato: new Date('2020-11-13 08:00'),
            aktiv: false,
            ingress: <Normaltekst>Tema Helse er tilsvarende tema Syk i skriv til oss på ditt NAV.</Normaltekst>,
            beskrivelse: (
                <Normaltekst>
                    Når bruker sender melding til NAV vil meldinger fra tema Syk på Ditt NAV havne under tema Helse i
                    Modia Personoversikt. Nå kan man velge temagruppe Helse for nye meldinger relatert til helse. Dette
                    gjelder blant annet meldinger relatert til sykemelding, AAP, grunn- og hjelpestønad,
                    yrkesskade/menerstatning etc.
                </Normaltekst>
            ),
            src: TemaHelseBilde
        },
        {
            id: 4,
            tittel: 'Nå kan du søke på Utenlandsk ID i Modia Personoversikt',
            dato: new Date('2020-11-20 11:00'),
            aktiv: false,
            ingress: <Normaltekst>Nå kan det gjøres søk på Utenlandsk ID i Avansert Søk.</Normaltekst>,
            beskrivelse: (
                <Normaltekst>
                    Søk på Utenlandsk ID kan ikke kombineres med andre søk. Det er ett frittstående søkefelt. Du finner
                    funksjonaliteten under <img src={AvansertSokKnappBilde} alt="Avansert Søk" width="20em" />
                </Normaltekst>
            ),
            src: UtenlandskIDBilde
        },
        {
            id: 5,
            tittel: 'Visning av foreldreansvar',
            dato: new Date('2021-04-08 13:00'),
            aktiv: false,
            ingress: <Normaltekst>Nå vises foreldreansvar i visittkortet</Normaltekst>,
            beskrivelse: (
                <Normaltekst>
                    Foreldreansvar handler om hvem som har ansvar for å ta seg av barnet og gi god omsorg, og om hvem
                    som har rett og plikt til å ta store personlige avgjørelser for barnet. Foreldreansvar er ikke
                    direkte knyttet til barnets bosted.
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={
                            'https://navno.sharepoint.com/sites/enhet-kontaktsenter/SitePages/Familie-Felles-Barneloven.aspx'
                        }
                    >
                        {' '}
                        Les mer om Foreldreansvar på Navet.
                    </a>{' '}
                    Foreldreansvar vil kun bli vist på barnet og ikke foreldre.
                </Normaltekst>
            ),
            src: ForeldreansvarBilde
        },
        {
            id: 6,
            tittel: 'Oppdatert oppdateringslogg-varslingen',
            dato: new Date('2021-05-03 15:00'),
            aktiv: false,
            ingress: <Normaltekst>Oppdateringsloggen har fått fikset problemet med varsling.</Normaltekst>,
            beskrivelse: (
                <Normaltekst>
                    Det var problemer med at det kom opp varsel om nye oppdateringer når det ikke var tilfellet. Dette
                    er nå løst. Hvis noen likevel opplever at dette skjer, så lag gjerne en sak i Porten slik at vi får
                    melding om det.
                </Normaltekst>
            ),
            src: OppdateringsloggKnappBilde
        },
        {
            id: 7,
            tittel: 'Markering ved døde barn',
            dato: new Date('2021-07-21 12:00'),
            aktiv: false,
            ingress: (
                <Normaltekst className="blokk-xxs">
                    Ikonet gir en tidlig indikasjon på at man bør undersøke barns status nærmere.
                </Normaltekst>
            ),
            beskrivelse: (
                <>
                    <Normaltekst>
                        Man sjekker i dag bare personens status, men dette vil muligens endres i fremtiden.
                    </Normaltekst>
                    <Normaltekst>
                        Det er derfor anbefalt å åpne visittkortet for en nærmere titt om ikonet dukker opp.
                    </Normaltekst>
                </>
            ),
            src: MarkeringDodeBarnBilde
        },
        {
            id: 8,
            tittel: 'Viser at dokument er kassert',
            dato: new Date('2021-08-19 10:00'),
            aktiv: false,
            ingress: <Normaltekst>Vi viser nå at dokument er kassert i en sak.</Normaltekst>,
            beskrivelse: (
                <Normaltekst>
                    Hvis et dokument er blitt kassert så står det i parentes bak det aktuelle dokumentet.
                </Normaltekst>
            ),
            src: KassertDokumentBilde
        },
        {
            id: 9,
            tittel: 'Endret kilde for informasjon i visittkortet',
            dato: new Date('2021-11-17 10:00'),
            aktiv: false,
            ingress: (
                <Normaltekst>
                    Visittkortet i Modia Personoversikt har frem til nå basert seg på NAVs eget personregister.
                </Normaltekst>
            ),
            beskrivelse: (
                <Normaltekst>
                    Vi har gått over til å hente opplysninger fra modernisert folkeregister. Denne overgangen medfører
                    mindre endringer i visittkortet.
                </Normaltekst>
            ),
            src: VisittkortV2
        },
        {
            id: 10,
            tittel: 'Forkortelser for barnetrygd i autofullfør',
            dato: new Date('2021-12-17 09:00'),
            aktiv: false,
            ingress: (
                <Normaltekst>Vi har lagt til to forkortelser for barnetrygd når man skal sende en melding.</Normaltekst>
            ),
            beskrivelse: (
                <Normaltekst>
                    Forkortelsene er BAUT og BAOR for hhv. utvidet barnetrygd og ordinær barnetrygd. Trykk på
                    spørsmålstegnet i meldingsboksen for mer informasjon.
                </Normaltekst>
            ),
            src: AutofullforBarnetrygd
        },
        {
            id: 11,
            tittel: 'Forkortelse for arbeidsgiver- og arbeidstakerregisteret',
            dato: new Date('2022-01-06 12:00'),
            aktiv: false,
            ingress: <Normaltekst>Vi har lagt til en ny forkortelse for Aa-registeret.</Normaltekst>,
            beskrivelse: (
                <Normaltekst>
                    Forkortelsen er AAREG, som gir teksten "arbeidsgiver- og arbeidstakerregisteret". Trykk på
                    spørsmålstegnet i meldingsboksen for mer informasjon.
                </Normaltekst>
            ),
            src: AutofullforBarnetrygd
        },
        {
            id: 12,
            tittel: 'Endringer på avansert søk',
            dato: new Date('2022-01-21 12:00'),
            aktiv: false,
            ingress: (
                <Normaltekst>
                    Hovedkilden til søket er endret, og dette kan medføre noen forskjeller på resultatet.
                </Normaltekst>
            ),
            beskrivelse: (
                <Normaltekst>
                    Det vil ikke lengre være mulig å kombinere søk på kontonummer med andre felter. Det åpnes opp for å
                    kombinere søk på utenlandsk id med andre felter.
                </Normaltekst>
            ),
            src: AvansertsokPdlsok
        },
        {
            id: 13,
            tittel: 'Ny innstilling tilgjengelig',
            dato: new Date('2022-01-31 12:00'),
            aktiv: false,
            ingress: (
                <Normaltekst>
                    Du kan nå velge standardvalget for hvor oppgave skal sendes når bruker svarer.
                </Normaltekst>
            ),
            beskrivelse: <Normaltekst>Det vil fortsatt være mulig å overstyre dette ved utsending.</Normaltekst>,
            src: OppgaveDestinasjon
        },
        {
            id: 14,
            tittel: 'Fortløpende journalføring',
            dato: new Date('2022-02-23 08:00'),
            aktiv: false,
            ingress: (
                <Normaltekst>
                    Salesforce åpner opp for fortløpende journalføring og oppretting av dokumenter.
                </Normaltekst>
            ),
            beskrivelse: (
                <>
                    <Normaltekst>
                        Når en dialog blir journalført vil dokumenter bli tilgjengelig i Gosys etter kort tid. Mens en
                        dialog er åpen for videre meldinger vil dokumenttypen være "Notat"/"N".
                    </Normaltekst>
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
                <Normaltekst>Ved oppslag av bruker med sikkerhetstiltak vil det dukke opp et popup-vindu.</Normaltekst>
            ),
            beskrivelse: (
                <>
                    <Normaltekst>
                        Vinduet vil inneholde hvilke sikkerhetstiltak bruker har og gyldighetsperiode. Informasjonen om
                        sikkerhetstiltakene vil fortsatt være tilgjengelig i visittkortet.
                    </Normaltekst>
                </>
            ),
            src: VisningSikkerhetstiltak
        },
        {
            id: 16,
            tittel: 'Avslutt dialog',
            dato: new Date('2022-03-04 14:00'),
            aktiv: false,
            ingress: <Normaltekst>Dialoger bestående av spørsmål og svar kan nå manuelt avsluttes.</Normaltekst>,
            beskrivelse: (
                <>
                    <Normaltekst>
                        Ved avslutting vil det ikke være mulig å skrive flere meldinger i dialogen for verken Nav eller
                        bruker.
                    </Normaltekst>
                </>
            ),
            src: AvsluttDialog
        },
        {
            id: 17,
            tittel: 'Filtrering på sakstema',
            dato: new Date('2022-03-30 08:00'),
            aktiv: false,
            ingress: <Normaltekst>Du kan nå filtrere på flere ulike sakstemaer.</Normaltekst>,
            beskrivelse: (
                <>
                    <Normaltekst>
                        Det gjør det mulig å se journalposter fra flere sakstemaer samtidig ved å huke av på flere
                        sakstemaer i menyen til venstre.
                    </Normaltekst>
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
                    <Normaltekst>
                        Det vil nå være mulig å journalføre en dialog selv om den allerede er journalført.
                    </Normaltekst>
                    <Normaltekst>
                        Informasjon om at melding er journalført er flyttet fra bunnen av melding til toppen av
                        meldingslisten.
                    </Normaltekst>
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
                    <Normaltekst>
                        Ved bruk av "svar" vil dialogen automatisk avsluttes, og ingen flere meldinger kan sendes i
                        dialogen. Dette gjelder både ved bruk av svar fra bruker og fra veileder/saksbehandler.
                    </Normaltekst>
                    <Normaltekst>
                        Det vil ikke bli opprettet "svar ikke mottatt" oppgaver for denne dialogen.
                    </Normaltekst>
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
                <Normaltekst>
                    Ved å sette anførselstegn rundt de delene av navn/adresse du er sikker på kan du nå avgrense søk på
                    navn/adresse. Eksempel på søk på navn med det nye søket er: "Ola" Normann. Her spesifiserer du da at
                    navnet må inneholde Ola, og unngår å få opp treff på liknende navn.
                </Normaltekst>
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
                    <Normaltekst>Det er nå mulig å se chatmeldinger fra Salesforce i Modia Personoversikt.</Normaltekst>
                    <Normaltekst>
                        Disse kan ikke besvares fra Modia, men man kan journalføre, opprette oppgave og sende til
                        sladding.
                    </Normaltekst>
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
                    <Normaltekst>
                        Notifikasjoner viser nå hvilke kanaler som har blitt brukt til å varsle bruker på lik linje som
                        tidligere varsler.
                    </Normaltekst>
                    <Normaltekst>
                        Informasjon om hvorvidt notifikasjonen er ferdigstilt er flyttet for å få plass til kanalene.
                    </Normaltekst>
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
                    <Normaltekst>
                        Valg av årsak dukker opp når man velger "Send til sladding" fra "Merk"-panelet.
                    </Normaltekst>
                    <Normaltekst>
                        Årsaken dukker opp for brukerstøtte ved håndtering av sladdingen, <br />
                        men det skal fortsatt meldes inn i porten.
                    </Normaltekst>
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
                    <Normaltekst>
                        Velg hvilke meldinger du ønsker at brukerstøtte skal behandle for sladding. <br />
                        Huk av for en eller flere meldinger, og velg årsak som tidligere.
                    </Normaltekst>
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
                    <Normaltekst>
                        Nå vil du kunne se dato for når utgående dokument er lest av bruker på{' '}
                        <a href="https://www.nav.no" target="_blank" rel="noreferrer">
                            nav.no
                        </a>{' '}
                        i saksoversikten. <br /> Alle dokument som er lest etter 12.10.22 vil få opp denne
                        informasjonen.
                    </Normaltekst>
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
                    <Normaltekst>
                        Ved oppslag av bruker med inaktiv ident vil det dukke opp et popup-vindu. Dette vinduet
                        informerer deg om at identen er inaktiv og tar deg til den aktive identen istedet.
                    </Normaltekst>
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
                    <Normaltekst>
                        Det er gjort endringer på meldingsvisning. Nå er det kun tre valg, referat, samtale og
                        infomelding. Se fagmelding på{' '}
                        <a
                            href="https://navno.sharepoint.com/sites/fag-og-ytelser-fagsystemer/SitePages/Endringer-i-Modia-personoversikt-fra-27.-mars.aspx"
                            target="_blank"
                            rel="noreferrer"
                        >
                            navet
                        </a>{' '}
                    </Normaltekst>
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
                    <Normaltekst>
                        Informasjon om revarslinger som har skjedd etter 15. mars vil nå vises i varsler. Om varsling
                        eller revarsling har feilet vises årsaken til dette.
                    </Normaltekst>
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
                    <Normaltekst>
                        Nå finner du lenke til Kunnskapsbasen NKS i hovedmenyen under andre systemer.
                    </Normaltekst>
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
                    <Normaltekst>
                        Det er nå mulig å journalføre melding fra bruker uten svar fra NAV. Merk at man vil miste
                        tilgang til innholdet i samtaler når de journalføres på et tema du ikke har tilgang til.
                    </Normaltekst>
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
                    <Normaltekst>
                        Søk etter person med kontonummer er nå fjernet fra "Avansert søk". For å søke etter personer med
                        et gitt kontonummer kan man benytte kontonummersøk i{' '}
                        <a href="https://utbetalingsportalen.intern.nav.no" target="_blank" rel="noreferrer">
                            utbetalingsportalen
                        </a>
                    </Normaltekst>
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
                    <Normaltekst>
                        Nå er alle lenker i samtalemaler oppdatert, og skal fungere. Meld gjerne fra om feil eller
                        ønsker til maler i porten.
                    </Normaltekst>
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
                    <Normaltekst>
                        Det er nå mulig å søke etter en bruker på telefonnummer. Søket støtter kun brukerens
                        telefonnummer lagret i persondataløsningen(PDL).
                    </Normaltekst>
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
                    <Normaltekst>Det er nå mulig å se om en bruker har 14a vedtak i oppfølgingsoversikten.</Normaltekst>
                </>
            ),
            src: Gjeldende14aVedtak
        }
    ];
}
