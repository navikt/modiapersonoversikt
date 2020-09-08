import { Notifikasjon } from '../../app/notifikasjon/NotifikasjonsContainer';
import { NotifikasjonsType } from '../../app/notifikasjon/EnkeltNotifikasjon';
import moment from 'moment';
import faker from 'faker/locale/nb_NO';
import { backendDatoTidformat } from '../../utils/date-utils';

export function getNotifikasjon(): Notifikasjon[] {
    return [
        {
            id: '12345',
            tittel: 'Ny oppdatering',
            dato: moment(faker.date.recent(40)).format(backendDatoTidformat),
            ingress: 'Vi har laget en ny print-ut knapp',
            beskrivelse:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam vehicula ipsum a arcu cursus vitae congue. Duis at tellus at urna condimentum mattis pellentesque id. Sodales ut eu sem integer vitae justo eget magna fermentum.',
            prioritet: false,
            type: NotifikasjonsType.Oppdatering
        },
        {
            id: '67891',
            tittel: 'Ny beskjed',
            dato: moment(faker.date.recent(60)).format(backendDatoTidformat),
            ingress: 'Nå kan man gi foskudd på dagpenger',
            beskrivelse: 'Nå kan man skrive ',
            prioritet: true,
            type: NotifikasjonsType.Beskjed
        },
        {
            id: '82371',
            tittel: 'Ny oppdatering',
            dato: moment(faker.date.recent(80)).format(backendDatoTidformat),
            ingress: 'Vi har laget en notifikasjonsknapp',
            beskrivelse:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor id eu nisl nunc mi. Tempor commodo ullamcorper a lacus. Massa tincidunt dui ut ornare lectus sit amet est. Purus gravida quis blandit turpis cursus in hac habitasse. Id aliquet risus feugiat in ante metus dictum. Est velit egestas dui id ornare arcu odio ut. Consequat ac felis donec et odio. Sit amet justo donec enim diam vulputate ut pharetra. Volutpat ac tincidunt vitae semper quis lectus nulla. Porttitor leo a diam sollicitudin tempor. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Euismod quis viverra nibh cras.\n' +
                '\n' +
                'Eget nullam non nisi est sit amet. Velit ut tortor pretium viverra suspendisse potenti nullam ac. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Tellus cras adipiscing enim eu turpis egestas pretium. Facilisi cras fermentum odio eu feugiat. Dolor magna eget est lorem ipsum dolor sit. Sit amet commodo nulla facilisi nullam. Nulla pellentesque dignissim enim sit amet venenatis urna cursus. In mollis nunc sed id semper risus in. Vel eros donec ac odio tempor orci dapibus ultrices in. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Ut ornare lectus sit amet. Quis auctor elit sed vulputate mi sit amet. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Non odio euismod lacinia at quis risus. Purus viverra accumsan in nisl. Mauris augue neque gravida in fermentum et.',
            prioritet: false,
            type: NotifikasjonsType.Oppdatering
        },
        {
            id: '53478',
            tittel: 'Ny oppdatering',
            dato: moment(faker.date.recent(30)).format(backendDatoTidformat),
            ingress: 'Vi har laget en notifikasjonsknapp',
            beskrivelse:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor id eu nisl nunc mi. Tempor commodo ullamcorper a lacus. Massa tincidunt dui ut ornare lectus sit amet est. Purus gravida quis blandit turpis cursus in hac habitasse. Id aliquet risus feugiat in ante metus dictum. Est velit egestas dui id ornare arcu odio ut. Consequat ac felis donec et odio. Sit amet justo donec enim diam vulputate ut pharetra. Volutpat ac tincidunt vitae semper quis lectus nulla. Porttitor leo a diam sollicitudin tempor. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Euismod quis viverra nibh cras.\n' +
                '\n' +
                'Eget nullam non nisi est sit amet. Velit ut tortor pretium viverra suspendisse potenti nullam ac. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Tellus cras adipiscing enim eu turpis egestas pretium. Facilisi cras fermentum odio eu feugiat. Dolor magna eget est lorem ipsum dolor sit. Sit amet commodo nulla facilisi nullam. Nulla pellentesque dignissim enim sit amet venenatis urna cursus. In mollis nunc sed id semper risus in. Vel eros donec ac odio tempor orci dapibus ultrices in. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Ut ornare lectus sit amet. Quis auctor elit sed vulputate mi sit amet. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Non odio euismod lacinia at quis risus. Purus viverra accumsan in nisl. Mauris augue neque gravida in fermentum et.',
            prioritet: false,
            type: NotifikasjonsType.Oppdatering
        }
    ];
}
