import React, { ChangeEvent, RefObject } from 'react';
import { NavFrontendInputProps } from 'nav-frontend-skjema';
import 'nav-frontend-skjema-style';
import { guid } from 'nav-frontend-js-utils';
import classNames from 'classnames';
import { Omit } from '../../utils/types';
import './tag-input.less';
import { Knapp } from 'nav-frontend-knapper';

const cls = (className?: string) => classNames('tag-input', 'skjemaelement', className);
const inputClass = (width: string, focusWithin: boolean, className?: string, harFeil?: boolean) =>
    classNames(
        'skjemaelement__input',
        { 'skjemaelement__input--focus': focusWithin },
        className,
        `input--${width.toLowerCase()}`,
        { 'skjemaelement__input--harFeil': harFeil }
    );

const tagsRegex = /#(\S+)\s/g;
function matchAll(value: string, regex: RegExp): RegExpExecArray[] {
    let out: RegExpExecArray[] = [];
    let res: RegExpExecArray | null;
    while ((res = regex.exec(value)) !== null) {
        out.push(res);
    }
    return out;
}

export function parseTekst(query: string): { tags: string[]; text: string } {
    const tags = matchAll(query, tagsRegex).map(([fullMatch, group]) => group);
    const text = query.replace(tagsRegex, '');
    return { tags, text };
}

type Props = Omit<NavFrontendInputProps, 'value' | 'name' | 'inputRef'> & {
    value: string;
    name: string;
    onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
};
interface State {
    focusWithin: boolean;
}

function buildString(tags: string[], value: string) {
    const separator = tags.length > 0 ? ' ' : '';
    return [tags.map(tag => `#${tag}`).join(' '), separator, value].filter(v => v.length !== 0).join('');
}

// TODO Erstattes med nav-frontend-skjema (tag-input) på sikt
class TagInput extends React.Component<Props, State> {
    private readonly inputId = this.props.id || this.props.name || guid();
    private readonly ref: RefObject<HTMLInputElement>;

    constructor(props: Props) {
        super(props);

        this.state = {
            focusWithin: false
        };
        this.ref = React.createRef();
        this.onChangeProxy = this.onChangeProxy.bind(this);
        this.onKeyDownProxy = this.onKeyDownProxy.bind(this);
        this.onFocusProxy = this.onFocusProxy.bind(this);
        this.onBlurProxy = this.onBlurProxy.bind(this);
        this.createChangeEvent = this.createChangeEvent.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        const { text } = parseTekst(this.props.value);
        this.onChangeProxy(this.createChangeEvent(text));
    }

    onChangeProxy(event: React.ChangeEvent<HTMLInputElement>, option?: { tags: string[] }) {
        const value = event.target.value;
        const { tags } = option || parseTekst(this.props.value);
        const rawStr = buildString(tags, value);

        const clonedTarget = {
            ...event.target,
            value: rawStr
        };
        const clonedEvent: React.ChangeEvent<HTMLInputElement> = {
            ...event,
            target: clonedTarget
        };
        if (this.props.onChange) {
            this.props.onChange(clonedEvent);
        }
    }

    onKeyDownProxy(e: React.KeyboardEvent<HTMLInputElement>) {
        const { tags } = parseTekst(this.props.value);
        const cursorAtStart = e.currentTarget.selectionStart === 0 && e.currentTarget.selectionEnd === 0;
        const hasTags = tags.length > 0;
        const wasBackspace = e.key === 'Backspace';

        if (wasBackspace && hasTags && cursorAtStart) {
            this.remove(tags.length - 1);
            e.preventDefault();
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    }

    onFocusProxy(e: React.FocusEvent<HTMLInputElement>) {
        this.setState({ focusWithin: true });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    onBlurProxy(e: React.FocusEvent<HTMLInputElement>) {
        this.setState({ focusWithin: false });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    createChangeEvent(value: string): ChangeEvent<HTMLInputElement> {
        const target = { ...(this.ref.current || {}), value };
        return ({
            target: target,
            currentTarget: target
        } as unknown) as ChangeEvent<HTMLInputElement>;
    }

    remove(index: number) {
        const { text, tags } = parseTekst(this.props.value);
        this.onChangeProxy(this.createChangeEvent(text), { tags: tags.filter((_, i) => i !== index) });
    }

    render() {
        const { label, bredde = 'fullbredde', feil, name, className, inputClassName, ...other } = this.props;
        const { tags, text } = parseTekst(this.props.value);
        const tagElements = tags.map((tag, i) => {
            return (
                <Knapp key={i} mini className="tag-input__tag" onClick={() => this.remove(i)} title="Remove tag">
                    <span>{tag}</span>
                    <span className="tag-input__tag-remove" aria-hidden={true} />
                </Knapp>
            );
        });

        return (
            <div className={cls(className)}>
                <label className="skjemaelement__label" htmlFor={this.inputId}>
                    {label}
                </label>
                <div className={inputClass(bredde, this.state.focusWithin, inputClassName, !!feil)}>
                    <div className="tag-input__tags">{tagElements}</div>
                    <input
                        {...other}
                        onFocus={this.onFocusProxy}
                        onBlur={this.onBlurProxy}
                        onChange={this.onChangeProxy}
                        onKeyDown={this.onKeyDownProxy}
                        type="text"
                        className="tag-input__input"
                        id={this.inputId}
                        name={name}
                        value={text}
                        ref={this.ref}
                    />
                </div>
                <div role="alert" aria-live="assertive">
                    {feil && <div className="skjemaelement__feilmelding">{feil.feilmelding}</div>}
                </div>
            </div>
        );
    }
}
export default TagInput;
