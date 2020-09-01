import { Notifikasjon } from '../../app/notifikasjon/NotifikasjonsContainer';

export function getNotifikasjon(): Notifikasjon[] {
    return [
        {
            id: '12345',
            tittel: 'Ny oppdatering',
            beskrivelse:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam vehicula ipsum a arcu cursus vitae congue. Duis at tellus at urna condimentum mattis pellentesque id. Sodales ut eu sem integer vitae justo eget magna fermentum.'
        },
        {
            id: '67891',
            tittel: 'Ny beskjed',
            beskrivelse: 'Nå kan man skrive '
        }
    ];
}
