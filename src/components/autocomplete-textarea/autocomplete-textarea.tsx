import * as React from 'react';
import { useCallback, useState } from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import {
    autofullfor,
    AutofullforData,
    byggAutofullforMap,
    useAutoFullførData
} from '../../app/personside/dialogpanel/sendMelding/autofullforUtils';
import { Locale } from '../../app/personside/dialogpanel/sendMelding/standardTekster/domain';
import * as StandardTeksterModels from '../../app/personside/dialogpanel/sendMelding/standardTekster/domain';
import styled from 'styled-components/macro';
import { HjelpetekstUnderHoyre } from 'nav-frontend-hjelpetekst';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { loggEvent } from '../../utils/logger/frontendLogger';
import theme from '../../styles/personOversiktTheme';
import { useErKontaktsenter } from '../../utils/enheterUtils';
import { useRestResource } from '../../rest/consumer/useRestResource';
import useFetch, { FetchResult, hasData } from '@nutgaard/use-fetch';

interface InlineRegel {
    type: 'internal';
    regex: RegExp;
    replacement: () => string;
}

interface ExternalRegel {
    type: 'external';
    regex: RegExp;
    externalId: string;
}

type Regel = InlineRegel | ExternalRegel;

type Regler = Array<Regel>;

function useRules(): Regler {
    const erKontaktsenter = useErKontaktsenter();
    const saksbehandlerResources = useRestResource(resources => resources.innloggetSaksbehandler);
    const saksbehanderEnhet = saksbehandlerResources.data?.enhetNavn ?? '';
    return [
        { type: 'internal', regex: /^hei,?$/i, replacement: () => 'Hei, [bruker.fornavn]\n' },
        {
            type: 'internal',
            regex: /^mvh$/i,
            replacement: () => {
                const mvh = 'Med vennlig hilsen';
                if (erKontaktsenter) {
                    return `${mvh}\n[saksbehandler.fornavn]\nNAV Kontaktsenter`;
                }
                return `${mvh}\n[saksbehandler.navn]\n${saksbehanderEnhet}`;
            }
        },
        { type: 'internal', regex: /^foet$/i, replacement: () => '[bruker.navn] ' },
        {
            type: 'external',
            regex: /^vint$/i,
            externalId: 'f31f5d09-4873-4f84-912d-0ff3636db1cd'
        },
        {
            type: 'internal',
            regex: /^aap$/i,
            replacement: () => 'arbeidsavklaringspenger '
        },
        {
            type: 'internal',
            regex: /^sbt$/i,
            replacement: () => 'saksbehandlingstid '
        },
        {
            type: 'internal',
            regex: /^nay$/i,
            replacement: () => 'NAV Arbeid og ytelser '
        },
        {
            type: 'internal',
            regex: /^nfp$/i,
            replacement: () => 'NAV Familie- og pensjonsytelser '
        },
        {
            type: 'internal',
            regex: /^aapen$/i,
            replacement: () => 'work assessment allowance '
        },
        { type: 'internal', regex: /^hi,?$/i, replacement: () => 'Hi, [bruker.fornavn] ' },
        {
            type: 'internal',
            regex: /^mvhen$/i,
            replacement: () => {
                const bestregards = `Best regards`;
                if (erKontaktsenter) {
                    return `${bestregards}\n[saksbehandler.fornavn]\nNAV Call and Service Centre`;
                }
                return `${bestregards}\n[saksbehandler.navn]\n${saksbehanderEnhet}`;
            }
        },
        {
            type: 'internal',
            regex: /^mvhnn$/i,
            replacement: () => {
                const mvh = 'Med vennleg helsing';
                if (erKontaktsenter) {
                    return `${mvh}\n[saksbehandler.fornavn]\nNAV Kontaktsenter`;
                }
                return `${mvh}\n[saksbehandler.navn]\n${saksbehanderEnhet}`;
            }
        },
        {
            type: 'internal',
            regex: /^aapnn$/i,
            replacement: () => 'arbeidsavklaringspengar '
        },
        {
            type: 'external',
            regex: /^korperm$/i,
            externalId: 'af2e6816-391c-4b8b-b00e-27f116aa3de8'
        },
        {
            type: 'external',
            regex: /^korkonk$/i,
            externalId: 'f15b6b9b-0cb6-4c46-8c37-0069e681ecdc'
        },
        {
            type: 'external',
            regex: /^koroms$/i,
            externalId: '056be54e-d93d-487c-a6c2-238c885bdfd8'
        },
        {
            type: 'external',
            regex: /^korosakt$/i,
            externalId: '788b0492-a5e8-4883-a6af-6387ff1e46d6'
        }
    ];
}

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
                    <li>vint + mellomrom: Videreformidle Internt</li>
                    <li>AAP + mellomrom: arbeidsavklaringspenger</li>
                    <li>sbt + mellomrom: saksbehandlingstid</li>
                    <li>nay + mellomrom: NAV Arbeid og ytelser</li>
                    <li>nfp + mellomrom: NAV Familie- og pensjonsytelser</li>
                    <li>hi, + mellomrom: Hi, bruker (engelsk)</li>
                    <li>mvh/aap + nn + mellomrom: autofullfør på nynorsk</li>
                    <li>mvh/aap + en + mellomrom: autofullfør på engelsk</li>
                    <li>korkonk + mellomrom: Informasjon ved konkurs</li>
                    <li>korperm + mellomrom: Informasjon ved permittering</li>
                    <li>koroms + mellomrom: OMS - Korona stengt bhg/skole</li>
                    <li>korosakt + mellomrom: OS - Korona aktivitet STO</li>
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

const TegnIgjenStyle = styled(Normaltekst)<{ feil: boolean }>`
    text-align: right;
    font-style: italic;
    color: ${props => (props.feil ? theme.color.redError : theme.color.navGra60)};
`;

function TegnIgjen(props: { maxLength?: number; text: string }) {
    if (!props.maxLength) {
        return null;
    }

    return (
        <TegnIgjenStyle feil={props.text.length > props.maxLength}>
            Du har {props.maxLength - props.text.length} tegn igjen
        </TegnIgjenStyle>
    );
}

function AutocompleteTextarea(props: TextareaProps) {
    const autofullførData = useAutoFullførData();
    const [feilmelding, settFeilmelding] = useState<string>();
    const standardtekster: FetchResult<StandardTeksterModels.Tekster> = useFetch<StandardTeksterModels.Tekster>(
        '/modiapersonoversikt-skrivestotte/skrivestotte'
    );
    const rules = useRules();
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
                    const replacement = rules.reduce((acc: string, rule) => {
                        if (acc.match(rule.regex)) {
                            event.preventDefault();
                            event.stopPropagation();
                            loggEvent('Autocomplete', 'Textarea', { type: acc.toLowerCase() });
                            if (rule.type === 'internal') {
                                settFeilmelding(undefined);
                                return rule.replacement();
                            } else {
                                if (hasData(standardtekster)) {
                                    const tekst: StandardTeksterModels.Tekst = standardtekster.data[rule.externalId];
                                    if (tekst === undefined) {
                                        settFeilmelding(`Ukjent tekst. Kontakt IT: ${rule.externalId}`);
                                        return acc + ' ';
                                    }
                                    const innhold = tekst.innhold[Locale.nb_NO];
                                    if (innhold === undefined) {
                                        settFeilmelding(`Fant ikke tekst. Kontakt IT: ${rule.externalId}`);
                                        return acc + ' ';
                                    }
                                    return innhold;
                                } else {
                                    settFeilmelding(`Tekster ikke lastet enda. Kontakt IT om problemet vedvarer. `);
                                    return acc + ' ';
                                }
                            }
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
        [autofullførData, onChange, rules, standardtekster]
    );

    return (
        <Style>
            <Textarea onKeyDown={onKeyDown} {...props} maxLength={0} />
            <AutoTekstTips />
            <TegnIgjen maxLength={props.maxLength} text={props.value} />
            {feilmelding && <AlertStripeFeil>{feilmelding}</AlertStripeFeil>}
        </Style>
    );
}

export default AutocompleteTextarea;
