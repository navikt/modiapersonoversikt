import * as React from 'react';
import Visittkort from './VisittkortContainer';
import { mount } from 'enzyme';
import TestProvider from '../../../test/Testprovider';
import { getTestStore } from '../../../test/testStore';
import { UIActionTypes } from '../../../redux/uiReducers/UIReducer';
import { aremark } from '../../../mock/person/aremark';
import { Person } from '../../../models/person/person';

test('viser visittkortheader og visitkortbody når visittkort åpnes med museklikk', () => {
    const visittkort = mount(
        <TestProvider>
            <Visittkort />
        </TestProvider>
    );

    visittkort.find('button[aria-expanded=false]').simulate('click');

    expect(visittkort.find('section[aria-label="Visittkort-hode"]')).toHaveLength(1);
    expect(visittkort.find('section[aria-label="Visittkortdetaljer"]')).toHaveLength(1);
});

test('setter fokus på visittkortdetaljer når visittkort åpnes', () => {
    const testStore = getTestStore();
    const aremarkUtenSikkerhetstiltak: Person = {
        ...aremark,
        sikkerhetstiltak: undefined
    };
    testStore.dispatch(
        testStore.getState().restResources.personinformasjon.actions.setData(aremarkUtenSikkerhetstiltak)
    );
    mount(
        <TestProvider customStore={testStore}>
            <Visittkort />
        </TestProvider>
    );

    testStore.dispatch({ type: UIActionTypes.TOGGLE_VISITTKORT, erApen: true });
    const focusedElement = document.activeElement;

    if (focusedElement) {
        expect(focusedElement.innerHTML).toContain('Visittkortdetaljer');
    } else {
        fail('Ingen activeElement på dokumentet');
    }
});
