export interface Innkrevingskrav {
    kravgrunnlag: Kravgrunnlag;
    krav: Krav[];
}

export interface Kravgrunnlag {
    datoNaarKravVarBesluttetHosOppdragsgiver?: string;
}

export interface Krav {
    kravType: string;
    opprinneligBeløp: number;
    gjenståendeBeløp: number;
}
