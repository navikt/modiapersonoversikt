import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../mock/persondata/aremark';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import { InformasjonElement } from '../PersondataDomain';
import VisittkortBody from './VisittkortBody';

test('viser info om bruker i visittkortbody', () => {
    setupReactQueryMocks();
    const visittkortbody = renderer.create(
        <TestProvider>
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
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
