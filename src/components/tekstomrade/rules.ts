import { ASTNode, getText, ReactElementDescription, Rule } from './utils';
import Lenke from 'nav-frontend-lenker';

export const ParagraphRule: Rule = {
    name: 'Paragraph',
    regex: /\n/,
    parse(source: string) {
        return source.split(this.regex).map(line => ({ type: this.name, content: [line] }));
    },
    react(): ReactElementDescription {
        return {
            type: 'p',
            props: { className: 'typo-normal blokk-xs' }
        };
    }
};

export const HighlightRule: Rule = {
    name: 'Highlight',
    regex: /(\*\S+\*)/,
    parse(source: string) {
        return source.split(this.regex).map((fragment: string) => {
            const match = this.regex.exec(fragment);
            if (match) {
                return { type: this.name, content: [match[1].slice(1).slice(0, -1)] };
            } else {
                return fragment;
            }
        });
    },
    react(node: ASTNode): ReactElementDescription {
        return {
            type: 'em'
        };
    }
};

export function createDynamicHighligtingRule(query: string[]): Rule {
    const queryPattern = query.filter(word => word.length > 0).join('|');
    const regex = new RegExp(`(\\b\\S*(?:${queryPattern})\\S*\\b)`, 'i');
    return {
        name: 'DynamicHighlight',
        regex,
        parse(content: string) {
            if (queryPattern.length === 0) {
                return [content];
            }
            return content.split(this.regex).map(fragment => {
                const match = this.regex.exec(fragment);
                if (match) {
                    return { type: this.name, content: [match[1]] };
                } else {
                    return fragment;
                }
            });
        },
        react(node: ASTNode): ReactElementDescription {
            return {
                type: 'em'
            };
        }
    };
}

export const LinkRule: Rule = {
    name: 'Link',
    regex: /((?:[\w-]+:\/\/?|www(?:-\w+)?\.)[^\s()<>]+\w)/,
    startsWithHttp: /^(https?):\/\/.*$/,
    parse(source: string) {
        return source.split(this.regex).map(fragment => {
            const match = this.regex.exec(fragment);
            if (match) {
                return { type: this.name, content: [match[1]] };
            } else {
                return fragment;
            }
        });
    },
    react(node: ASTNode): ReactElementDescription {
        const text = getText(node);
        const href = this.startsWithHttp.test(text) ? text : `https://${text}`;

        return {
            type: Lenke,
            props: { href },
            children: [href]
        };
    }
};
