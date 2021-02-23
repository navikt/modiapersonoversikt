type VergemaalMapper = { [key: string]: string };

export const vergesakstypeMapper: VergemaalMapper = {
    ensligMindreaarigAsylsoeker: 'Enslig mindreårig asylsøker',
    ensligMindreaarigFlyktning: 'Enslig mindreårig flyktning inklusive midlertidige saker for denne gruppen',
    voksen: 'Voksen',
    midlertidigForVoksen: 'Voksen midlertidig',
    mindreaarig: 'Mindreårig',
    midlertidigForMindreaarig: 'Mindreårig midlertidig',
    forvaltningUtenforVergemaal: 'Forvaltning utenfor vergemål',
    stadfestetFremtidsfullmakt: 'Fremtidsfullmakt',
    undefied: 'Ingen vergesakstype oppgitt'
};

export const vergeOmfangMapper: VergemaalMapper = {
    utlendingssakerPersonligeOgOekonomiskeInteresser:
        'Ivareta personens interesser innenfor det personlige og økonomiske området herunder utlendingssaken',
    personligeOgOekonomiskeInteresser: 'Ivareta personens interesser innenfor det personlige og økonomiske området',
    oekonomiskeInteresser: 'Ivareta personens interesser innenfor det økonomiske området',
    personligeInteresser: 'Ivareta personens interesser innenfor det personlige området',
    undefined: 'Ikke oppgitt'
};
