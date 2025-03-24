type UUID = string;

export enum Locale {
    nb_NO = 'nb_NO',
    nn_NO = 'nn_NO',
    en_US = 'en_US',
    se_NO = 'se_NO',
    de_DE = 'de_DE',
    fr_FR = 'fr_FR',
    es_ES = 'es_ES',
    pl_PL = 'pl_PL',
    ru_RU = 'ru_RU',
    ur = 'ur'
}

// @ts-ignore: Will be used
const _localeString: { [key in Locale]: string } = {
    nb_NO: 'Norsk (Bokmål)',
    nn_NO: 'Norsk (Nynorsk)',
    en_US: 'Engelsk',
    se_NO: 'Samisk',
    de_DE: 'Tysk',
    fr_FR: 'Fransk',
    es_ES: 'Spansk',
    pl_PL: 'Polsk',
    ru_RU: 'Russisk',
    ur: 'Urdu'
};

export type Tekst = {
    id: UUID;
    overskrift: string;
    tags: Array<string>;
    innhold: {
        [key in Locale]?: string;
    };
    vekttall: number;
};

export type Tekster = {
    [key: string]: Tekst;
};
