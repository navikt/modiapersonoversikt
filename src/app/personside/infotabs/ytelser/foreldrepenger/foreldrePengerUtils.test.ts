import { aremark } from 'src/mock/persondata/aremark';
import { getForeldrepengerettighetMock, getForeldrepengerperiodeMock } from 'src/mock/ytelse/foreldrepenger-mock';
import type { Foreldrepengerettighet } from 'src/models/ytelse/foreldrepenger';
import { sorterArbeidsforholdEtterRefusjonTom, utledFraDatoForRettighet } from './foreldrePengerUtils';

const randomForeldrepengerettighet = getForeldrepengerettighetMock(aremark.personIdent);
const randomForeldrepengerettighetPeriode = getForeldrepengerperiodeMock(aremark.personIdent);

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
