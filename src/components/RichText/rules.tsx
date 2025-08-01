import { Link } from '@navikt/ds-react';
import {
    type AST,
    type ASTNode,
    LinkRule as OriginalLinkRule,
    ParagraphRule as OriginalParagraphRule,
    type ReactElementDescription,
    type RegexMatch,
    type Rule,
    RuleScope
} from '@navikt/textparser';
import { getText } from '@navikt/textparser/dist/utils';
import { Normaltekst } from 'nav-frontend-typografi';

export const ParagraphRuleOverride: Rule = {
    name: 'Paragraph',
    scope: RuleScope.BLOCK,
    regex: /((?:[\s\S])+)/,
    parse(match: RegexMatch): ASTNode {
        return {
            name: this.name,
            content: [match.capture[0]]
        };
    },
    react(_node: ASTNode): ReactElementDescription {
        return {
            type: 'p'
        };
    }
};

export const ParagraphRule: Rule = {
    ...OriginalParagraphRule,
    react(node: ASTNode, ast: AST): ReactElementDescription {
        const isLastInAST = ast.indexOf(node) === ast.length - 1;
        const props = isLastInAST ? undefined : { className: 'blokk-xs' };

        return {
            props,
            type: Normaltekst
        };
    }
};

export const LinkRule: Rule = {
    ...OriginalLinkRule,
    react(node: ASTNode): ReactElementDescription {
        const text = getText(node);
        const href = this.startsWithHttp.test(text) ? text : `https://${text}`;

        return {
            type: Link,
            props: { href, target: '_blank', style: { link: { color: '#0000EE' }, hover: { color: '#551A8B' } } }
        };
    }
};

export const SladdRule: Rule = {
    name: 'sladd',
    scope: RuleScope.INLINE,
    regex: /(\*{2,}[*\s]*\*)/g,
    parse(match: RegexMatch): ASTNode {
        return {
            name: 'sladd',
            content: [match.capture[0]]
        };
    },
    react(): ReactElementDescription {
        return {
            type: (props) => <span className="box-decoration-clone rounded bg-[currentColor] break-all" {...props} />
        };
    }
};
