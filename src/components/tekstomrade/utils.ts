import React from 'react';

export interface ReactElementDescription {
    type: string | React.ComponentType<any>;
    props?: { [key: string]: any };
    children?: Array<React.ReactNode>;
}

export type Rule = {
    name: string;
    regex: RegExp;
    parse(content: string): AST;
    react(node: ASTNode): ReactElementDescription;
    [key: string]: any;
};

export type AST = Array<ASTNode>;
export type ASTNode =
    | string
    | {
          type: string;
          content: Array<ASTNode>;
      };

function parseStringContent(rule: Rule, node: string): AST {
    const match = rule.regex.test(node);
    if (match) {
        return rule.parse(node);
    } else {
        return [node];
    }
}
function parseNode(rule: Rule, node: ASTNode): AST {
    if (typeof node === 'string') {
        return parseStringContent(rule, node);
    } else {
        const newContent = node.content.flatMap(node => parseNode(rule, node));
        return [{ type: node.type, content: newContent }];
    }
}

function simplify(node: ASTNode): Array<ASTNode> {
    if (typeof node === 'string') {
        if (node.length === 0) {
            return [];
        }
        return [node];
    } else {
        return [{ type: node.type, content: node.content.flatMap(simplify) }];
    }
}

function buildInternal(ruleMap: { [name: string]: Rule }, node: ASTNode, key: number): React.ReactNode {
    if (typeof node === 'string') {
        return node;
    }
    const type = ruleMap[node.type];
    const element = type.react(node);
    const children = element.children || node.content.map((child, i) => buildInternal(ruleMap, child, i));
    return React.createElement(element.type, { ...element.props, key }, children);
}

export function parse(rules: Array<Rule>, value: string): AST {
    const initialAST: AST = [value];
    return rules.reduce((ast, rule) => ast.flatMap(node => parseNode(rule, node)), initialAST).flatMap(simplify);
}

export function build(rules: Array<Rule>, ast: AST): React.ReactNode {
    const ruleMap = rules.reduce((acc, rule) => ({ ...acc, [rule.name]: rule }), {});
    const nodes = ast.map((node, i) => buildInternal(ruleMap, node, i));
    return React.createElement(React.Fragment, {}, nodes);
}

export function parseIntoJsx(rules: Array<Rule>, value: string): React.ReactNode {
    const ast = parse(rules, value);
    return build(rules, ast);
}

export function getText(node: AST | ASTNode): string {
    if (typeof node === 'string') {
        return node;
    } else if (Array.isArray(node)) {
        return node.map(getText).join(' ');
    } else {
        return node.content.map(getText).join(' ');
    }
}
