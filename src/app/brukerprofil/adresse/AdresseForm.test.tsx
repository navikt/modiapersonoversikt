import * as React from 'react';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';

import AdresseContainer from './AdresseContainer';
import TestProvider from '../../../test/Testprovider';
import {
    aremark,
    gateAdresseAremark,
    matrikkelAdresseAremark,
    postboksAdresseAremark, utlandsAdresseAremark
} from '../../../mock/person/aremark';
import AdresseForm from './AdresseForm';
import { Person } from '../../../models/person/person';

jest.mock('nav-frontend-js-utils');

const endreAdresseRolle = {roller: ['0000-GA-BD06_EndreKontaktAdresse']};

test('Rendrer adresseform når postnummere er lastet', () => {
    const adresseContainer = mount(
        <TestProvider>
            <AdresseContainer person={aremark} veilederRoller={endreAdresseRolle}/>
        </TestProvider>);

    expect(adresseContainer.find(AdresseForm)).toHaveLength(1);
});

test('Rendrer adresseform riktig ved folkeregistrert bostedsadresse', () => {

    const aremarkFolkeregistrert: Person = {
        ...aremark,
        postadresse: gateAdresseAremark,
        alternativAdresse: undefined
    };

    const adresseContainer = renderEndreAdresseForm(aremarkFolkeregistrert);

    expect(adresseContainer.toJSON()).toMatchSnapshot();
});

test('Rendrer adresseform riktig ved midlertidig gateadresse', () => {

    const aremarkGateadresse: Person = {
        ...aremark,
        alternativAdresse: gateAdresseAremark
    };

    const adresseContainer = renderEndreAdresseForm(aremarkGateadresse);

    expect(adresseContainer.toJSON()).toMatchSnapshot();
});

test('Rendrer adresseform riktig ved midlertidig postboksadresse', () => {

    const aremarkPostboksadresse: Person = {
        ...aremark,
        alternativAdresse: postboksAdresseAremark
    };

    const adresseContainer = renderEndreAdresseForm(aremarkPostboksadresse);

    expect(adresseContainer.toJSON()).toMatchSnapshot();
});

test('Rendrer adresseform riktig ved midlertidig matrikkeladresse', () => {

    const aremarkmatrikkeladresse: Person = {
        ...aremark,
        alternativAdresse: matrikkelAdresseAremark
    };

    const adresseContainer = renderEndreAdresseForm(aremarkmatrikkeladresse);

    expect(adresseContainer.toJSON()).toMatchSnapshot();
});

test('Rendrer adresseform riktig ved midlertidig utenlandsadresse', () => {

    const aremarkUtlandsadresse: Person = {
        ...aremark,
        alternativAdresse: utlandsAdresseAremark
    };

    const adresseContainer = renderEndreAdresseForm(aremarkUtlandsadresse);

    expect(adresseContainer.toJSON()).toMatchSnapshot();
});


function renderEndreAdresseForm(person: Person) {
    return renderer.create(
        <TestProvider>
            <AdresseContainer person={person} veilederRoller={endreAdresseRolle}/>
        </TestProvider>);
}
