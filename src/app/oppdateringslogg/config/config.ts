import { EnOppdateringslogg } from '../OppdateringsloggContainer';
import OppdateringsloggKnappBilde from './img/oppdateringslogg-knapp.jpg';

export const OppdateringsloggProd: EnOppdateringslogg[] = [
    {
        id: 1,
        tittel: 'Modia personoversikt har fått en oppdateringslogg',
        dato: new Date('2020-09-23 16:23'),
        aktiv: true,
        ingress: 'Nå kan du se nye ting som kommer i modia. Trykk på bjelleikonet for å se hva som er nytt.',
        beskrivelse:
            'Her vil du se nye oppdateringer sortert fra den nyeste til den eldste. ' +
            'Hvis det er kommet en ny oppdatering vil det komme en rød varsellampe oppe  ' +
            'i høyre hjørne av bjelleikonet.',
        src: OppdateringsloggKnappBilde
    }
];
