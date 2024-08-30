export interface Innkrevingskrav {
    kravgrunnlag: Kravgrunnlag;
    krav: [Krav];
}

export interface Kravgrunnlag {
    datoNaarKravVarBesluttetHosOppdragsgiver?: string;
}

export interface Krav {
    kravtype: string;
    opprinneligBelop: number;
    gjenstaendeBelop: number;
}
