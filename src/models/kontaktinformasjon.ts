// KRR = Kontakt- og reservasjonsregisteret
export interface KRRKontaktinformasjon {
    epost: null | KontaktinformasjonVerdi;
    mobiltelefon: null | KontaktinformasjonVerdi;
    reservasjon: null | string;
}

export interface KontaktinformasjonVerdi {
    sistOppdatert: string;
    value: string;
}
