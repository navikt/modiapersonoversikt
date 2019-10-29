import { AST, ASTNode, Rule } from './domain';
import { match, RegexMatch, minBy } from './utils';
import React from 'react';

type Match = null | { match: RegexMatch; rule: Rule };

function nodeParser(node: ASTNode, rules: Array<Rule>): AST {
    if (typeof node === 'string') {
        const matched: Match = rules
            .map(rule => {
                const isMatch = match(rule.regex, node);
                if (!isMatch) {
                    return null;
                }

                return {
                    match: isMatch,
                    rule
                };
            })
            .filter(result => result)
            .reduce(minBy<Match>(result => (result ? result.match.index : Number.MAX_SAFE_INTEGER)), null as Match);

        if (matched) {
            const matchStart = matched.match.index;
            const matchEnd = matched.match.index + matched.match.fullmatch.length;
            const beforeMatch = node.slice(0, matchStart);
            const afterMatch = node.slice(matchEnd);

            const [before, after] = [[beforeMatch], [afterMatch]].map(around => internalParser(around, rules));
            const recursive = internalParser(
                [matched.rule.parse(matched.match)],
                rules.filter(rule => rule !== matched.rule)
            );

            return [...before, ...recursive, ...after];
        } else {
            return [node];
        }
    } else {
        return [
            {
                name: node.name,
                content: internalParser(node.content, rules)
            }
        ];
    }
}

function simplify(node: ASTNode): Array<ASTNode> {
    if (typeof node === 'string') {
        if (node.length === 0) {
            return [];
        }
        return [node];
    } else {
        return [{ name: node.name, content: node.content.flatMap(simplify) }];
    }
}

function internalParser(ast: AST, rules: Array<Rule>): AST {
    return ast.flatMap(node => nodeParser(node, rules));
}

function internalBuild(ruleMap: { [name: string]: Rule }, node: ASTNode, key: number): React.ReactNode {
    if (typeof node === 'string') {
        return node;
    }
    const type = ruleMap[node.name];
    const element = type.react(node);
    const children = element.children || node.content.map((child, i) => internalBuild(ruleMap, child, i));
    return React.createElement(element.type, { ...element.props, key }, children);
}

export function parse(content: string, rules: Array<Rule>): AST {
    const trimmed = content.trim().replace(/\r/g, '');
    const preppedContent = trimmed.includes('\n') ? `${trimmed}\n` : trimmed;
    return internalParser([preppedContent], rules).flatMap(simplify);
}

export function build(ast: AST, rules: Array<Rule>): React.ReactNode {
    const ruleMap = rules.reduce((acc, rule) => ({ ...acc, [rule.name]: rule }), {});
    const nodes = ast.map((node, i) => internalBuild(ruleMap, node, i));
    return React.createElement(React.Fragment, {}, nodes);
}
