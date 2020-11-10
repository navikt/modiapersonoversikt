import React from 'react';
import { EnOppdateringslogg } from '../OppdateringsloggContainer';
import OppdateringsloggKnappBilde from './img/oppdateringslogg-knapp.jpg';
import BjelleikonVarselBilde from './img/bjelleikon-varsel.jpg';
import BjelleikonBilde from './img/bjelleikon.jpg';
import InfomeldingBilde from './img/infomelding.jpg';
import TemaHelseBilde from './img/temaHelse.jpg';
import { Normaltekst } from 'nav-frontend-typografi';

export const OppdateringsloggConfig: EnOppdateringslogg[] = [
    {
        id: 1,
        tittel: 'Modia personoversikt har fått oppdateringslogg',
        dato: new Date('2020-09-25 08:00'),
        aktiv: true,
        ingress: (
            <>
                Ved å trykke på bjelleikonet <img src={BjelleikonBilde} alt="bjelleikon" width="20em" /> vil du se hva
                som er nytt i Modia personoversikt.
            </>
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
            <>
                <Normaltekst>
                    Infomelding er melding til bruker sin innboks. Det er ikke mulig for bruker å svare på denne
                    meldingen.
                </Normaltekst>
            </>
        ),
        beskrivelse: (
            <>
                <Normaltekst>
                    Bruker vil på lik linje med de andre meldingsformene i Modia personoversikt bli varslet om ny
                    melding fra NAV på SMS, e-post og når man logger seg på Ditt NAV.
                </Normaltekst>
            </>
        ),
        src: InfomeldingBilde
    },
    {
        id: 3,
        tittel: 'Modia personoversikt har fått et nytt tema Helse',
        dato: new Date('2020-11-13 10:00'),
        aktiv: true,
        ingress: (
            <>
                <Normaltekst>Tema Helse er tilsvarende tema Syk i skriv til oss på ditt NAV.</Normaltekst>
            </>
        ),
        beskrivelse: (
            <>
                <Normaltekst>
                    Når bruker sender melding til NAV vil meldinger fra tema Syk på Ditt NAV havne under tema Helse i
                    Modia Personoversikt. Nå kan man velge temagruppe Helse for nye meldinger relatert til helse. Dette
                    gjelder blant annet meldinger relatert til sykemelding, AAP, grunn- og hjelpestønad,
                    yrkesskade/menerstatning etc.
                </Normaltekst>
            </>
        ),
        src: TemaHelseBilde
    }
];
