import React from 'react';
import 'nav-frontend-skjema-style';
import classNames from 'classnames';
import './tekstomrade.less';
import { parseIntoJsx, Rule } from './utils';
import { HighlightRule, LinkRule, ParagraphRule } from './rules';
export * from './rules';

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
        rules: [ParagraphRule, HighlightRule, LinkRule]
    };

    render() {
        const { as, children, ingenFormattering, rules, className, ...rest } = this.props;

        const elements = ingenFormattering ? children : parseIntoJsx(rules, children);

        return React.createElement<any>(as, { className: cls(className), ...rest }, elements);
    }
}

export default Tekstomrade;
