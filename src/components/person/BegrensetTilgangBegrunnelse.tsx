import { assertUnreachable } from '../../utils/assertUnreachable';
import { IkkeTilgangArsak } from '../../rest/resources/tilgangskontrollResource';

interface Props {
    begrunnelseType: IkkeTilgangArsak;
}

function BegrensetTilgangBegrunnelse(props: Props) {
    switch (props.begrunnelseType) {
        case IkkeTilgangArsak.Kode6:
            return <>Bruker har diskresjonskode 6, du har ikke tilgang til å se informasjon om bruker.</>;
        case IkkeTilgangArsak.Kode7:
            return <>Bruker har diskresjonskode 7, du har ikke tilgang til å se informasjon om bruker.</>;
        case IkkeTilgangArsak.EgenAnsatt:
            return <>Bruker er egen ansatt, du har ikke tilgang til å se informasjon om bruker.</>;
        case IkkeTilgangArsak.Geografi:
            return <>Ikke geografisk tilgang til bruker, du har ikke tilgang til å se informasjon om bruker.</>;
        case IkkeTilgangArsak.AdRoller:
            return <>Ikke tilgang til modiapersonoversikt.</>;
        case IkkeTilgangArsak.Ukjent:
            return <>Ukjent sikkerhetsbegrensing</>;
        default:
            assertUnreachable(props.begrunnelseType);
            return <>Feil sikkerhetsbegrensing</>;
    }
}

export default BegrensetTilgangBegrunnelse;
