import { act } from '@testing-library/react';
import { InformasjonElement } from 'src/models/person/persondata';
import { aremark } from '../../../../mock/persondata/aremark';
import { renderWithProviders } from '../../../../test/LegacyTestprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import VisittkortBody from './VisittkortBody';

test('viser info om bruker i visittkortbody', async () => {
    setupReactQueryMocks();
    const visittkortbody = await act(() =>
        renderWithProviders(
            <VisittkortBody
                persondata={{
                    feilendeSystemer: [
                        InformasjonElement.BANKKONTO,
                        InformasjonElement.EGEN_ANSATT,
                        InformasjonElement.PDL_TREDJEPARTSPERSONER,
                        InformasjonElement.NORG_NAVKONTOR,
                        InformasjonElement.NORG_KONTAKTINFORMASJON,
                        InformasjonElement.DKIF,
                        InformasjonElement.VEILEDER_ROLLER,
                        InformasjonElement.PDL_GT
                    ],
                    person: aremark
                }}
            />
        )
    );

    expect(visittkortbody.asFragment()).toMatchSnapshot();
});
