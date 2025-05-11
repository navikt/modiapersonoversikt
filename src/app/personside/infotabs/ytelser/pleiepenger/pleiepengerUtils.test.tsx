import { act } from '@testing-library/react';
import { getMockPleiepengerettighet } from 'src/mock/ytelse/pleiepenger-mock';
import type { Arbeidsforhold } from 'src/models/ytelse/arbeidsforhold';
import type { Pleiepengerettighet } from 'src/models/ytelse/pleiepenger';
import { renderWithProviders } from '../../../../../test/Testprovider';
import Pleiepenger from './Pleiepenger';
import {
    getAlleArbiedsforholdSortert,
    getSistePeriodeForPleiepengerettighet,
    getSisteVedtakForPleiepengerettighet,
    sorterArbeidsforholdEtterRefusjonTom
} from './pleiepengerUtils';

const mockpleiepengeRettighet = getMockPleiepengerettighet('10108000398');
const mockPeriode = mockpleiepengeRettighet.perioder[0];
const mockVedtak = mockpleiepengeRettighet.perioder[0].vedtak[0];

const testRettighet: Pleiepengerettighet = {
    ...mockpleiepengeRettighet,
    perioder: [
        {
            ...mockPeriode,
            fom: '2000-01-01',
            vedtak: [
                {
                    ...mockVedtak,
                    periode: {
                        fom: '2000-01-01',
                        tom: '2001-01-01'
                    }
                },
                {
                    ...mockVedtak,
                    periode: {
                        fom: '2002-01-01',
                        tom: '2003-01-01'
                    }
                }
            ]
        },
        {
            ...mockPeriode,
            fom: '2010-01-01',
            vedtak: [
                {
                    ...mockVedtak,
                    periode: {
                        fom: '2010-01-01',
                        tom: '2011-01-01'
                    }
                },
                {
                    ...mockVedtak,
                    periode: {
                        fom: '2008-01-01',
                        tom: '2009-01-01'
                    }
                }
            ]
        }
    ]
};

test('get siste periode fra pleiepengerettighet returner', () => {
    const pleiepengePeriode = getSistePeriodeForPleiepengerettighet(testRettighet);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(pleiepengePeriode.fom).toEqual('2010-01-01');
});

test('get siste vedtak fra pleiepengerettighet', () => {
    const vedtak = getSisteVedtakForPleiepengerettighet(testRettighet);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(vedtak.periode).toEqual({ fom: '2010-01-01', tom: '2011-01-01' });
});

test('get siste vedtak fra pleiepengerettighet returnerer undefined dersom ingen vedtak finnes', () => {
    const testRettighetUtenVedtak: Pleiepengerettighet = {
        ...testRettighet,
        perioder: [
            {
                ...testRettighet.perioder[0],
                vedtak: []
            }
        ]
    };
    const vedtak = getSisteVedtakForPleiepengerettighet(testRettighetUtenVedtak);

    expect(vedtak).toBe(undefined);
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
                    },
                    {
                        ...mockArbeidsForhold,
                        refusjonTom: '2011-01-01'
                    }
                ]
            },
            {
                ...mockPeriode,
                arbeidsforhold: [
                    {
                        ...mockArbeidsForhold,
                        refusjonTom: '2012-01-01'
                    },
                    {
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

test('rendrer fint selv om bruker ikke har noen arbeidsforhold', async () => {
    const testRettighetUtenArbeidsforhold: Pleiepengerettighet = {
        ...testRettighet,
        perioder: [
            {
                ...testRettighet.perioder[0],
                arbeidsforhold: []
            }
        ]
    };

    const { container } = await act(() =>
        renderWithProviders(<Pleiepenger pleiepenger={testRettighetUtenArbeidsforhold} />)
    );

    expect(container).toHaveTextContent('Ingen arbeidsgiver er registrert');
});
