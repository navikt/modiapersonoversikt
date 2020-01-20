import { PersonsokRequest } from '../../models/person/personsok';
import { loggEvent } from '../../utils/frontendLogger';

export function loggPersonsok(request: PersonsokRequest) {
    const fields = {
        fornavn: !!request.fornavn ? 1 : 0,
        etternavn: !!request.etternavn ? 1 : 0,
        gatenavn: !!request.gatenavn ? 1 : 0,
        kontonummer: !!request.kontonummer ? 1 : 0,
        alderFra: !!request.alderFra ? 1 : 0,
        alderTil: !!request.alderTil ? 1 : 0,
        kommunenummer: !!request.kommunenummer ? 1 : 0,
        fodselsdatoFra: !!request.fodselsdatoFra ? 1 : 0,
        fodselsdatoTil: !!request.fodselsdatoTil ? 1 : 0,
        kjonn: !!request.kjonn ? 1 : 0,
        husnummer: !!request.husnummer ? 1 : 0,
        husbokstav: !!request.husbokstav ? 1 : 0,
        postnummer: !!request.postnummer ? 1 : 0
    };
    loggEvent('Sok', 'Personsok', undefined, fields);
}
