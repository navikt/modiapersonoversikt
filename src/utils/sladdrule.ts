import { Rule, RuleScope, ASTNode, RegexMatch, ReactElementDescription } from '@navikt/textparser';
import styled from 'styled-components';

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
    react(): ReactElementDescription {
        return {
            type: Span
        };
    }
};
