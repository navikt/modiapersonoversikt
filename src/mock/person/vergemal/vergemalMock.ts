import faker from 'faker/locale/nb_NO';

import navfaker from 'nav-faker';

import { Verge } from '../../../models/vergemal/vergemal';
import { aremark } from '../aremark';
import { getSistOppdatert, vektetSjanse } from '../../utils/mock-utils';
import { lagNavn } from '../../utils/person-utils';

const VERGESAKSTYPER = [
    'ensligMindreaarigAsylsøker',
    'ensligMindreaarigFlyktning',
    'voksen',
    'midlertidigForVoksen',
    'mindreaarig',
    'midlertidigForMindreaarig',
    'forvaltningUtenforVergemaal',
    'stadfestetFremtidsfullmakt',
    undefined
];

const OMFANGTYPER = [
    'utlendingssakerPersonligeOgOekonomiskeInteresser',
    'personligeOgOekonomiskeInteresser',
    'oekonomiskeInteresser',
    'personligeInteresser'
];

export function mockVergemal(fødselsnummer: string): Verge[] {
    if (fødselsnummer === aremark.fødselsnummer) {
        return getAremarkVerge();
    }
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer);
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

function getVerge(): Verge {
    const vergesFødselsnummer = navfaker.personIdentifikator.myndigFødselsnummer();
    const vergemålManglerVergeData = vektetSjanse(faker, 0.2);
    return {
        ident: vergemålManglerVergeData ? undefined : vergesFødselsnummer,
        vergesakstype: getTilfeldigVergesakstype(),
        omfang: vektetSjanse(faker, 0.5) ? getTilfeldigOmfangtype() : undefined,
        gyldighetstidspunkt: getTilfeldigGyldighetstidspunkt(),
        opphoerstidspunkt: getTilfeldigOpphoersTidspunkt(),
        navn: vergemålManglerVergeData ? undefined : lagNavn(vergesFødselsnummer),
        embete: getTilfeldigEmbete()
    };
}

function getTilfeldigVergesakstype(): string | undefined {
    return VERGESAKSTYPER[faker.random.number(VERGESAKSTYPER.length - 1)];
}

function getTilfeldigOmfangtype(): string | undefined {
    return OMFANGTYPER[faker.random.number(OMFANGTYPER.length - 1)];
}

function getTilfeldigEmbete(): string | undefined {
    return 'Fylkesmannen i ' + faker.address.city();
}

function getTilfeldigGyldighetstidspunkt() {
    return vektetSjanse(faker, 0.8) ? getSistOppdatert() : undefined;
}

function getTilfeldigOpphoersTidspunkt() {
    return vektetSjanse(faker, 0.8) ? getSistOppdatert() : null;
}

function getAremarkVerge() {
    return [
        {
            ident: '21042900076',
            vergesakstype: 'voksen',
            omfang: 'personligeOgOekonomiskeInteresser',
            gydlighetstidspunkt: '2016-03-27T18:16:49+02:00',
            opphoerstidspunkt: '2013-06-30T11:50:13+02:00',
            navn: {
                fornavn: 'Simen',
                etternavn: 'Solli',
                mellomnavn: '',
                sammensatt: ' Solli Simen'
            },
            embete: 'Fylkesmannen i Troms og Finnmark'
        }
    ];
}
