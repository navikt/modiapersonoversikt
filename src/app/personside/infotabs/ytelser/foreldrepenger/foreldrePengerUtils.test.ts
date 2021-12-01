import { aremark } from '../../../../../mock/persondata/aremark';
import {
    getForeldrepengerperiodeMock,
    getForeldrepengerettighetMock
} from '../../../../../mock/ytelse/foreldrepenger-mock';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import { utledFraDatoForRettighet, sorterArbeidsforholdEtterRefusjonTom } from './foreldrePengerUtils';

const randomForeldrepengerettighet = getForeldrepengerettighetMock(aremark.fnr);
const randomForeldrepengerettighetPeriode = getForeldrepengerperiodeMock(aremark.fnr);

test('finner "rettighet fra dato" fra foreldrepengerettighet', () => {
    const foreldrepengeRettighet: Foreldrepengerettighet = {
        ...randomForeldrepengerettighet,
        periode: [
            {
                ...randomForeldrepengerettighetPeriode,
                foreldrepengerFom: '2010-01-01'
            },
            {
                ...randomForeldrepengerettighetPeriode,
                foreldrepengerFom: '2011-01-01'
            }
        ]
    };

    const resultat = utledFraDatoForRettighet(foreldrepengeRettighet);

    expect(resultat.toString()).toEqual(new Date('2010-01-01').toString());
});

test('sorterer arbeidsforhold etter refusjonTom', () => {
    const foreldrepengeRettighet: Foreldrepengerettighet = {
        ...randomForeldrepengerettighet,
        arbeidsforhold: [
            {
                ...randomForeldrepengerettighet.arbeidsforhold[0],
                refusjonTom: '2010-01-01'
            },
            {
                ...randomForeldrepengerettighet.arbeidsforhold[0],
                refusjonTom: '2012-01-01'
            }
        ]
    };

    const result = sorterArbeidsforholdEtterRefusjonTom(foreldrepengeRettighet);

    expect(result[0].refusjonTom).toEqual('2012-01-01');
});
