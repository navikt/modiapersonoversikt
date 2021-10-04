import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import VisittkortHeader from './VisittkortHeader';
import { aremark } from '../../../../mock/persondata/aremark';
import { Data as PersonData, LocalDate, Person, SikkerhetstiltakType } from '../PersondataDomain';
import { mount } from '../../../../test/enzyme-container';
import { hentNavn } from '../utils-visittkort';

function lagPersondataForAremark(): PersonData {
    const person = aremark;
    return { feilendeSystemer: [], person };
}

describe('Tester visittkort-header sin funksjonalitet', () => {
    test('viser info om bruker i visittkort-header', () => {
        const visittkortHeader = renderer.create(
            <TestProvider>
                <VisittkortHeader persondata={lagPersondataForAremark()} erApen={false} toggleApen={() => null} />
            </TestProvider>
        );

        const json = visittkortHeader.toJSON();
        expect(json).toMatchSnapshot();
    });

    test('setter fokus på brukerens navn on mount', () => {
        const person: Person = {
            ...aremark,
            sikkerhetstiltak: []
        };

        const oppdatertPerson: PersonData = { feilendeSystemer: [], person };
        mount(
            <TestProvider>
                <VisittkortHeader persondata={oppdatertPerson} erApen={false} toggleApen={() => null} />
            </TestProvider>
        );

        const focusedElement = document.activeElement;

        if (focusedElement) {
            expect(focusedElement.innerHTML.toLowerCase()).toContain(hentNavn(person.navn[0]).toLowerCase());
        } else {
            fail('Ingen activeElement på dokumentet');
        }
    });

    test('setter fokus på sikkerhetstiltak on mount', () => {
        const person: Person = {
            ...aremark,
            sikkerhetstiltak: [
                {
                    type: SikkerhetstiltakType.TFUS,
                    gyldigFraOgMed: '2020-01-01' as LocalDate,
                    gyldigTilOgMed: '2023-01-01' as LocalDate
                }
            ]
        };

        const oppdatertPerson: PersonData = { feilendeSystemer: [], person };

        mount(
            <TestProvider>
                <VisittkortHeader persondata={oppdatertPerson} erApen={false} toggleApen={() => null} />
            </TestProvider>
        );

        const focusedElement = document.activeElement;

        if (focusedElement) {
            expect(focusedElement.innerHTML).toContain('Sikkerhetstiltak');
        } else {
            fail('Ingen activeElement på dokumentet');
        }
    });
});
