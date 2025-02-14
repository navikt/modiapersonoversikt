import { LinebreakRule, type Rule, build, parse } from '@navikt/textparser';
import { LinkRule, ParagraphRule } from './rules';

export {
    LinebreakRule,
    HighlightRule,
    createDynamicHighlightingRule,
    BoldRule
} from '@navikt/textparser';
export * from './rules';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Overwrite component
     */
    as?: string | React.ComponentType;
    /**
     * Raw text to be formatted
     */
    children: string;
    /**
     * Disable formatting
     */
    disableFormatting?: boolean;
    /**
     * Rules used to parse the text
     */
    rules: Rule[];
}

export const defaultRules: Rule[] = [LinkRule, LinebreakRule, ParagraphRule];

const RichText = ({ as: Comp = 'div', children, disableFormatting, rules, ...rest }: Props) => {
    if (typeof children !== 'string') {
        return null;
    }

    if (disableFormatting) {
        return <div {...rest}>children</div>;
    }

    const ast = parse(children, rules);
    const content = build(ast, rules);

    return <Comp {...rest}>{content}</Comp>;
};

export default RichText;
