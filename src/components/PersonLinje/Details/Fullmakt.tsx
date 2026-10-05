import { BodyShort, Detail, InlineMessage, ReadMore, VStack } from '@navikt/ds-react';
import { KopierFnrKnapp } from 'src/components/PersonLinje/common/KopierFnrKnapp';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { type PersonData, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { formaterRettighetstemaer } from 'src/utils/fullmakt-utils';
import { formaterMobiltelefonnummer } from 'src/utils/telefon-utils';
import ValidPeriod from '../common/ValidPeriod';
import { harFeilendeSystemer, hentNavn } from '../utils';
import { Group, InfoElement } from './components';

type Fullmektig = PersonData['fullmektige'][number];
type Fullmakt = Fullmektig['fullmakt'];
type DigitalKontaktTredjepart = Fullmektig['digitalKontaktinformasjonTredjepartsperson'];

function KontaktinformasjonFullmakt(props: { kontaktinformasjon?: DigitalKontaktTredjepart }) {
    if (!props.kontaktinformasjon) {
        return null;
    }

    const erReservert = props.kontaktinformasjon.reservasjon === true;
    const mobilnummer = formaterMobiltelefonnummer(
        props.kontaktinformasjon.mobiltelefonnummer ?? 'Fant ikke telefonnummer'
    );

    return (
        <>
            <Detail>Telefon: {erReservert ? 'Reservert' : mobilnummer}</Detail>
            <Detail textColor="subtle">I Kontakt- og reservasjonsregisteret</Detail>
        </>
    );
}
const FullmaktTilganger = ({ fullmakt }: { fullmakt: Fullmakt }) => {
    const leserettigheter = formaterRettighetstemaer(fullmakt.leserettigheter);
    const skriverettigheter = formaterRettighetstemaer(fullmakt.skriverettigheter);
    return (
        <VStack gap="space-8">
            {leserettigheter && <BodyShort size="small">Leserettigheter: {leserettigheter}</BodyShort>}
            {skriverettigheter && <BodyShort size="small">Skriverettigheter: {skriverettigheter}</BodyShort>}
        </VStack>
    );
};

function Fullmakt(props: { fullmektig: Fullmektig; harFeilendeSystem: boolean }) {
    const fullmektigNavn = hentNavn(props.fullmektig.navn);
    const harFeilendeSystem = props.harFeilendeSystem ? (
        <InlineMessage status="warning" size="small">
            Feilet ved uthenting av navn
        </InlineMessage>
    ) : null;

    return (
        <InfoElement title="Fullmektig">
            {harFeilendeSystem}
            <BodyShort size="small">{fullmektigNavn}</BodyShort>
            <KopierFnrKnapp fnr={props.fullmektig.ident} />
            <KontaktinformasjonFullmakt
                kontaktinformasjon={props.fullmektig.digitalKontaktinformasjonTredjepartsperson}
            />
            <ValidPeriod
                from={props.fullmektig.fullmakt.gyldigFraOgMed}
                to={props.fullmektig.fullmakt.gyldigTilOgMed}
            />
            <ReadMore header="Detaljer">
                <FullmaktTilganger fullmakt={props.fullmektig.fullmakt} />
            </ReadMore>
        </InfoElement>
    );
}

function Fullmakter() {
    const { data } = usePersonData();
    const person = data?.person;
    const feilendeSystemer = data?.feilendeSystemer ?? [];
    const fullmektige = person?.fullmektige;

    if (!fullmektige || fullmektige.isEmpty()) {
        return null;
    }

    return (
        <Group title="Fullmakter">
            <InfoElement>
                {fullmektige.map((fullmektig) => (
                    <Fullmakt
                        key={fullmektig.ident}
                        fullmektig={fullmektig}
                        harFeilendeSystem={
                            harFeilendeSystemer(feilendeSystemer, PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER) ||
                            harFeilendeSystemer(feilendeSystemer, PersonDataFeilendeSystemer.REPR_API)
                        }
                    />
                ))}
            </InfoElement>
        </Group>
    );
}

export default Fullmakter;
