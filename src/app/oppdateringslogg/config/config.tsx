import React from 'react';
import { EnOppdateringslogg } from '../OppdateringsloggContainer';
import OppdateringsloggKnappBilde from './img/oppdateringslogg-knapp.jpg';
import BjelleikonVarselBilde from './img/bjelleikon-varsel.jpg';
import BjelleikonBilde from './img/bjelleikon.jpg';
import InfomeldingBilde from './img/infomelding.jpg';
import TemaHelseBilde from './img/temaHelse.jpg';
import AvansertSokKnappBilde from './img/avansertSok-knapp.jpg';
import UtenlandskIDBilde from './img/utenlandskID.jpg';
import ForeldreansvarBilde from './img/foreldreansvar1.png';
import MarkeringDodeBarnBilde from './img/markering-dode-barn.png';
import { Normaltekst } from 'nav-frontend-typografi';

export const OppdateringsloggConfig: EnOppdateringslogg[] = [
    {
        id: 1,
        tittel: 'Modia personoversikt har fått oppdateringslogg',
        dato: new Date('2020-09-25 08:00'),
        aktiv: true,
        ingress: (
            <Normaltekst>
                Ved å trykke på bjelleikonet <img src={BjelleikonBilde} alt="bjelleikon" width="20em" /> vil du se hva
                som er nytt i Modia personoversikt.
            </Normaltekst>
        ),
        beskrivelse: (
            <>
                <Normaltekst>Oppdateringene vil vises her fra den nyeste til den eldste.</Normaltekst>
                <Normaltekst>
                    Ved nye oppdateringer vil bjelleikonet{' '}
                    <img src={BjelleikonVarselBilde} alt="bjelleikon med varsel" width="20em" /> være markert med rødt.
                </Normaltekst>
            </>
        ),
        src: OppdateringsloggKnappBilde
    },
    {
        id: 2,
        tittel: 'Modia personoversikt har fått infomelding',
        dato: new Date('2020-10-12 10:00'),
        aktiv: true,
        ingress: (
            <Normaltekst>
                Infomelding er melding til bruker sin innboks. Det er ikke mulig for bruker å svare på denne meldingen.
            </Normaltekst>
        ),
        beskrivelse: (
            <Normaltekst>
                Bruker vil på lik linje med de andre meldingsformene i Modia personoversikt bli varslet om ny melding
                fra NAV på SMS, e-post og når man logger seg på Ditt NAV.
            </Normaltekst>
        ),
        src: InfomeldingBilde
    },
    {
        id: 3,
        tittel: 'Modia personoversikt har fått et nytt tema Helse',
        dato: new Date('2020-11-13 08:00'),
        aktiv: true,
        ingress: <Normaltekst>Tema Helse er tilsvarende tema Syk i skriv til oss på ditt NAV.</Normaltekst>,
        beskrivelse: (
            <Normaltekst>
                Når bruker sender melding til NAV vil meldinger fra tema Syk på Ditt NAV havne under tema Helse i Modia
                Personoversikt. Nå kan man velge temagruppe Helse for nye meldinger relatert til helse. Dette gjelder
                blant annet meldinger relatert til sykemelding, AAP, grunn- og hjelpestønad, yrkesskade/menerstatning
                etc.
            </Normaltekst>
        ),
        src: TemaHelseBilde
    },
    {
        id: 4,
        tittel: 'Nå kan du søke på Utenlandsk ID i Modia Personoversikt',
        dato: new Date('2020-11-20 11:00'),
        aktiv: true,
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
        aktiv: true,
        ingress: <Normaltekst>Nå vises foreldreansvar i visittkortet</Normaltekst>,
        beskrivelse: (
            <Normaltekst>
                Foreldreansvar handler om hvem som har ansvar for å ta seg av barnet og gi god omsorg, og om hvem som
                har rett og plikt til å ta store personlige avgjørelser for barnet. Foreldreansvar er ikke direkte
                knyttet til barnets bosted.
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
        aktiv: true,
        ingress: <Normaltekst>Oppdateringsloggen har fått fikset problemet med varsling.</Normaltekst>,
        beskrivelse: (
            <Normaltekst>
                Det var problemer med at det kom opp varsel om nye oppdateringer når det ikke var tilfellet. Dette er nå
                løst. Hvis noen likevel opplever at dette skjer, så lag gjerne en sak i Porten slik at vi får melding om
                det.
            </Normaltekst>
        ),
        src: OppdateringsloggKnappBilde
    },
    {
        id: 7,
        tittel: 'Markering ved døde barn',
        dato: new Date('2021-07-21 12:00'),
        aktiv: true,
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
    }
];
