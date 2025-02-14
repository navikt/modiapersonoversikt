import { type JournalforingsSak, SakKategori } from './JournalforingPanel';
import { fordelSaker } from './VelgSak';

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
