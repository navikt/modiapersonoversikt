export interface Kontaktinformasjon {
    epost?: KontaktinformasjonVerdi;
    mobiltelefon?: KontaktinformasjonVerdi;
    reservasjon?: string;
}

export interface KontaktinformasjonVerdi {
    sistOppdatert: string;
    value: string;
}