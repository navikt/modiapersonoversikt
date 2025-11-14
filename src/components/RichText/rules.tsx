import { Link } from '@navikt/ds-react';
import {
    type ASTNode,
    LinkRule as OriginalLinkRule,
    type ReactElementDescription,
    type RegexMatch,
    type Rule,
    RuleScope
} from '@navikt/textparser';
import { getText } from '@navikt/textparser/dist/utils';

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

export const LinkRule: Rule = {
    ...OriginalLinkRule,
    react(node: ASTNode): ReactElementDescription {
        const text = getText(node);
        const href = this.startsWithHttp.test(text) ? text : `https://${text}`;

        return {
            type: Link,
            props: {
                href,
                target: '_blank',
                style: { link: { color: '#0000EE' }, hover: { color: '#551A8B' } },
                className: 'break-all'
            }
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
