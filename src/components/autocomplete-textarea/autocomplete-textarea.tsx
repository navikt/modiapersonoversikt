import * as React from 'react';
import { useCallback } from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import {
    autofullfor,
    AutofullforData,
    byggAutofullforMap
} from '../../app/personside/dialogpanel/sendMelding/autofullforUtils';
import { MultiRestResourceConsumerBase } from '../../rest/consumer/MultiRestResourceConsumer';
import { STATUS } from '../../rest/utils/utils';
import { Locale } from '../../app/personside/dialogpanel/sendMelding/standardTekster/domain';

const rules = [
    { regex: /^hei,?$/i, replacement: 'Hei, [bruker.fornavn]\n' },
    { regex: /^mvh$/i, replacement: 'Med vennlig hilsen\n[saksbehandler.fornavn]\nNAV Kontaktsenter' }
];

const SPACE = 32;
const ENTER = 13;

function findWordBoundary(text: string, initialPosition: number): [number, number] {
    let start = initialPosition;
    let end = initialPosition;
    let spaces = /\s/;

    while (start >= 0 && !spaces.exec(text[start])) {
        start--;
    }
    while (end < text.length && !spaces.exec(text[end])) {
        end++;
    }

    return [Math.max(0, start + 1), Math.min(text.length, end)];
}

function AutocompleteTextarea(props: TextareaProps) {
    return (
        <MultiRestResourceConsumerBase<AutofullforData>
            getResource={restResources => ({
                person: restResources.personinformasjon,
                saksbehandler: restResources.innloggetSaksbehandler,
                kontor: restResources.brukersNavKontor
            })}
        >
            {(status: STATUS, data: AutofullforData | null) => (
                <AutocompleteTextareaComponent {...props} status={status} data={data} />
            )}
        </MultiRestResourceConsumerBase>
    );
}

function AutocompleteTextareaComponent(props: TextareaProps & { status: STATUS; data: AutofullforData | null }) {
    const { status, data, ...rest } = props;
    const onKeyDown: React.KeyboardEventHandler = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if ([SPACE, ENTER].includes(event.which)) {
                const cursorPosition =
                    event.currentTarget.selectionStart === event.currentTarget.selectionEnd
                        ? event.currentTarget.selectionStart
                        : -1;
                if (cursorPosition >= 0) {
                    const value = event.currentTarget.value;
                    const [start, end] = findWordBoundary(value, cursorPosition);
                    const word = value.substring(start, end);

                    const replacement = rules.reduce((acc: string, { regex, replacement }) => {
                        if (acc.match(regex)) {
                            event.preventDefault();
                            event.stopPropagation();
                            return replacement;
                        }
                        return acc;
                    }, word);

                    let fullfortTekst = replacement;
                    if (data !== null) {
                        const autofullforMap = byggAutofullforMap(
                            data.person,
                            data.kontor,
                            data.saksbehandler,
                            Locale.nb_NO
                        );
                        fullfortTekst = autofullfor(replacement, autofullforMap);
                    }

                    event.currentTarget.value = [value.substring(0, start), fullfortTekst, value.substring(end)].join(
                        ''
                    );
                }
            }
        },
        [status]
    );

    return <Textarea onKeyDown={onKeyDown} {...rest} />;
}

export default AutocompleteTextarea;
