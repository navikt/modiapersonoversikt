import { act } from '@testing-library/react';
import { aremark } from '../../../../mock/persondata/aremark';
import { renderWithProviders } from '../../../../test/Testprovider';
import type { LocalDate, Person, Data as PersonData } from '../PersondataDomain';
import { hentNavn } from '../visittkort-utils';
import VisittkortHeader from './VisittkortHeader';

function lagPersondataForAremark(): PersonData {
    const person = aremark;
    return { feilendeSystemer: [], person };
}

describe('Tester visittkort-header sin funksjonalitet', () => {
    test('viser info om bruker i visittkort-header', async () => {
        const visittkortHeader = await act(() =>
            renderWithProviders(
                <VisittkortHeader persondata={lagPersondataForAremark()} erApen={false} toggleApen={() => null} />
            )
        );

        const json = visittkortHeader.asFragment();
        expect(json).toMatchSnapshot();
    });

    test('setter fokus på brukerens navn on mount', async () => {
        const person: Person = {
            ...aremark,
            sikkerhetstiltak: []
        };

        const oppdatertPerson: PersonData = { feilendeSystemer: [], person };
        await act(() =>
            renderWithProviders(
                <VisittkortHeader persondata={oppdatertPerson} erApen={false} toggleApen={() => null} />
            )
        );

        const focusedElement = document.activeElement;

        if (focusedElement) {
            expect(focusedElement).toHaveTextContent(new RegExp(`${hentNavn(person.navn[0])}`, 'i'));
        } else {
            assert.fail('Ingen activeElement på dokumentet');
        }
    });

    test('setter fokus på sikkerhetstiltak on mount', async () => {
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

        await act(() =>
            renderWithProviders(
                <VisittkortHeader persondata={oppdatertPerson} erApen={false} toggleApen={() => null} />
            )
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
