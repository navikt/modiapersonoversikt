import { parse, type Rule } from '@navikt/textparser';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { renderToStaticMarkup } from 'react-dom/server';
import { rule as legacySladdRule } from 'src/utils/sladdrule';
import RichText, { LinkRule, ParagraphRuleOverride, SladdRule } from './index';
import { normalizeMessageText } from './normalizeMessageText';

const newRules: Rule[] = [SladdRule, LinkRule];
const legacyRules: Rule[] = [legacySladdRule, LinkRule, ParagraphRuleOverride];

describe('meldingsvisning', () => {
    it.each([
        ['sammenhengende', `før${'\n'.repeat(5_000)}etter`],
        ['adskilte', `før${'ord\n'.repeat(5_000)}etter`]
    ])('viser %s linjeskift og beholder teksten etter dem i ny visning', (_, original) => {
        const normalized = normalizeMessageText(original);
        const markup = renderToStaticMarkup(
            <RichText className="whitespace-pre-wrap" rules={newRules}>
                {normalized}
            </RichText>
        );

        expect(markup).toContain('etter');
        expect(markup).toContain('whitespace-pre-wrap');
        expect(normalized).not.toMatch(/\n{5}/);
        expect(original).toContain('etter');
    });

    it('parser mange adskilte linjeskift i gammel visning uten å dele opp sladderegelen', () => {
        const normalized = normalizeMessageText(`** \n *før${'ord\n'.repeat(5_000)}etter`);

        expect(() => parse(normalized, legacyRules)).not.toThrow();
        expect(normalized).toContain('etter');
        expect(normalized).toContain('** \n *');
    });

    it('viser mellomliggende lenke og tekst etter linjeskift i gammel visning', () => {
        const normalized = normalizeMessageText(`før\nhttps://eksempel.no/sti${'\n'.repeat(5_000)}etter`);
        const markup = renderToStaticMarkup(
            <Tekstomrade style={{ whiteSpace: 'pre-wrap' }} rules={legacyRules}>
                {normalized}
            </Tekstomrade>
        );

        expect(markup).toContain('etter');
        expect(markup).toContain('https://eksempel.no/sti');
        expect(markup).toContain('white-space:pre-wrap');
    });
});
