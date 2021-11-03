import * as React from 'react';
import NavFrontendTekstomrade, {
    LinebreakRule,
    LinkRule as NavFrontendLinkRule,
    ParagraphRule,
    Rule,
    TekstomradeProps as NavFrontendTekstomradeProps
} from 'nav-frontend-tekstomrade';
import { AST, ASTNode, ReactElementDescription } from '@navikt/textparser';

export type { Rule } from 'nav-frontend-tekstomrade';
export {
    createDynamicHighlightingRule,
    LinebreakRule,
    HighlightRule,
    BoldRule,
    ParagraphRule
} from 'nav-frontend-tekstomrade';

export const LinkRule: Rule = {
    ...NavFrontendLinkRule,
    react(node: ASTNode, ast: AST): ReactElementDescription {
        const original = NavFrontendLinkRule.react(node, ast);
        const props = original.props ?? {};
        props.rel = 'noopener noreferrer';
        original.props = props;
        return original;
    }
};

export const defaultRules: Rule[] = [LinkRule, LinebreakRule, ParagraphRule];

export type TekstomradeProps = Omit<NavFrontendTekstomradeProps, 'as' | 'ingenFormattering' | 'rules'> &
    Partial<Pick<NavFrontendTekstomradeProps, 'as' | 'ingenFormattering' | 'rules'>>;

function Tekstomrade(props: TekstomradeProps) {
    return <NavFrontendTekstomrade {...props} />;
}

export default Tekstomrade;
