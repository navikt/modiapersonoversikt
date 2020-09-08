import { NotifikasjonsType } from '../EnkeltNotifikasjon';
import { Notifikasjon } from '../NotifikasjonsContainer';
import NotifikasjonKnappBilde from './img/notifikasjon-knapp.jpg';

export const NotifikasjonerProd: Notifikasjon[] = [
    {
        id: '00001',
        tittel: 'Modia personoversikt har fått notifikasjoner',
        dato: '2020-09-08 13:42',
        ingress: 'Nå kan du se nye ting som kommer i modia. Trykk på bjelleikonet for å se hva som er nytt.',
        beskrivelse:
            'Her vil du se notifikasjoner sortert fra nyest til eldst,' +
            'og de viktigste vil komme først uavhengig av dato. Hvis noe er viktig vil det komme opp en rød boks hvor' +
            'det står Viktig. Man vil få beskjed om notifikasjonen er en ny oppdatering eller om det er en beskjed.',
        prioritet: true,
        type: NotifikasjonsType.Oppdatering,
        src: NotifikasjonKnappBilde,
        width: '100%',
        height: '100%'
    }
];
