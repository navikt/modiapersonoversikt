export interface Kontaktinformasjon {
    epost?: KontaktinformasjonVerdi;
    mobiltelefon?: KontaktinformasjonVerdi;
    reservasjon?: boolean;
}

export interface KontaktinformasjonVerdi {
    sistOppdatert: string;
    value: string;
}