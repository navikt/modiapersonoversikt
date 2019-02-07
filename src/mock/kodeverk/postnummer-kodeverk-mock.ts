import faker from 'faker/locale/nb_NO';

import { KodeverkResponse } from '../../models/kodeverk';

export function mockPostnummere(): KodeverkResponse {
    let postnummer = new Array(8999);
    const cities = new Array(10).fill(0).map( () => faker.address.city());

    for (let i = 1000; i < 9999; i++) {
        const city = cities[i % cities.length];
        postnummer[i - 1000] = {
            value: city,
            kodeRef: String(i),
            beskrivelse: city,
            gyldig: true
        };
    }
    return {
        kodeverk: postnummer
    };
}