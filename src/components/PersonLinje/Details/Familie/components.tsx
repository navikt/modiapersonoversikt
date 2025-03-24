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

function FamilierelasjonIkon({
    relasjon,
    erBarn
}: {
    relasjon: ForelderBarnRelasjon;
    erBarn: boolean;
}) {
    if (harDiskresjonskode(relasjon.adressebeskyttelse)) {
        return <PersonCrossFillIcon title="Kjønn skult av diskresjonskode" />;
    }
    const kjonn = relasjon.kjonn.firstOrNull();
    if (kjonn?.kode === 'M') {
        return erBarn ? (
            <ChildEyesFillIcon className="text-blue-300" />
        ) : (
            <FigureInwardFillIcon className="text-blue-300" />
        );
    }
    if (kjonn?.kode === 'K') {
        return erBarn ? (
            <ChildEyesFillIcon className="text-red-200" />
        ) : (
            <FigureOutwardFillIcon className="text-red-200" />
        );
    }
    return <FigureCombinationIcon />;
}
