// KRR = Kontakt- og reservasjonsregisteret
export interface KRRKontaktinformasjon {
    epost?: KontaktinformasjonVerdi;
    mobiltelefon?: KontaktinformasjonVerdi;
    reservasjon?: string;
}

export interface KontaktinformasjonVerdi {
    sistOppdatert: string;
    value: string;
}