import { Provider } from 'react-redux';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortHeader from './VisittkortHeader';
import { actionNames } from '../../../../redux/navkontor';
import { getMockNavKontor } from '../../../../mock/navkontor-mock';
import { erEgenAnsatt } from '../../../../mock/egenansatt-mock';
import { testStore } from '../../../../setupTests';
import { aremark } from '../../../../mock/person/aremark';

test('viser info om bruker i visittkort-header', () => {
    const visittkortheader = renderer.create(
        <Provider store={testStore}><VisittkortHeader person={aremark} egenAnsatt={erEgenAnsatt(aremark.fødselsnummer)} /></Provider>
    );

    testStore.dispatch({type: actionNames.OK, data: getMockNavKontor('0118')});

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
