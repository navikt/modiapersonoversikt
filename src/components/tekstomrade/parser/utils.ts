import { AST, ASTNode } from './domain';

export type RegexMatch = {
    fullmatch: string;
    capture: Array<string>;
    index: number;
    input: string;
};

export function match(regex: RegExp, content: string): null | RegexMatch {
    const res = regex.exec(content);
    if (!res) {
        return null;
    }
    const [fullmatch, ...capture] = res;
    return {
        fullmatch,
        capture,
        index: res.index,
        input: res.input
    };
}

export function minBy<T>(fn: (t: T) => number) {
    return (acc: null | T, value: T): null | T => {
        if (acc === null) {
            return value;
        }
        const accFn = fn(acc);
        const valueFn = fn(value);

        return accFn < valueFn ? acc : value;
    };
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
