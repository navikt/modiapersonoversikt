import {
    ChildEyesFillIcon,
    FigureCombinationIcon,
    FigureInwardFillIcon,
    PersonCrossFillIcon
} from '@navikt/aksel-icons';
import { harDiskresjonskode } from 'src/components/PersonLinje/utils';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';

type ForelderBarnRelasjon = PersonData['forelderBarnRelasjon'][0];

export function FamilierelasjonIkon({ relasjon, erBarn }: { relasjon: ForelderBarnRelasjon; erBarn: boolean }) {
    if (harDiskresjonskode(relasjon.adressebeskyttelse)) {
        return <PersonCrossFillIcon title="Kjønn skjult av diskresjonskode" />;
    }

    const kjonn = relasjon.kjonn.firstOrNull();
    const kjonnKode = kjonn?.kode;
    const farge = kjonnKode === 'M' ? '#66A5F4' : kjonnKode === 'K' ? '#F25C5C' : '';

    if (kjonnKode !== 'K' && kjonnKode !== 'M') {
        return <FigureCombinationIcon title="Ukjent kjønn" />;
    }

    return erBarn ? (
        <ChildEyesFillIcon title="Mann" fontSize="1.2rem" color={farge} />
    ) : (
        <FigureInwardFillIcon title="Mann" fontSize="1.2rem" color={farge} />
    );
}
