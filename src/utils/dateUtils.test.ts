import {
    ascendingDateComparator,
    erImorgenEllerSenere,
    erMaksEttÅrFramITid,
    formaterDato,
    genericAscendingDateComparator
} from './dateUtils';

Date.now = jest.fn(() => new Date()); // for å motvirke Date.now() mock i setupTests.ts

it('Formaterer dato på backend-format til ønsket visningsformat', () => {
    const rawDate = '2014-02-10T08:09:36.000+0000';
    const formatertDato = formaterDato(rawDate);

    expect(formatertDato).toEqual('10.02.2014');
});

describe('dato erImorgenEllerSenere', () => {
    it('Dagens dato', () => {
        expect(erImorgenEllerSenere(new Date())).toEqual(false);
    });

    it('Fremtidens dato', () => {
        const date = new Date();
        date.setFullYear(3000);
        expect(erImorgenEllerSenere(date)).toEqual(true);
    });
});

describe('dato erMaksEttÅrFramITid', () => {
    it('Dagens dato', () => {
        expect(erMaksEttÅrFramITid(new Date())).toEqual(true);
    });

    it('Fremtidens dato', () => {
        const date = new Date();
        date.setFullYear(3000);
        expect(erMaksEttÅrFramITid(date)).toEqual(false);
    });
});

describe('Sorterer etter dato', () => {
    it('Basic comparator', () => {
        const datoA = new Date('2010-01-01');
        const datoB = new Date('2000-01-01');
        const sortedDates = [datoA, datoB].sort(ascendingDateComparator);

        expect(sortedDates[sortedDates.length - 1]).toEqual(new Date('2010-01-01'));
    });

    it('Generic comparator', () => {
        interface MockObject {
            date: string | Date;
        }
        const datoA: MockObject = { date: '2012-01-01' };
        const datoB: MockObject = { date: new Date('2000-01-01') };
        const sortedDates = [datoA, datoB].sort(genericAscendingDateComparator(object => object.date));

        expect(sortedDates[sortedDates.length - 1]).toEqual(datoA);
    });
});
