import { OppdateringsloggType } from '../EnkeltOppdateringslogg';
import { EnOppdateringslogg } from '../OppdateringsloggContainer';
import OppdateringsloggKnappBilde from './img/oppdateringslogg-knapp.jpg';

export const OppdateringsloggProd: EnOppdateringslogg[] = [
    {
        id: 1,
        tittel: 'Modia personoversikt har fått en oppdateringslogg',
        dato: new Date('2020-09-14 14:07'),
        aktiv: true,
        ingress: 'Nå kan du se nye ting som kommer i modia. Trykk på bjelleikonet for å se hva som er nytt.',
        beskrivelse:
            'Her vil du se notifikasjoner sortert fra nyest til eldst,' +
            'og de viktigste vil komme først uavhengig av dato. Hvis noe er viktig vil det komme opp en rød boks hvor' +
            'det står Viktig. Man vil få beskjed om notifikasjonen er en ny oppdatering eller om det er en beskjed.',
        prioritet: true,
        type: OppdateringsloggType.Oppdatering,
        src: OppdateringsloggKnappBilde
    }
];
