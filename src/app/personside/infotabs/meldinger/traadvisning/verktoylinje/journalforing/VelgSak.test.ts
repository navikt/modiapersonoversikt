import { fjernSakerSomAlleredeErTilknyttet, fordelSaker } from './VelgSak';
import { JournalforingsSak, JournalforingsSakIdentifikator, SakKategori } from './JournalforingPanel';

function sak(sakstype: 'GEN' | 'FAG', temaKode: string, fagsystemSaksId?: string): JournalforingsSak {
    return { sakstype, temaKode, temaNavn: temaKode, fagsystemSaksId } as JournalforingsSak;
}

describe('fordelSaker', () => {
    const generelleSaker = [
        sak('GEN', 'DAG'),
        sak('GEN', 'BID'),
        sak('GEN', 'AAP'),
        sak('GEN', 'OPP'),
        sak('GEN', 'FOR')
    ];

    it('skal liste alle som generelle saker om fagsak ikke eksisterer', () => {
        expect(fordelSaker(generelleSaker)[SakKategori.FAG].length).toBe(0);
        expect(fordelSaker(generelleSaker)[SakKategori.GEN].length).toBe(generelleSaker.length);
    });

    it('skal gruppere alle fagsaker til egen kategori', () => {
        const saker = [...generelleSaker, sak('FAG', 'SYK')];
        expect(fordelSaker(saker)[SakKategori.FAG].length).toBe(1);
        expect(fordelSaker(saker)[SakKategori.GEN].length).toBe(generelleSaker.length);
    });

    it('skal ikke fjerne generell sak om fagsak eksisterer', () => {
        const saker = [...generelleSaker, sak('FAG', 'AAP')];
        expect(fordelSaker(saker)[SakKategori.FAG].length).toBe(1);
        expect(fordelSaker(saker)[SakKategori.GEN].length).toBe(generelleSaker.length);
    });
});

describe('fjernSakerSomAlleredeErTilknyttet', () => {
    const saker: Array<JournalforingsSak> = [
        sak('FAG', 'DAG', 'DAG_ID_1'),
        sak('FAG', 'DAG', 'DAG_ID_2'),
        sak('FAG', 'DAG', 'DAG_ID_3'),
        sak('GEN', 'DAG')
    ];

    it('skal fjerne sak som allerede er journalført på', () => {
        const eksisterendeSaker: Array<JournalforingsSakIdentifikator> = [
            { temaKode: 'DAG', fagsystemSaksId: 'DAG_ID_2' }
        ];

        const lovligeSaker = fjernSakerSomAlleredeErTilknyttet(saker, eksisterendeSaker);

        expect(lovligeSaker).toContainEqual(sak('FAG', 'DAG', 'DAG_ID_1'));
        expect(lovligeSaker).not.toContainEqual(sak('FAG', 'DAG', 'DAG_ID_2'));
        expect(lovligeSaker).toContainEqual(sak('FAG', 'DAG', 'DAG_ID_3'));
        expect(lovligeSaker).toContainEqual(sak('GEN', 'DAG'));
        expect(lovligeSaker).toHaveLength(3);
    });

    it('skal ikke fjerne generelle saker', () => {
        const eksisterendeSaker: Array<JournalforingsSakIdentifikator> = [{ temaKode: 'DAG' }];

        const lovligeSaker = fjernSakerSomAlleredeErTilknyttet(saker, eksisterendeSaker);
        expect(lovligeSaker).toHaveLength(4);
    });
});
