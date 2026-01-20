import {
    ChildEyesFillIcon,
    FigureCombinationIcon,
    FigureInwardFillIcon,
    FigureOutwardFillIcon,
    PersonCrossFillIcon
} from '@navikt/aksel-icons';
import { Alert, BodyShort, Detail } from '@navikt/ds-react';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import BostedForRelasjon from '../../common/BostedForRelasjon';
import Diskresjonskode from '../../common/DiskresjonsKode';
import { harDiskresjonskode, hentAlderEllerDod, hentNavn } from '../../utils';
import { InfoElement } from '../components';

type ForelderBarnRelasjon = PersonData['forelderBarnRelasjon'][0];

export function ForelderBarnRelasjonVisning({
    harFeilendeSystem,
    relasjon,
    beskrivelse,
    erBarn
}: {
    harFeilendeSystem: boolean;
    relasjon: ForelderBarnRelasjon;
    beskrivelse: string;
    erBarn: boolean;
}) {
    if (harFeilendeSystem) {
        return (
            <InfoElement title={beskrivelse} icon={<FamilierelasjonIkon relasjon={relasjon} erBarn={erBarn} />}>
                <Alert variant="warning">Feilet ved uthenting av informasjon om {relasjon.rolle.toLowerCase()}</Alert>
            </InfoElement>
        );
    }
    const alder = hentAlderEllerDod(relasjon) ? `(${hentAlderEllerDod(relasjon)})` : null;
    const navn = relasjon.navn.firstOrNull();
    return (
        <InfoElement title={beskrivelse} icon={<FamilierelasjonIkon relasjon={relasjon} erBarn={erBarn} />}>
            <Diskresjonskode adressebeskyttelse={relasjon.adressebeskyttelse} />
            <BodyShort size="small">
                {navn && hentNavn(navn)} {alder}
            </BodyShort>
            <Detail>{relasjon.ident ? relasjon.ident : 'Ukjent'}</Detail>
            <Detail textColor="subtle">
                <BostedForRelasjon relasjon={relasjon} />
            </Detail>
        </InfoElement>
    );
}

function FamilierelasjonIkon({ relasjon, erBarn }: { relasjon: ForelderBarnRelasjon; erBarn: boolean }) {
    if (harDiskresjonskode(relasjon.adressebeskyttelse)) {
        return <PersonCrossFillIcon title="Kjønn skult av diskresjonskode" />;
    }
    const kjonn = relasjon.kjonn.firstOrNull();
    if (kjonn?.kode === 'M') {
        return erBarn ? (
            <ChildEyesFillIcon fontSize="1.2rem" color="#66A5F4" />
        ) : (
            <FigureInwardFillIcon fontSize="1.2rem" color="#66A5F4" />
        );
    }
    if (kjonn?.kode === 'K') {
        return erBarn ? (
            <ChildEyesFillIcon fontSize="1.2rem" color="#F25C5C" />
        ) : (
            <FigureOutwardFillIcon fontSize="1.2rem" color="v#F25C5C" />
        );
    }
    return <FigureCombinationIcon />;
}
