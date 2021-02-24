type VergemaalMapper = { [key: string]: string };

export const vergesakstypeMapper: VergemaalMapper = {
    ensligMindreaarigAsylsoeker: 'Enslig mindreårig asylsøker',
    ensligMindreaarigFlyktning: 'Enslig mindreårig flyktning inklusive midlertidige saker for denne gruppen',
    voksen: 'Voksen',
    midlertidigForVoksen: 'Voksen midlertidig',
    mindreaarig: 'Mindreårig (unntatt EMF)',
    midlertidigForMindreaarig: 'Mindreårig midlertidig (unntatt EMF)',
    forvaltningUtenforVergemaal: 'Forvaltning utenfor vergemål',
    stadfestetFremtidsfullmakt: 'Fremtidsfullmakt',
    undefined: 'Ingen vergesakstype oppgitt'
};

export const vergeOmfangMapper: VergemaalMapper = {
    utlendingssakerPersonligeOgOekonomiskeInteresser:
        'Ivareta personens interesser innenfor det personlige og økonomiske området herunder utlendingssaken (kun for EMA)',
    personligeOgOekonomiskeInteresser: 'Ivareta personens interesser innenfor det personlige og økonomiske området',
    oekonomiskeInteresser: 'Ivareta personens interesser innenfor det økonomiske området',
    personligeInteresser: 'Ivareta personens interesser innenfor det personlige området',
    undefined: 'Ikke oppgitt'
};
