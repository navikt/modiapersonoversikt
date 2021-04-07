import {
    ascendingDateComparator,
    datoVerbose,
    erImorgenEllerSenere,
    erMaksEttÅrFramITid,
    getNewestDate,
    getOldestDate,
    datoStigende,
    datoSynkende,
    erMaks10MinSiden,
    backendDatoformat
} from './date-utils';
import dayjs from 'dayjs';

Date.now = () => new Date().getTime(); // for å motvirke Date.now() mock i setupTests.ts

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

    it('acendingDateComparator returnerer 1, -1 eller 0 ettersom hvilken dato som er størst eller om de er like', () => {
        const liten = new Date('2000-01-01');
        const liten2 = new Date('2000-01-01');
        const stor = new Date('2000-01-10');

        expect(ascendingDateComparator(stor, liten)).toBeGreaterThan(1);
        expect(ascendingDateComparator(liten, stor)).toBeLessThan(-1);
        expect(ascendingDateComparator(liten, liten2)).toEqual(0);
    });

    it('Generic comparator', () => {
        interface MockObject {
            date: string | Date;
        }

        const datoA: MockObject = { date: '2012-01-01' };
        const datoB: MockObject = { date: new Date('2000-01-01') };
        const sortedDates = [datoA, datoB].sort(datoStigende(object => object.date));

        expect(sortedDates[0]).toEqual(datoB);
    });

    it('Generic descending comparator', () => {
        interface MockObject {
            date: string | Date;
        }

        const datoA: MockObject = { date: '2012-01-01' };
        const datoB: MockObject = { date: new Date('2000-01-01') };
        const sortedDates = [datoA, datoB].sort(datoSynkende(object => object.date));

        expect(sortedDates[0]).toEqual(datoA);
    });
});

test('datoVerbose henter riktig dag, måned og år', () => {
    const dato = '1986-12-28';

    const result = datoVerbose(dato);

    expect(result.sammensatt).toEqual('28. Desember 1986');
});

describe('getNewestDate', () => {
    it('git den nyeste datoen', () => {
        const oldDate = dayjs()
            .subtract(1, 'year')
            .toDate();
        const newDate = dayjs().toDate();

        const result = getNewestDate(newDate, oldDate);
        const result2 = getNewestDate(oldDate, newDate);

        expect(result).toEqual(newDate);
        expect(result2).toEqual(newDate);
    });

    it('aksepterer strings som argumenter', () => {
        const oldDate = dayjs()
            .subtract(1, 'year')
            .format(backendDatoformat);
        const newDate = dayjs().format(backendDatoformat);

        const result = getNewestDate(newDate, oldDate);

        expect(result).toEqual(newDate);
    });
});

describe('getOldestDate', () => {
    it('git den eldste datoen', () => {
        const oldDate = dayjs()
            .subtract(1, 'year')
            .toDate();
        const newDate = dayjs().toDate();

        const result = getOldestDate(newDate, oldDate);
        const result2 = getOldestDate(oldDate, newDate);

        expect(result).toEqual(oldDate);
        expect(result2).toEqual(oldDate);
    });

    it('aksepterer strings og dates som argumenter', () => {
        const oldDate = dayjs()
            .subtract(1, 'year')
            .format(backendDatoformat);
        const newDate = dayjs().format(backendDatoformat);

        const result = getOldestDate(newDate, oldDate);

        expect(result).toEqual(oldDate);
    });
});

describe('erMaks10MinSiden', () => {
    it('sjekker om dato er mindre enn 10 min siden', () => {
        const dateUnder10min = dayjs()
            .subtract(5, 'minute')
            .toDate();
        const dateOver10min = dayjs()
            .subtract(15, 'minute')
            .toDate();

        const resultUnder10min = erMaks10MinSiden(dateUnder10min);
        const resultOver10min = erMaks10MinSiden(dateOver10min);

        expect(resultUnder10min).toEqual(true);
        expect(resultOver10min).toEqual(false);
    });
});
