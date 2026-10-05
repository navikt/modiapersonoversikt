import { describe, expect, it } from 'vitest';
import { formaterRettighetstemaer } from './fullmakt-utils';

describe('formaterRettighetstemaer', () => {
    it('viser temaene som en kommaseparert liste', () => {
        expect(
            formaterRettighetstemaer([
                { kode: 'AAP', beskrivelse: 'Arbeidsavklaringspenger' },
                { kode: 'DAG', beskrivelse: 'Dagpenger' }
            ])
        ).toBe('arbeidsavklaringspenger, dagpenger');
    });

    it('returnerer tom tekst uten rettigheter', () => {
        expect(formaterRettighetstemaer([])).toBe('');
    });
});
