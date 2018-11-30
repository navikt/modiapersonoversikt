import {
    getForeldrepengerperiodeMock,
    getForeldrepengerrettighetMock
} from '../../../../../mock/ytelse/foreldrepenger-mock';
import { aremark } from '../../../../../mock/person/aremark';
import { Foreldrepengerrettighet } from '../../../../../models/ytelse/foreldrepenger';
import { utledMaksDato, utledFraDatoForRettighet } from './foreldrePengerUtils';
import { datoVerbose } from '../../utbetalinger/utils/utbetalingerUtils';

const randomForeldrepengerettighet = getForeldrepengerrettighetMock(aremark.fødselsnummer);
const randomForeldrepengerettighetPeriode = getForeldrepengerperiodeMock(aremark.fødselsnummer);

test('finner "rettighet fra dato" fra foreldrepengerettighet', () => {

    const foreldrepengeRettighet: Foreldrepengerrettighet = {
        ...randomForeldrepengerettighet,
        periode: [{
            ...randomForeldrepengerettighetPeriode,
            foreldrepengerFom: '2010-01-01'
        }, {
            ...randomForeldrepengerettighetPeriode,
            foreldrepengerFom: '2011-01-01'
        }]
    };

    const resultat = utledFraDatoForRettighet(foreldrepengeRettighet);

    expect(resultat.toString()).toEqual(new Date('2010-01-01').toString());
});

test('Finn maksdato fra foreldrepengerettighet', () => {
    const foreldrepengerettighet: Foreldrepengerrettighet = {
        ...randomForeldrepengerettighet,
        periode: [{
            ...randomForeldrepengerettighetPeriode,
            kommendeUtbetalinger: [{
                ...randomForeldrepengerettighetPeriode.kommendeUtbetalinger[0],
                vedtak: {
                    fra: '2011-01-01',
                    til: '2012-01-01'
                }
            }, {
                ...randomForeldrepengerettighetPeriode.kommendeUtbetalinger[0],
                vedtak: {
                    fra: '2009-01-01',
                    til: '2010-01-01'
                }
            }]
        }]
    };

    const resultat: string = utledMaksDato(foreldrepengerettighet);

    expect(resultat).toEqual(datoVerbose('2012-01-01').sammensatt);
});

test('Kaster feil og returnerer null hvis kommende utbetaling er uten vedtak', () => {
    console.error = jest.fn(() => null);
    const foreldrepengerettighet: Foreldrepengerrettighet = {
        ...randomForeldrepengerettighet,
        periode: [{
            ...randomForeldrepengerettighetPeriode,
            kommendeUtbetalinger: [{
                ...randomForeldrepengerettighetPeriode.kommendeUtbetalinger[0],
                vedtak: undefined
            }]
        }]
    };

    const resultat: string = utledMaksDato(foreldrepengerettighet);

    expect(resultat).toEqual('Mangler data');
});