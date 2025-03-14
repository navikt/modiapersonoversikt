import { Locale } from 'src/lib/types/skrivestotte';

export interface InlineRule {
    type: 'internal';
    regex: RegExp;
    replacement: () => string;
}

export interface ExternalRule {
    type: 'external';
    regex: RegExp;
    externalId: string;
    locale?: Locale;
}

export type Rule = InlineRule | ExternalRule;

export type Rules = Array<Rule>;

const navKontorSignaturReferanse = 'b4b67323-f57d-47a2-ac19-7ba4b62fe156';
export const rules: Rules = [
    {
        type: 'internal',
        regex: /^hei,?$/i,
        replacement: () => 'Hei, [bruker.fornavn]\n'
    },
    {
        type: 'internal',
        regex: /^hi,?$/i,
        replacement: () => 'Hi [bruker.fornavn], '
    },
    { type: 'internal', regex: /^foet$/i, replacement: () => '[bruker.navn] ' },

    {
        type: 'external',
        regex: /^mvh$/i,
        externalId: navKontorSignaturReferanse
    },
    {
        type: 'external',
        regex: /^mvhen$/i,
        externalId: navKontorSignaturReferanse,
        locale: Locale.en_US
    },
    {
        type: 'external',
        regex: /^mvhnn$/i,
        externalId: navKontorSignaturReferanse,
        locale: Locale.nn_NO
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
        replacement: () => 'Nav Arbeid og ytelser '
    },
    {
        type: 'internal',
        regex: /^nfp$/i,
        replacement: () => 'Nav Familie- og pensjonsytelser '
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
    },
    {
        type: 'internal',
        regex: /^aev$/i,
        replacement: () => 'arbeidsevnevurdering '
    },
    {
        type: 'internal',
        regex: /^uft$/i,
        replacement: () => 'uføretrygd '
    }
];
