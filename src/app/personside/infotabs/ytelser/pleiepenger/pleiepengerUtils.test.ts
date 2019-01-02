import { Arbeidsforhold, Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import { getMockPleiepengerettighet } from '../../../../../mock/ytelse/pleiepenger-mock';
import {
    getAlleArbiedsforholdSortert,
    getSistePeriodeForPleiepengerettighet,
    getSisteVedtakForPleiepengerettighet, sorterArbeidsforholdEtterRefusjonTom
} from './pleiepengerUtils';

const mockpleiepengeRettighet = getMockPleiepengerettighet('10108000398');
const mockPeriode = mockpleiepengeRettighet.perioder[0];
const mockVedtak = mockpleiepengeRettighet.perioder[0].vedtak[0];

const testRettighet: Pleiepengerettighet = {
    ...mockpleiepengeRettighet,
    perioder: [{
        ...mockPeriode,
        fom: '2000-01-01',
        vedtak: [{
            ...mockVedtak,
            periode: {
                fom: '2000-01-01',
                tom: '2001-01-01'
            }
        }, {
            ...mockVedtak,
            periode: {
                fom: '2002-01-01',
                tom: '2003-01-01'
            }
        }]
    }, {
        ...mockPeriode,
        fom: '2010-01-01',
        vedtak: [{
            ...mockVedtak,
            periode: {
                fom: '2010-01-01',
                tom: '2011-01-01'
            }
        }, {
            ...mockVedtak,
            periode: {
                fom: '2008-01-01',
                tom: '2009-01-01'
            }
        }]
    }],
};

test('get siste periode fra pleiepengerettighet', () => {
    const pleiepengePeriode = getSistePeriodeForPleiepengerettighet(testRettighet);

    expect(pleiepengePeriode.fom).toEqual('2010-01-01');
});

test('get siste vedtak fra pleiepengerettighet', () => {
    const vedtak = getSisteVedtakForPleiepengerettighet(testRettighet);

    expect(vedtak.periode).toEqual({fom: '2010-01-01', tom: '2011-01-01'});
});

describe('arbeidsforhold i pleiepengerettighet', () => {
    const mockArbeidsForhold: Arbeidsforhold = mockPeriode.arbeidsforhold[0];

    const rettighetMedArbeidsforhold: Pleiepengerettighet = {
        ...testRettighet,
        perioder: [
            {
                ...mockPeriode,
                arbeidsforhold: [
                    {
                        ...mockArbeidsForhold,
                        refusjonTom: '2010-01-01'
                    }, {
                        ...mockArbeidsForhold,
                        refusjonTom: '2011-01-01'
                    }
                ]
            }, {
                ...mockPeriode,
                arbeidsforhold: [
                    {
                        ...mockArbeidsForhold,
                        refusjonTom: '2012-01-01'
                    }, {
                        ...mockArbeidsForhold,
                        refusjonTom: '2009-01-01'
                    }
                ]
            }
        ]
    };

    test('henter ut alle arbeidsforhold fra pleiepengerrettighet', () => {
        const arbeidsForhold = getAlleArbiedsforholdSortert(rettighetMedArbeidsforhold);

        expect(arbeidsForhold).toHaveLength(4);
    });

    test('sorterer arbeidsforhold etter refusjonsdato', () => {
        const arbeidsForhold = getAlleArbiedsforholdSortert(rettighetMedArbeidsforhold);
        const sortert = sorterArbeidsforholdEtterRefusjonTom(arbeidsForhold);

        expect(sortert[0].refusjonTom).toEqual('2012-01-01');
    });
});
