import * as React from 'react';
import { BegrensetInnsynTyper } from '../../models/person/person';

interface Props {
    begrunnelseType: BegrensetInnsynTyper;
}

function BegrensetInnsynBegrunnelse({begrunnelseType}: Props) {
    switch (begrunnelseType) {
        case BegrensetInnsynTyper.Kode6:
            return <>Bruker har kode 6 adresse</>;
        case BegrensetInnsynTyper.Kode7:
            return <>Bruker har kode 7 adresse</>;
        case BegrensetInnsynTyper.EgenAnsatt:
            return <>Bruker faller inn under begrensning for egen ansatt</>;
        default:
            return <>Ukjent sikkerhetsbegrensing</>;
    }
}

export default BegrensetInnsynBegrunnelse;