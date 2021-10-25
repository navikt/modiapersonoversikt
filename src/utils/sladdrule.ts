import { Rule, RuleScope, ASTNode, AST, RegexMatch, ReactElementDescription } from '@navikt/textparser';
import styled from 'styled-components/macro';

const Span = styled.span`
    border-radius: 4px;
    background: currentColor !important;
    box-decoration-break: clone;
`;

export const rule: Rule = {
    name: 'sladd',
    scope: RuleScope.INLINE,
    regex: /(\*{2,}[*\s]*\*)/g,
    parse(match: RegexMatch): ASTNode {
        return {
            name: 'sladd',
            content: [match.capture[0]]
        };
    },
    react(node: ASTNode, ast: AST): ReactElementDescription {
        return {
            type: Span
        };
    }
};
