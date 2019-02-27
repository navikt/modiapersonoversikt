import * as React from 'react';
import { BegrensetTilgangTyper } from '../../models/person/person';

interface Props {
    begrunnelseType: BegrensetTilgangTyper;
}

function BegrensetTilgangBegrunnelse({ begrunnelseType }: Props) {
    switch (begrunnelseType) {
        case BegrensetTilgangTyper.Kode6:
            return <>Bruker har diskresjonskode 6, du har ikke tilgang til å se informasjon om bruker.</>;
        case BegrensetTilgangTyper.Kode7:
            return <>Bruker har diskresjonskode 7, du har ikke tilgang til å se informasjon om bruker.</>;
        case BegrensetTilgangTyper.EgenAnsatt:
            return <>Bruker er egen ansatt, du har ikke tilgang til å se informasjon om bruker.</>;
        case BegrensetTilgangTyper.Geografi:
            return <>Ikke geografisk tilgang til bruker, du har ikke tilgang til å se informasjon om bruker.</>;
        case BegrensetTilgangTyper.DefaultFraBackEnd:
            return <>Ukjent sikkerhetsbegrensing</>;
        default:
            return <>Feil sikkerhetsbegrensing</>;
    }
}

export default BegrensetTilgangBegrunnelse;
