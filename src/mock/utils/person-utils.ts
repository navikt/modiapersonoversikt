import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import moment from 'moment';

export function lagNavn(fødselsnummer: string) {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer);
    const fornavn = faker.name.firstName();
    const etternavn = faker.name.lastName();
    const mellomnavn = navfaker.random.vektetSjanse(0.5) ? faker.name.lastName() : '';

    return {
        fornavn: fornavn,
        etternavn: etternavn,
        mellomnavn: mellomnavn,
        sammensatt: `${mellomnavn} ${etternavn} ${fornavn} `
    };
}

export function getAlderFromFødselsnummer(fødselsnummer: string) {
    return moment().diff(navfaker.personIdentifikator.getFødselsdato(fødselsnummer), 'years');
}
