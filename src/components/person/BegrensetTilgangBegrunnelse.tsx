import * as React from 'react';
import { BegrensetTilgangTyper } from '../../models/person/person';

interface Props {
    begrunnelseType: BegrensetTilgangTyper;
}

function BegrensetTilgangBegrunnelse({begrunnelseType}: Props) {
    switch (begrunnelseType) {
        case BegrensetTilgangTyper.Kode6:
            return <>Bruker har strengt fortrolig adresse</>;
        case BegrensetTilgangTyper.Kode7:
            return <>Bruker har fortrolig adresse</>;
        case BegrensetTilgangTyper.EgenAnsatt:
            return <>Bruker faller inn under begrensning for egen ansatt</>;
        case BegrensetTilgangTyper.DefaultFraBackEnd:
            return <>Ukjent sikkerhetsbegrensing</>;
        default:
            return <>Feil sikkerhetsbegrensing</>;
    }
}

export default BegrensetTilgangBegrunnelse;