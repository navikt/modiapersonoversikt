import faker from 'faker/locale/nb_NO';

import navfaker from 'nav-faker';

import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';
import { Verge } from '../../models/personPdl/verge';
import { Navn } from '../../models/personPdl/person';

const VERGESAKSTYPER = [
    'ensligMindreaarigAsylsøker',
    'ensligMindreaarigFlyktning',
    'voksen',
    'midlertidigForVoksen',
    'mindreaarig',
    'midlertidigForMindreaarig',
    'forvaltningUtenforVergemaal',
    'stadfestetFremtidsfullmakt',
    null
];

const OMFANGTYPER = [
    'utlendingssakerPersonligeOgOekonomiskeInteresser',
    'personligeOgOekonomiskeInteresser',
    'oekonomiskeInteresser',
    'personligeInteresser'
];

export function mockVergemal(fodselsnummer: string): Verge[] {
    if (fodselsnummer === '10108000398') {
        return getAremarkVerge();
    }
    faker.seed(Number(fodselsnummer));
    navfaker.seed(fodselsnummer);
    if (vektetSjanse(faker, 0.7)) {
        return [];
    }
    return getVergemal();
}

function getVergemal() {
    const antallVerger = faker.random.number(3);
    let verger = [];
    for (let i = 0; i < antallVerger; i++) {
        verger.push(getVerge());
    }
    return verger;
}

function lagNavn(): Navn {
    return {
        fornavn: faker.name.firstName(),
        mellomnavn: null,
        etternavn: faker.name.lastName()
    };
}

function getVerge(): Verge {
    const vergesFodselsnummer = navfaker.personIdentifikator.myndigFødselsnummer();
    const vergemaalManglerVergeData = vektetSjanse(faker, 0.2);
    const navn: Navn | null = vergemaalManglerVergeData ? null : lagNavn();

    return {
        ident: vergemaalManglerVergeData ? null : vergesFodselsnummer,
        navn: navn,
        vergesakstype: getTilfeldigVergesakstype(),
        omfang: vektetSjanse(faker, 0.5) ? getTilfeldigOmfangtype() : null,
        embete: getTilfeldigEmbete(),
        gyldighetstidspunkt: getTilfeldigGyldighetstidspunkt(),
        opphoerstidspunkt: getTilfeldigOpphoersTidspunkt()
    };
}

function getTilfeldigVergesakstype(): string | null {
    const vergesakstype = VERGESAKSTYPER[faker.random.number(VERGESAKSTYPER.length - 1)];
    if (!vergesakstype) {
        return null;
    }
    return vergesakstype;
}

function getTilfeldigOmfangtype(): string | null {
    const omfang = OMFANGTYPER[faker.random.number(OMFANGTYPER.length - 1)];
    if (!omfang) {
        return null;
    }
    return omfang;
}

function getTilfeldigEmbete(): string {
    return 'Fylkesmannen i ' + faker.address.city();
}

function getTilfeldigGyldighetstidspunkt() {
    return vektetSjanse(faker, 0.8) ? new Date(getSistOppdatert()) : null;
}

function getTilfeldigOpphoersTidspunkt() {
    return vektetSjanse(faker, 0.8) ? new Date(getSistOppdatert()) : null;
}

function getAremarkVerge(): Verge[] {
    return [
        {
            ident: '21042900076',
            navn: {
                fornavn: 'Simen',
                mellomnavn: null,
                etternavn: 'Solli'
            },
            vergesakstype: 'voksen',
            omfang: 'personligeOgOekonomiskeInteresser',
            embete: 'Fylkesmannen i Troms og Finnmark',
            gyldighetstidspunkt: new Date('2016-03-27'),
            opphoerstidspunkt: new Date('2013-06-30')
        }
    ];
}
