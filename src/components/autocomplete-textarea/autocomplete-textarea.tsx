import * as React from 'react';
import { useCallback } from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import {
    autofullfor,
    AutofullforData,
    byggAutofullforMap,
    useAutoFullførData
} from '../../app/personside/dialogpanel/sendMelding/autofullforUtils';
import { Locale } from '../../app/personside/dialogpanel/sendMelding/standardTekster/domain';
import styled from 'styled-components';
import { HjelpetekstUnderHoyre } from 'nav-frontend-hjelpetekst';
import { guid } from 'nav-frontend-js-utils';
import { Undertittel } from 'nav-frontend-typografi';
import { loggEvent } from '../../utils/frontendLogger';

const rules = [
    { regex: /^hei,?$/i, replacement: 'Hei, [bruker.fornavn]\n' },
    { regex: /^mvh$/i, replacement: 'Med vennlig hilsen\n[saksbehandler.fornavn]\nNAV Kontaktsenter' },
    { regex: /^foet$/i, replacement: '[bruker.navn] ' }
];

const HjelpetekstStyle = styled.div`
    position: absolute;
    top: 2.8rem;
    left: -1rem;
    ul {
        list-style: circle;
        margin-top: 1rem;
        li {
            margin-left: 1.5rem;
        }
    }
`;

function AutoTekstTips() {
    return (
        <HjelpetekstStyle>
            <HjelpetekstUnderHoyre id={guid()}>
                <Undertittel>Autofullfør-tips:</Undertittel>
                <ul>
                    <li>foet + mellomrom: Brukers fulle navn</li>
                    <li>mvh + mellomrom: Signatur</li>
                    <li>hei + mellomrom: Hei bruker</li>
                </ul>
            </HjelpetekstUnderHoyre>
        </HjelpetekstStyle>
    );
}

const SPACE = 32;
const ENTER = 13;

function findWordBoundary(text: string, initialPosition: number): [number, number] {
    const words = text.split(/\s/);
    const indices = new Array(words.length);
    for (let i = 0; i < words.length; i++) {
        const start = i === 0 ? 0 : indices[i - 1][1] + 1;
        const end = start + words[i].length;
        indices[i] = [start, end];

        if (start <= initialPosition && end >= initialPosition) {
            return [start, end];
        }
    }

    return [0, 0];
}

const Style = styled.div`
    position: relative;
`;

function autoFullfør(autofullførData: AutofullforData, parsedText: string) {
    const autofullforMap = byggAutofullforMap(
        Locale.nb_NO,
        autofullførData.person,
        autofullførData.kontor,
        autofullførData.saksbehandler
    );
    const fullfortTekst = autofullfor(parsedText, autofullforMap);
    return fullfortTekst;
}

function AutocompleteTextarea(props: TextareaProps) {
    const autofullførData = useAutoFullførData();
    const onChange = props.onChange;
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

                    const word = value.substring(start, end).trim();

                    const replacement = rules.reduce((acc: string, { regex, replacement }) => {
                        if (acc.match(regex)) {
                            event.preventDefault();
                            event.stopPropagation();
                            loggEvent('Autocomplete', 'Textarea', { type: acc.toLowerCase() });
                            return replacement;
                        }
                        return acc;
                    }, word);

                    const fullfortTekst = autofullførData ? autoFullfør(autofullførData, replacement) : replacement;

                    event.currentTarget.value = [value.substring(0, start), fullfortTekst, value.substring(end)].join(
                        ''
                    );

                    event.currentTarget.selectionEnd = cursorPosition + (fullfortTekst.length - word.length);

                    onChange(event);
                }
            }
        },
        [autofullførData, onChange]
    );

    return (
        <Style>
            <Textarea onKeyDown={onKeyDown} {...props} />
            <AutoTekstTips />
        </Style>
    );
}

export default AutocompleteTextarea;
