import { Alert, Textarea } from '@navikt/ds-react';
import {
    type ChangeEvent,
    type ComponentProps,
    type KeyboardEvent,
    type RefObject,
    useCallback,
    useState
} from 'react';
import { rapporterBruk } from 'src/app/personside/dialogpanel/sendMelding/standardTekster/sokUtils';
import { useStandardTekster } from 'src/lib/clients/skrivestotte';
import { Locale, type Tekst } from 'src/lib/types/skrivestotte';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import { rules } from './autocompleteRules';
import { type AutofullforData, autofullfor, byggAutofullforMap, useAutoFullforData } from './autocompleteUtils';

const SPACE = ' ';
const ENTER = 'Enter';

function findWordBoundary(text: string, initialPosition: number): [number, number] {
    const words = text.split(/\s/);
    const indices: [number, number][] = new Array(words.length);
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

function autoFullfor(autofullforData: AutofullforData, parsedText: string) {
    const autofullforMap = byggAutofullforMap(
        Locale.nb_NO,
        autofullforData.enhet,
        autofullforData.person,
        autofullforData.saksbehandler
    );

    return autofullfor(parsedText, autofullforMap);
}

function asChangeEvent<T>(event: KeyboardEvent<T>): ChangeEvent<T> {
    if (event.target && event.target === event.currentTarget) {
        return event as unknown as ChangeEvent<T>;
    }
    throw new Error('Not equals at all');
}

type Props = ComponentProps<typeof Textarea> & { ref?: RefObject<HTMLTextAreaElement | null> };

function AutocompleteTextarea({ onChange, description, ref, ...rest }: Props) {
    const autofullforData = useAutoFullforData();
    const [feilmelding, settFeilmelding] = useState<string>();
    const standardtekster = useStandardTekster();

    const onKeyDown: React.KeyboardEventHandler = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if ([SPACE, ENTER].includes(event.key)) {
                const cursorPosition =
                    event.currentTarget.selectionStart === event.currentTarget.selectionEnd
                        ? event.currentTarget.selectionStart
                        : -1;
                if (cursorPosition >= 0) {
                    const value = event.currentTarget.value;
                    const [start, end] = findWordBoundary(value, cursorPosition);

                    const word = value.substring(start, end).trim();
                    const replacement = rules.reduce((acc: string, rule) => {
                        if (acc.match(rule.regex)) {
                            event.preventDefault();
                            event.stopPropagation();
                            loggEvent('Autocomplete', 'Textarea', {
                                type: acc.toLowerCase()
                            });
                            if (rule.type === 'internal') {
                                settFeilmelding(undefined);
                                return rule.replacement();
                            }
                            if (standardtekster.data) {
                                const tekst: Tekst = standardtekster.data[rule.externalId];
                                if (tekst === undefined) {
                                    settFeilmelding(`Ukjent tekst. Kontakt IT: ${rule.externalId}`);
                                    return `${acc} `;
                                }
                                const locale = rule.locale || Locale.nb_NO;
                                const innhold = tekst.innhold[locale];
                                if (innhold === undefined) {
                                    settFeilmelding(`Fant ikke tekst. Kontakt IT: ${rule.externalId}@${rule.locale}`);
                                    return `${acc} `;
                                }

                                rapporterBruk(tekst);
                                return innhold;
                            }
                            settFeilmelding('Tekster ikke lastet enda. Kontakt IT om problemet vedvarer. ');
                            return `${acc} `;
                        }
                        return acc;
                    }, word);

                    const fullfortTekst = autofullforData ? autoFullfor(autofullforData, replacement) : replacement;

                    event.currentTarget.value = [value.substring(0, start), fullfortTekst, value.substring(end)].join(
                        ''
                    );

                    event.currentTarget.selectionEnd = cursorPosition + (fullfortTekst.length - word.length);

                    onChange?.(asChangeEvent(event));
                }
            }
        },
        [autofullforData, onChange, standardtekster]
    );

    return (
        <>
            <Textarea ref={ref} onKeyDown={onKeyDown} description={description} onChange={onChange} {...rest} />
            {feilmelding && (
                <Alert variant="error" inline size="small">
                    {feilmelding}
                </Alert>
            )}
        </>
    );
}

export default AutocompleteTextarea;
