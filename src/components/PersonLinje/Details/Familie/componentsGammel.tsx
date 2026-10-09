import { Alert, BodyShort, Detail } from '@navikt/ds-react';
import { FamilierelasjonIkon } from 'src/components/PersonLinje/Details/Familie/utils';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import BostedForRelasjon from '../../common/BostedForRelasjon';
import Diskresjonskode from '../../common/DiskresjonsKode';
import { hentAlderEllerDod, hentNavn } from '../../utils';
import { InfoElement } from '../components';

type ForelderBarnRelasjon = PersonData['forelderBarnRelasjon'][0];

export function ForelderBarnRelasjonVisningGammel({
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
