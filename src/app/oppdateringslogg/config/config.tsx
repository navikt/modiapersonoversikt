import React from 'react';
import { EnOppdateringslogg } from '../OppdateringsloggContainer';
import OppdateringsloggKnappBilde from './img/oppdateringslogg-knapp.jpg';
import BjelleikonVarselBilde from './img/bjelleikon-varsel.jpg';
import BjelleikonBilde from './img/bjelleikon.jpg';
import { Normaltekst } from 'nav-frontend-typografi';

export const OppdateringsloggProd: EnOppdateringslogg[] = [
    {
        id: 1,
        tittel: 'Modia personoversikt har fått oppdateringslogg',
        dato: new Date('2020-09-24 14:15'),
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
    }
];
