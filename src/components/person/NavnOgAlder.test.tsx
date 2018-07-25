import * as React from 'react';
import { shallow } from 'enzyme';
import NavnOgAlder from './NavnOgAlder';
import { Familierelasjon, Relasjonstype } from '../../models/person/person';
import '../../test/setupTests';

const relasjon: Familierelasjon = {
    harSammeBosted: false,
    rolle: Relasjonstype.Barn,
    tilPerson: {
        navn: {
            fornavn: 'Baruch',
            etternavn: 'Spinoza',
            sammensatt: 'Sammensatt',
            mellomnavn: ''
        },
        alder: 15,
        alderMåneder: 182,
        fødselsnummer: '123',
        personstatus: {}
    }
};

test('Fornavn, etternavn og alder vises', () => {
    const NavnOgAlderWrapper = shallow(<NavnOgAlder relasjon={relasjon}/>);

    expect(NavnOgAlderWrapper.text()).toEqual('Baruch Spinoza (15) ');
});

test('Fornavn, mellomnavn, etternavn og alder vises', () => {
    relasjon.tilPerson.navn = {
        fornavn: 'Baruch',
        etternavn: 'Spinoza',
        sammensatt: 'Sammensatt',
        mellomnavn: 'de'
    };
    const NavnOgAlderWrapper = shallow(<NavnOgAlder relasjon={relasjon}/>);

    expect(NavnOgAlderWrapper.text()).toEqual('Baruch de Spinoza (15) ');
});

test('Navn og alder uten fornavn og etternavn defaulter til sammensatt navn', () => {
    relasjon.tilPerson.navn = {
        fornavn: null,
        etternavn: null,
        sammensatt: 'Sammensatt',
        mellomnavn: ''
    };

    const NavnOgAlderWrapper = shallow(<NavnOgAlder relasjon={relasjon}/>);

    expect(NavnOgAlderWrapper.text()).toEqual('Sammensatt (15) ');
});

test('Uten navn returnerer ukjent navn', () => {
    relasjon.tilPerson.navn = {
        fornavn: null,
        etternavn: null,
        sammensatt: '',
        mellomnavn: ''
    };

    const NavnOgAlderWrapper = shallow(<NavnOgAlder relasjon={relasjon}/>);

    expect(NavnOgAlderWrapper.text()).toEqual('Ukjent navn (15) ');
});

test('Uten fornavn, men med etternavn', () => {
    relasjon.tilPerson.navn = {
        fornavn: null,
        etternavn: null,
        sammensatt: 'Sokrates',
        mellomnavn: ''
    };

    const NavnOgAlderWrapper = shallow(<NavnOgAlder relasjon={relasjon}/>);

    expect(NavnOgAlderWrapper.text()).toEqual('Sokrates (15) ');
});

test('barn under 1 år', () => {
    relasjon.tilPerson.alder = 0;
    relasjon.tilPerson.alderMåneder = 3;

    const NavnOgAlderWrapper = shallow(<NavnOgAlder relasjon={relasjon}/>);
    expect(NavnOgAlderWrapper.text()).toEqual('Sokrates (3 mnd) ');
});