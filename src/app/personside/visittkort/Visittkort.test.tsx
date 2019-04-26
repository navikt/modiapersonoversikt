import * as React from 'react';
import Visittkort from './VisittkortContainer';
import { mount } from 'enzyme';
import TestProvider from '../../../test/Testprovider';
import { getTestStore } from '../../../test/testStore';
import { UIActionTypes } from '../../../redux/uiReducers/UIReducer';

test('viser visittkortheader når visittkort først rendres', () => {
    const visittkort = mount(
        <TestProvider>
            <Visittkort />
        </TestProvider>
    );

    expect(visittkort.find('section[aria-label="Visittkort-hode"]')).toHaveLength(1);
    expect(visittkort.find('section[aria-label="Visittkortdetaljer"]')).toHaveLength(0);
});

test('viser visittkortheader og visitkortbody når visittkort åpnes med museklikk', () => {
    const visittkort = mount(
        <TestProvider>
            <Visittkort />
        </TestProvider>
    );

    visittkort.find('button[aria-label="Detaljer"]').simulate('click');

    expect(visittkort.find('section[aria-label="Visittkort-hode"]')).toHaveLength(1);
    expect(visittkort.find('section[aria-label="Visittkortdetaljer"]')).toHaveLength(1);
});

test('setter fokus på visittkortdetaljer når visittkort åpnes', () => {
    const testStore = getTestStore();
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
