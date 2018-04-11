import * as faker from 'faker/locale/nb_NO';

import { Kontaktinformasjon } from '../models/kontaktinformasjon';
import { aremark, getPerson } from './person-mock';

export function getKontaktinformasjon(fødselsnummer: string): Kontaktinformasjon {
    if (fødselsnummer === aremark.fødselsnummer) {
        return {

        };
    } else {
        const personData = getPerson(fødselsnummer);
        faker.seed(Number(fødselsnummer));
        return {
            epost: {
                value: faker.internet.email(personData.navn.fornavn, personData.navn.etternavn),
                sistOppdatert: '27.12.12'
            }
        };
    }
}
