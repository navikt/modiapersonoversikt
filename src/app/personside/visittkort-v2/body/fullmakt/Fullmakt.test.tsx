import { screen } from '@testing-library/react';
import { aremark } from './../../../../../mock/persondata/aremark';
import { renderWithProviders } from '../../../../../test/Testprovider';
import Fullmakter from './Fullmakt';

test('viser fullmektige med leserettigheter og skriverettigheter', () => {
    renderWithProviders(<Fullmakter feilendeSystemer={[]} fullmektige={aremark.fullmektige} />);

    expect(screen.getByText('Navn Navnesen (123456789)')).toBeInTheDocument();
    expect(screen.getByText('Leserettigheter: Arbeidsavklaringspenger, Dagpenger')).toBeInTheDocument();
    expect(screen.getByText('Skriverettigheter: Dagpenger')).toBeInTheDocument();
});
