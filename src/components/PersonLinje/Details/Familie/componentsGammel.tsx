import { Alert, BodyShort, Detail } from '@navikt/ds-react';
import { FamilierelasjonIkon } from 'src/components/PersonLinje/Details/Familie/utils';
import Personopplysninger from 'src/components/PersonLinje/Personopplysninger';
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
    const alder = hentAlderEllerDod(relasjon) ? `(${hentAlderEllerDod(relasjon)})` : null;
    const navn = relasjon.navn.firstOrNull();
    return (
        <InfoElement
            title={relasjon.skjulingsaarsak && erBarn ? 'Barn' : beskrivelse}
            icon={relasjon.skjulingsaarsak ? undefined : <FamilierelasjonIkon relasjon={relasjon} erBarn={erBarn} />}
        >
            <Personopplysninger skjulingsaarsak={relasjon.skjulingsaarsak} tilgangsavslag={relasjon.tilgangsavslag}>
                {harFeilendeSystem && !navn && !relasjon.ident && !alder ? (
                    <Alert variant="warning">
                        Feilet ved uthenting av informasjon om {relasjon.rolle.toLowerCase()}
                    </Alert>
                ) : (
                    <>
                        <Diskresjonskode adressebeskyttelse={relasjon.adressebeskyttelse} />
                        <BodyShort size="small">
                            {navn && hentNavn(navn)} {alder}
                        </BodyShort>
                        <Detail>{relasjon.ident ? relasjon.ident : 'Ukjent'}</Detail>
                        <Detail textColor="subtle">
                            <BostedForRelasjon relasjon={relasjon} />
                        </Detail>
                    </>
                )}
            </Personopplysninger>
        </InfoElement>
    );
}
