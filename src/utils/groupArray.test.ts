import { groupArray, GroupedArray } from './groupArray';

interface Bil {
    merke: string;
    alder: number;
}

test('Grupperer liste på alder', () => {
    const listeFør: Bil[] = [
        {
            merke: 'Jaguar',
            alder: 15
        },
        {
            merke: 'Jaguar',
            alder: 10
        },
        {
            merke: 'Ford',
            alder: 15
        },
        {
            merke: 'Lada',
            alder: 10
        }
    ];

    const listeEtter: GroupedArray<Bil> = [
        {
            category: '15',
            array: [
                {
                    merke: 'Jaguar',
                    alder: 15
                },
                {
                    merke: 'Ford',
                    alder: 15
                }
            ]
        },
        {
            category: '10',
            array: [
                {
                    merke: 'Jaguar',
                    alder: 10
                },
                {
                    merke: 'Lada',
                    alder: 10
                }
            ]
        }
    ];

    const result = groupArray(listeFør, bil => bil.alder.toString());

    expect(result).toEqual(listeEtter);
});
