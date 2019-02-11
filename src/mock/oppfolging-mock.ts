import faker from 'faker/locale/nb_NO';
import { AnsattEnhet, Oppfolging, Saksbehandler } from '../models/oppfolging';

export function getMockOppfølging(fødselsnummer: string): Oppfolging {
    faker.seed(Number(fødselsnummer));

    return {
        erUnderOppfølging: faker.random.boolean(),
        veileder: getSaksbehandler(),
        enhet: getAnsattEnhet()
    };
}

function getSaksbehandler(): Saksbehandler {
    return {
        ident: 'Z0000001'
    };
}

function getAnsattEnhet(): AnsattEnhet {
    return {
        id: 'E0001',
        navn: faker.company.companyName(),
        status: 'ESTAT'
    };
}