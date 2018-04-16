export interface Kontaktinformasjon {
    epost?: KontaktinformasjonVerdi;
    mobiltelefon?: KontaktinformasjonVerdi;
    reservert?: string;
}

export interface KontaktinformasjonVerdi {
    sistOppdatert: string;
    value: string;
}