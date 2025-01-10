import { render } from '@testing-library/react';
import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../mock/persondata/aremark';
import TestProvider from '../../../../test/Testprovider';
import type { LocalDate, Person, Data as PersonData } from '../PersondataDomain';
import { hentNavn } from '../visittkort-utils';
import VisittkortHeader from './VisittkortHeader';

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
        render(
            <TestProvider>
                <VisittkortHeader persondata={oppdatertPerson} erApen={false} toggleApen={() => null} />
            </TestProvider>
        );

        const focusedElement = document.activeElement;

        if (focusedElement) {
            expect(focusedElement).toHaveTextContent(new RegExp(`${hentNavn(person.navn[0])}`, 'i'));
        } else {
            assert.fail('Ingen activeElement på dokumentet');
        }
    });

    test('setter fokus på sikkerhetstiltak on mount', () => {
        const person: Person = {
            ...aremark,
            sikkerhetstiltak: [
                {
                    type: 'TFUS',
                    beskrivelse: 'Telefonisk utestengelse',
                    gyldighetsPeriode: {
                        gyldigFraOgMed: '2020-01-01' as LocalDate,
                        gyldigTilOgMed: '2023-01-01' as LocalDate
                    }
                }
            ]
        };

        const oppdatertPerson: PersonData = { feilendeSystemer: [], person };

        render(
            <TestProvider>
                <VisittkortHeader persondata={oppdatertPerson} erApen={false} toggleApen={() => null} />
            </TestProvider>
        );

        const focusedElement = document.activeElement;

        if (focusedElement) {
            expect(focusedElement).toHaveTextContent('Sikkerhetstiltak');
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            assert.fail('Ingen activeElement på dokumentet');
        }
    });
});
