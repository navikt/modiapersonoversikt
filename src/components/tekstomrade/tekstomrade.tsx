import React from 'react';
import 'nav-frontend-skjema-style';
import classNames from 'classnames';
import { HighlightRule, LinkRule, BoldRule, ParagraphRule } from './parser/rules';
import { parse, build } from './parser/parser';
import { Rule } from './parser/domain';

export * from './parser/rules';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    as: string | React.ComponentType;
    children: string;
    ingenFormattering: boolean;
    rules: Array<Rule>;
}

const cls = (className?: string) => classNames('tekstomrade', className);

// TODO Erstattes med nav-frontend-tekstomrade på sikt
class Tekstomrade extends React.Component<Props> {
    static defaultProps = {
        as: 'div',
        ingenFormattering: false,
        rules: [ParagraphRule, HighlightRule, BoldRule, LinkRule]
    };

    render() {
        const { as, children, ingenFormattering, rules, className, ...rest } = this.props;

        const elements = ingenFormattering ? children : build(parse(children, this.props.rules), this.props.rules);

        return React.createElement<any>(as, { className: cls(className), ...rest }, elements);
    }
}

export default Tekstomrade;
