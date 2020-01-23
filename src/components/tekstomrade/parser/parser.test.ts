import { parse } from './parser';
import { BoldRule, HighlightRule, LinebreakRule, LinkRule, ParagraphRule } from './rules';
import { Rule } from './domain';

const eksempel = `
Hei Fornavn Etternavn,

Her er det som må gjøres:
- registrer deg her: www.nav.no/registrerdeg
- send _*søknad*_
- *vent* på svar

Mvh
Saksbehandler Navn
0123 NAV kontor
`.trim();

describe('tekstomrade - parser', () => {
    const rules: Array<Rule> = [HighlightRule, BoldRule, LinkRule, LinebreakRule, ParagraphRule];

    it('skal håndtere alle predefinerte regler', () => {
        const ast = parse(eksempel, rules);
        expect(ast).toMatchObject([
            { name: 'Paragraph', content: ['Hei Fornavn Etternavn,'] },
            {
                name: 'Paragraph',
                content: [
                    'Her er det som må gjøres:',
                    { name: 'Linebreak' },
                    '- registrer deg her: ',
                    { name: 'Link', content: ['www.nav.no/registrerdeg'] },
                    { name: 'Linebreak' },
                    '- send ',
                    { name: 'Bold', content: [{ name: 'Highlight', content: ['søknad'] }] },
                    { name: 'Linebreak' },
                    '- ',
                    { name: 'Highlight', content: ['vent'] },
                    ' på svar'
                ]
            },
            {
                name: 'Paragraph',
                content: ['Mvh', { name: 'Linebreak' }, 'Saksbehandler Navn', { name: 'Linebreak' }, '0123 NAV kontor']
            }
        ]);
    });

    it('skal håndtere tomt regelsett', () => {
        const ast = parse(eksempel, []);
        expect(ast).toMatchObject([eksempel]);
    });
});
