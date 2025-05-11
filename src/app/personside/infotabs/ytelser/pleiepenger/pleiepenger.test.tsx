import { act } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../../test/testStore';
import Oversikt from './Oversikt';
import Pleiepengerperiode from './Pleiepengerperiode';
import { pleiepengerTestData } from './pleiepengerTestData';

test('Om Oversikten i pleiepengeretten matcher snapshot', async () => {
    setupReactQueryMocks();
    const resultat = await act(() => renderWithProviders(<Oversikt pleiepenger={pleiepengerTestData} />));

    expect(resultat.asFragment()).toMatchSnapshot();
});

test('Om Pleiepengeperiode i pleiepengeretten matcher snapshot', async () => {
    setupReactQueryMocks();
    const resultat = await act(() =>
        renderWithProviders(<Pleiepengerperiode periode={pleiepengerTestData.perioder[0]} periodeNummer={1} />)
    );

    expect(resultat.asFragment()).toMatchSnapshot();
});
