import { render, screen } from '@testing-library/react';
import { AntallTreff, antallTreffTekst } from './AntallTreff';

const dokumenter = { entall: 'dokument', flertall: 'dokumenter' };

describe('antallTreffTekst', () => {
    test('bruker flertallsform for null treff', () => {
        expect(antallTreffTekst({ antall: 0, ...dokumenter })).toBe('0 dokumenter');
    });

    test('bruker entallsform for ett treff', () => {
        expect(antallTreffTekst({ antall: 1, ...dokumenter })).toBe('1 dokument');
    });

    test('bruker flertallsform for flere treff', () => {
        expect(antallTreffTekst({ antall: 143, ...dokumenter })).toBe('143 dokumenter');
    });

    test('viser kun antall når totalt er likt antall', () => {
        expect(antallTreffTekst({ antall: 143, totalt: 143, ...dokumenter })).toBe('143 dokumenter');
    });

    test('viser "av totalt" når filteret har fjernet treff', () => {
        expect(antallTreffTekst({ antall: 12, totalt: 143, ...dokumenter })).toBe('Viser 12 av 143 dokumenter');
    });

    test('bruker flertallsform ved ett filtrert treff av flere', () => {
        expect(antallTreffTekst({ antall: 1, totalt: 143, ...dokumenter })).toBe('Viser 1 av 143 dokumenter');
    });
});

describe('AntallTreff', () => {
    test('annonserer antallet i en aria-live-region', () => {
        render(<AntallTreff antall={12} totalt={143} {...dokumenter} />);

        const liveRegion = screen.getByText('Viser 12 av 143 dokumenter').closest('[aria-live]');

        expect(liveRegion).toHaveAttribute('aria-live', 'polite');
        expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
    });

    test('viser skeleton i stedet for antall under lasting', () => {
        render(<AntallTreff antall={0} isLoading {...dokumenter} />);

        expect(screen.queryByText('0 dokumenter')).not.toBeInTheDocument();
    });
});
