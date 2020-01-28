import { ASTNode, ReactElementDescription, Rule, RuleScope } from './domain';
import { getText, RegexMatch } from './utils';
import Lenke from 'nav-frontend-lenker';

export const LinebreakRule: Rule = {
    name: 'Linebreak',
    scope: RuleScope.INLINE,
    regex: /\n(?!\n)/,
    parse(match: RegexMatch): ASTNode {
        return {
            name: this.name,
            content: []
        };
    },
    react(node: ASTNode): ReactElementDescription {
        return {
            type: 'br'
        };
    }
};

export const ParagraphRule: Rule = {
    name: 'Paragraph',
    scope: RuleScope.BLOCK,
    regex: /((?:.|\s)+?)(?:\n{2,}|$)/,
    parse(match: RegexMatch): ASTNode {
        return {
            name: this.name,
            content: [match.capture[0]]
        };
    },
    react(node: ASTNode): ReactElementDescription {
        return {
            type: 'p',
            props: { className: 'typo-normal blokk-xs' }
        };
    }
};

export const HighlightRule: Rule = {
    name: 'Highlight',
    scope: RuleScope.INLINE,
    regex: /\*([^*]+?)\*(?!\*)/,
    parse(match: RegexMatch): ASTNode {
        return {
            name: this.name,
            content: [match.capture[0]]
        };
    },
    react(node: ASTNode): ReactElementDescription {
        return {
            type: 'em'
        };
    }
};

function escapeRegExp(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function createDynamicHighligtingRule(query: string[]): Rule {
    const queryPattern = query
        .filter(word => word.length > 0)
        .map(escapeRegExp)
        .join('|');
    const regex = queryPattern.length > 0 ? RegExp(`(\\b\\S*(?:${queryPattern})\\S*\\b)`, 'i') : /\\u0000/;
    return {
        name: 'DynamicHighlight',
        scope: RuleScope.INLINE,
        regex,
        parse(match: RegexMatch): ASTNode {
            return {
                name: this.name,
                content: [match.capture[0]]
            };
        },
        react(node: ASTNode): ReactElementDescription {
            return {
                type: 'em'
            };
        }
    };
}

export const BoldRule: Rule = {
    name: 'Bold',
    scope: RuleScope.INLINE,
    regex: /_([^_]+?)_(?!_)/,
    parse(match: RegexMatch): ASTNode {
        return {
            name: this.name,
            content: [match.capture[0]]
        };
    },
    react(node: ASTNode): ReactElementDescription {
        return {
            type: 'b'
        };
    }
};

export const LinkRule: Rule = {
    name: 'Link',
    scope: RuleScope.INLINE,
    regex: /((?:[\w-]+:\/\/?|www(?:-\w+)?\.)[^\s()<>]+\w)/,
    startsWithHttp: /^(https?):\/\/.*$/,
    parse(match: RegexMatch): ASTNode {
        return {
            name: this.name,
            content: [match.capture[0]]
        };
    },
    react(node: ASTNode): ReactElementDescription {
        const text = getText(node);
        const href = this.startsWithHttp.test(text) ? text : `https://${text}`;

        return {
            type: Lenke,
            props: { href, target: '_blank' }
        };
    }
};
