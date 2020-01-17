import { PersonsokRequest } from '../../models/person/personsok';
import { loggEvent } from '../../utils/frontendLogger';

export function loggPersonsok(request: PersonsokRequest) {
    const fields = {
        fornavn: !!request.fornavn,
        etternavn: !!request.etternavn,
        gatenavn: !!request.gatenavn,
        kontonummer: !!request.kontonummer,
        alderFra: !!request.alderFra,
        alderTil: !!request.alderTil,
        kommunenummer: !!request.kommunenummer,
        fodselsdatoFra: !!request.fodselsdatoFra,
        fodselsdatoTil: !!request.fodselsdatoTil,
        kjonn: !!request.kjonn,
        husnummer: !!request.husnummer,
        husbokstav: !!request.husbokstav,
        postnummer: !!request.postnummer
    };
    loggEvent('Sok', 'Personsok', undefined, fields);
}
