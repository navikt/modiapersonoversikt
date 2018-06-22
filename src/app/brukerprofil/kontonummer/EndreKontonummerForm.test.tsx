import * as React from 'react';
import * as renderer from 'react-test-renderer';
import EndreKontonummerForm from './EndreKontonummerForm';
import TestProvider from '../../../test/Testprovider';
import { VeilederRoller } from '../../../models/veilederRoller';
import { aremark } from '../../../mock/person/aremark';
import { Bankkonto, Person } from '../../../models/person/person';

const veilerRoller: VeilederRoller = { roller: ['0000-GA-BD06_EndreKontonummer'] };

test('Viser riktig form for å endre norsk kontonummer', () => {

    const endrekontonummerForm = renderer.create(
        <TestProvider>
            <EndreKontonummerForm person={aremark} veilederRoller={veilerRoller}/>
        </TestProvider>
    );

    const json = endrekontonummerForm.toJSON();
    expect(json).toMatchSnapshot();
});

test('Viser riktig form for å endre utenlandsk kontonummer', () => {
    const person: Person = {
        ...aremark,
        bankkonto: {
            ...aremark.bankkonto as Bankkonto,
            landkode: {
                kodeRef: 'NRN',
                beskrivelse: 'Narnia'
            },
            valuta: {
                beskrivelse: 'Spesidaler',
                kodeRef: 'SPD'
            }
        }
    };
    const endrekontonummerForm = renderer.create(
        <TestProvider>
            <EndreKontonummerForm person={person} veilederRoller={veilerRoller}/>
        </TestProvider>
    );

    const json = endrekontonummerForm.toJSON();
    expect(json).toMatchSnapshot();
});
