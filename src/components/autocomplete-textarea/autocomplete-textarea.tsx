import * as React from 'react';
import { useCallback, useState } from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import classNames from 'classnames';
import {
    autofullfor,
    AutofullforData,
    byggAutofullforMap,
    useAutoFullforData
} from '../../app/personside/dialogpanel/sendMelding/autofullforUtils';
import { Locale } from '../../app/personside/dialogpanel/sendMelding/standardTekster/domain';
import * as StandardTeksterModels from '../../app/personside/dialogpanel/sendMelding/standardTekster/domain';
import styled from 'styled-components/macro';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import { guid } from 'nav-frontend-js-utils';
import { Undertittel } from 'nav-frontend-typografi';
import { loggEvent } from '../../utils/logger/frontendLogger';
import { useErKontaktsenter } from '../../utils/enheter-utils';
import { rapporterBruk } from '../../app/personside/dialogpanel/sendMelding/standardTekster/sokUtils';
import skrivestotteResource from '../../rest/resources/skrivestotteResource';

interface InlineRegel {
    type: 'internal';
    regex: RegExp;
    replacement: () => string;
}

interface ExternalRegel {
    type: 'external';
    regex: RegExp;
    externalId: string;
    locale?: Locale;
}

type Regel = InlineRegel | ExternalRegel;

type Regler = Array<Regel>;

function useRules(): Regler {
    const erKontaktsenter = useErKontaktsenter();

    const nksSignaturReferanse = 'fd71ff08-be9c-4e90-a6f8-bc17a798f244';
    const navKontorSignaturReferanse = 'b4b67323-f57d-47a2-ac19-7ba4b62fe156';
    const signaturReferanse = erKontaktsenter ? nksSignaturReferanse : navKontorSignaturReferanse;
    return [
        { type: 'internal', regex: /^hei,?$/i, replacement: () => 'Hei [bruker.fornavn],\n' },
        { type: 'internal', regex: /^hi,?$/i, replacement: () => 'Hi [bruker.fornavn], ' },
        { type: 'internal', regex: /^foet$/i, replacement: () => '[bruker.navn] ' },

        { type: 'external', regex: /^mvh$/i, externalId: signaturReferanse },
        { type: 'external', regex: /^mvhen$/i, externalId: signaturReferanse, locale: Locale.en_US },
        { type: 'external', regex: /^mvhnn$/i, externalId: signaturReferanse, locale: Locale.nn_NO },
        { type: 'external', regex: /^mvhks$/i, externalId: nksSignaturReferanse },

        {
            type: 'external',
            regex: /^vint$/i,
            externalId: 'f31f5d09-4873-4f84-912d-0ff3636db1cd'
        },
        {
            type: 'external',
            regex: /^vinten$/i,
            externalId: 'f31f5d09-4873-4f84-912d-0ff3636db1cd',
            locale: Locale.en_US
        },
        {
            type: 'external',
            regex: /^korperm$/i,
            externalId: 'af2e6816-391c-4b8b-b00e-27f116aa3de8'
        },
        {
            type: 'external',
            regex: /^korpermeng$/i,
            externalId: 'af2e6816-391c-4b8b-b00e-27f116aa3de8',
            locale: Locale.en_US
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
        },
        {
            type: 'external',
            regex: /^sykperm$/i,
            externalId: '747920d1-e34a-4079-a780-ad9f78812c6e'
        },
        {
            type: 'external',
            regex: /^forskuddsøk$/i,
            externalId: '6c6a3604-d47a-4cb3-bd7b-a354e98de48c'
        },
        {
            type: 'internal',
            regex: /^aap$/i,
            replacement: () => 'arbeidsavklaringspenger '
        },
        {
            type: 'internal',
            regex: /^aapen$/i,
            replacement: () => 'work assessment allowance '
        },
        {
            type: 'internal',
            regex: /^aapnn$/i,
            replacement: () => 'arbeidsavklaringspengar '
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
            regex: /^fp$/i,
            replacement: () => 'foreldrepenger '
        },
        {
            type: 'internal',
            regex: /^bm$/i,
            replacement: () => 'bidragsmottaker '
        },
        {
            type: 'internal',
            regex: /^ag$/i,
            replacement: () => 'arbeidsgiver '
        },
        {
            type: 'internal',
            regex: /^bp$/i,
            replacement: () => 'bidragspliktig '
        },
        {
            type: 'internal',
            regex: /^ub$/i,
            replacement: () => 'utbetaling '
        },
        {
            type: 'internal',
            regex: /^dp$/i,
            replacement: () => 'dagpenger '
        },
        {
            type: 'internal',
            regex: /^dpv$/i,
            replacement: () => 'dagpengevedtak '
        },
        {
            type: 'internal',
            regex: /^sp$/i,
            replacement: () => 'sykepenger '
        },
        {
            type: 'internal',
            regex: /^sosp$/i,
            replacement: () => 'søknad om sykepenger '
        },
        {
            type: 'internal',
            regex: /^info$/i,
            replacement: () => 'informasjon '
        },
        {
            type: 'internal',
            regex: /^baut$/i,
            replacement: () => 'utvidet barnetrygd '
        },
        {
            type: 'internal',
            regex: /^baor$/i,
            replacement: () => 'ordinær barnetrygd '
        },
        {
            type: 'internal',
            regex: /^aareg$/i,
            replacement: () => 'arbeidsgiver- og arbeidstakerregisteret '
        }
    ];
}

const HjelpetekstStyle = styled.div`
    position: absolute;
    top: 2.8rem;
    left: 0.25rem;
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
            <Hjelpetekst id={guid()} type={PopoverOrientering.UnderVenstre}>
                <Undertittel>Autofullfør-tips:</Undertittel>
                <ul>
                    <li>foet + mellomrom: Brukers fulle navn</li>
                    <li>mvh + mellomrom: Signatur</li>
                    <li>mvhks + mellomrom: Signatur fra KS</li>
                    <li>hei + mellomrom: Hei bruker</li>
                    <li>vint + mellomrom: Videreformidle Internt (vinten for engelsk)</li>
                    <li>AAP + mellomrom: arbeidsavklaringspenger</li>
                    <li>sbt + mellomrom: saksbehandlingstid</li>
                    <li>nay + mellomrom: NAV Arbeid og ytelser</li>
                    <li>nfp + mellomrom: NAV Familie- og pensjonsytelser</li>
                    <li>hi, + mellomrom: Hi, bruker (engelsk)</li>
                    <li>mvh/aap + nn eller en + mellomrom: autofullfør på nynorsk eller engelsk</li>
                    <li>korkonk + mellomrom: Informasjon ved konkurs</li>
                    <li>korperm + mellomrom: Informasjon ved permittering</li>
                    <li>koroms + mellomrom: OMS - Korona stengt bhg/skole</li>
                    <li>korosakt + mellomrom: OS - Korona aktivitet STO</li>
                    <li>sykperm + mellomrom: Sykmeldt og permittert</li>
                    <li>forskuddsøk + mellomrom: Søke om forskudd</li>
                    <li>fp + mellomrom: foreldrepenger</li>
                    <li>bm + mellomrom: bidragsmottaker</li>
                    <li>bp + mellomrom: bidragspliktig</li>
                    <li>ag + mellomrom: arbeidsgiver</li>
                    <li>ub + mellomrom: utbetaling</li>
                    <li>dp + mellomrom: dagpenger</li>
                    <li>dpv + mellomrom: dagpengevedtak</li>
                    <li>sp + mellomrom: sykepenger</li>
                    <li>sosp + mellomrom: søknad om sykepenger</li>
                    <li>info + mellomrom: informasjon</li>
                    <li>baut + mellomrom: utvidet barnetrygd</li>
                    <li>baor + mellomrom: ordinær barnetrygd</li>
                    <li>aareg + mellomrom: arbeidsgiver- og arbeidstakerregisteret</li>
                </ul>
            </Hjelpetekst>
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

function autoFullfor(autofullforData: AutofullforData, parsedText: string) {
    const autofullforMap = byggAutofullforMap(
        Locale.nb_NO,
        autofullforData.enhet,
        autofullforData.person,
        autofullforData.saksbehandler
    );

    return autofullfor(parsedText, autofullforMap);
}

const tellerTekstCls = (remaining: number) => classNames('teller-tekst', { 'teller-tekst--overflow': remaining < 0 });

function noAriaTellerTekst(antallTegn: number, maxLength: number) {
    const difference = maxLength - antallTegn;
    return (
        <span className={tellerTekstCls(difference)}>
            {difference >= 0 && `Du har ${difference} tegn igjen`}
            {difference < 0 && `Du har ${Math.abs(difference)} tegn for mye`}
        </span>
    );
}

function asChangeEvent<T>(event: React.KeyboardEvent<T>): React.ChangeEvent<T> {
    if (event.target && event.target === event.currentTarget) {
        return event as any;
    } else {
        throw new Error('Not equals at all');
    }
}

function AutocompleteTextarea(props: TextareaProps) {
    const autofullforData = useAutoFullforData();
    const [feilmelding, settFeilmelding] = useState<string>();
    const standardtekster = skrivestotteResource.useFetch();
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
                                if (standardtekster.data) {
                                    const tekst: StandardTeksterModels.Tekst = standardtekster.data[rule.externalId];
                                    if (tekst === undefined) {
                                        settFeilmelding(`Ukjent tekst. Kontakt IT: ${rule.externalId}`);
                                        return acc + ' ';
                                    }
                                    const locale = rule.locale || Locale.nb_NO;
                                    const innhold = tekst.innhold[locale];
                                    if (innhold === undefined) {
                                        settFeilmelding(
                                            `Fant ikke tekst. Kontakt IT: ${rule.externalId}@${rule.locale}`
                                        );
                                        return acc + ' ';
                                    }

                                    rapporterBruk(tekst);
                                    return innhold;
                                } else {
                                    settFeilmelding(`Tekster ikke lastet enda. Kontakt IT om problemet vedvarer. `);
                                    return acc + ' ';
                                }
                            }
                        }
                        return acc;
                    }, word);

                    const fullfortTekst = autofullforData ? autoFullfor(autofullforData, replacement) : replacement;

                    event.currentTarget.value = [value.substring(0, start), fullfortTekst, value.substring(end)].join(
                        ''
                    );

                    event.currentTarget.selectionEnd = cursorPosition + (fullfortTekst.length - word.length);

                    onChange(asChangeEvent(event));
                }
            }
        },
        [autofullforData, onChange, rules, standardtekster]
    );

    return (
        <Style>
            <Textarea onKeyDown={onKeyDown} {...props} maxLength={props.maxLength} tellerTekst={noAriaTellerTekst} />
            <AutoTekstTips />
            {feilmelding && <AlertStripeFeil>{feilmelding}</AlertStripeFeil>}
        </Style>
    );
}

export default AutocompleteTextarea;
