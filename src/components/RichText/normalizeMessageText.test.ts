import { normalizeMessageText } from './normalizeMessageText';

describe('normalizeMessageText', () => {
    it.each([0, 1, 4, 5, 5_000])('viser høyst fire av %i sammenhengende linjeskift', (count) => {
        const original = `før${'\n'.repeat(count)}etter`;

        expect(normalizeMessageText(original)).toBe(`før${'\n'.repeat(Math.min(count, 4))}etter`);
        expect(original).toBe(`før${'\n'.repeat(count)}etter`);
    });

    it('bevarer teksten rundt blandede faktiske, bokstavelige og CRLF-linjeskift', () => {
        const original = 'før\r\n\\n\n\\n\r\n\netter med https://eksempel.no/sti';

        expect(normalizeMessageText(original)).toBe('før\n\n\n\netter med https://eksempel.no/sti');
    });

    it('bevarer adskilte linjeskift og annet meldingsinnhold', () => {
        const original = `før${'ord\n'.repeat(5_000)}etter`;

        expect(normalizeMessageText(original)).toBe(original);
    });
});
