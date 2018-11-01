import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortHeader from './VisittkortHeader';
import { aremark } from '../../../../mock/person/aremark';
import TestProvider from '../../../../test/Testprovider';
import { mount } from 'enzyme';
import { Person } from '../../../../models/person/person';

test('viser info om bruker i visittkort-header', () => {
    const visittkortheader = renderer.create(
        <TestProvider>
            <VisittkortHeader person={aremark} visittkortApent={false} toggleVisittkort={() => null}/>
        </TestProvider>
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});

test('setter fokus på brukerens navn on mount', () => {
    const person = {
        ...aremark,
        sikkerhetstiltak: undefined
    };
    mount((
        <TestProvider>
            <VisittkortHeader person={person} toggleVisittkort={() => null} visittkortApent={false}/>
        </TestProvider>
    ));

    const focusedElement = document.activeElement;

    expect(focusedElement!.innerHTML.toLowerCase()).toContain(aremark.navn.sammensatt.toLowerCase());
});

test('setter fokus på sikkerhetstiltak on mount', () => {
    const person: Person = {
        ...aremark,
        sikkerhetstiltak: {
            sikkerhetstiltaksbeskrivelse: 'Brukeren er farlig',
            sikkerhetstiltakskode: '42',
            periode: {
                fra: 'i dag',
                til: 'i går'
            }
        }
    };
    mount((
        <TestProvider>
            <VisittkortHeader person={person} toggleVisittkort={() => null} visittkortApent={false}/>
        </TestProvider>
    ));

    const focusedElement = document.activeElement;

    expect(focusedElement!.innerHTML).toContain('Sikkerhetstiltak');
});