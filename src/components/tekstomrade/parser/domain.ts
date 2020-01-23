import React from 'react';
import { RegexMatch } from './utils';

export type ASTNode =
    | string
    | {
          name: string;
          content: AST;
      };

export type AST = Array<ASTNode>;

export enum RuleScope {
    BLOCK,
    INLINE
}

export type Rule = {
    name: string;
    scope: RuleScope;
    regex: RegExp;
    parse(match: RegexMatch): ASTNode;
    react(node: ASTNode): ReactElementDescription;
    [key: string]: any;
};

export interface ReactElementDescription {
    type: string | React.ComponentType<any>;
    props?: { [key: string]: any };
    children?: Array<React.ReactNode>;
}
