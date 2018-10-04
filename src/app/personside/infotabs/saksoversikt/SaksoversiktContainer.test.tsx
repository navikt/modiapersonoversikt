import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import { aremark } from '../../../../mock/person/aremark';
import SaksoversiktContainer from './SaksoversiktContainer';

test('Viser saksoversiktcontainer med alt innhold', () => {
        const container = renderer.create(
            <TestProvider><SaksoversiktContainer fødselsnummer={aremark.fødselsnummer}/></TestProvider>
        );

        const json = container.toJSON();
        expect(json).toMatchSnapshot();
    }
);