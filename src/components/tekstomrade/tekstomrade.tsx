import React from 'react';
import 'nav-frontend-skjema-style';
import classNames from 'classnames';
import { build, parse } from './parser/parser';
import { Rule } from './parser/domain';
import { LinebreakRule, LinkRule, ParagraphRule } from './parser/rules';

export * from './parser/rules';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    as: string | React.ComponentType;
    children: string;
    ingenFormattering: boolean;
    rules: Array<Rule>;
}

const cls = (className?: string) => classNames('tekstomrade', className);

// TODO Erstattes med nav-frontend-tekstomrade på sikt
export const defaultRules = [LinkRule, LinebreakRule, ParagraphRule];
class Tekstomrade extends React.Component<Props> {
    static defaultProps = {
        as: 'div',
        ingenFormattering: false,
        rules: defaultRules,
        children: ''
    };

    render() {
        const { as, children, ingenFormattering, rules, className, ...rest } = this.props;

        const elements = ingenFormattering ? children : build(parse(children, this.props.rules), this.props.rules);

        return React.createElement<any>(as, { className: cls(className), ...rest }, elements);
    }
}

export default Tekstomrade;
