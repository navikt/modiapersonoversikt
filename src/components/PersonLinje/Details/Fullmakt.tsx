import { Chat2Icon, GlassesIcon, PencilIcon } from '@navikt/aksel-icons';
import { Alert, Detail, HelpText, ReadMore, Table } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import {
    type OmraadeMedHandling,
    type PersonData,
    PersonDataFeilendeSystemer
} from 'src/lib/types/modiapersonoversikt-api';
import { formaterMobiltelefonnummer } from 'src/utils/telefon-utils';
import ValidPeriod from '../common/ValidPeriod';
import { harFeilendeSystemer, hentNavn } from '../utils';
import { Group, InfoElement } from './components';

type Fullmakt = PersonData['fullmakt'][number];
type DigitalKontaktTredjepart = PersonData['fullmakt'][0]['digitalKontaktinformasjonTredjepartsperson'];

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
const FullmaktTilgangerTabell = ({ omraader }: { omraader: OmraadeMedHandling[] }) => {
    if (omraader.map((omrade) => omrade.omraade.kode).includes('*')) {
        return 'Gjelder alle statlige ytelser';
    }

    return (
        <Table size="small">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Område</Table.HeaderCell>
                    <Table.HeaderCell scope="col">
                        <HelpText title="Hva betyr lese/innsyn?">
                            Fullmektig kan lese dokumenter på de områdene det er gitt fullmakt til
                        </HelpText>
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col">
                        <HelpText title="Hva betyr snakke/kommunisere?">
                            Fullmektig kan snakke med NAV og hjelpe til i kontakten med NAV, både på telefon, nav.no og
                            NAV-kontor. Tilgangen innebærer at fullmektig også kan lese dokumenter i sakene
                        </HelpText>
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col">
                        <HelpText title="Hva betyr Søke/klage?">
                            Fullmektig kan søke og klage. Tilgangen innebærer at fullmektig også kan lese dokumenter og
                            snakke med NAV
                        </HelpText>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {omraader.map((o) => {
                    const les = o.handling.find((h) => h === 'LES');
                    const kommuniser = o.handling.find((h) => h === 'KOMMUNISER');
                    const skriv = o.handling.find((h) => h === 'SKRIV');
                    return (
                        <Table.Row key={o.omraade.kode}>
                            <Table.DataCell>{o.omraade.beskrivelse}</Table.DataCell>
                            <Table.DataCell>{les && <GlassesIcon title="Lese/innsyn" />}</Table.DataCell>
                            <Table.DataCell>{kommuniser && <Chat2Icon title="Snakke/kommunisere" />}</Table.DataCell>
                            <Table.DataCell>{skriv && <PencilIcon title="Søke/klage" />}</Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

function Fullmakt(props: { fullmakt: Fullmakt; harFeilendeSystem: boolean }) {
    const motpartsPersonNavn = hentNavn(props.fullmakt.motpartsPersonNavn);
    const beskrivelse = props.fullmakt.motpartsRolle === 'FULLMEKTIG' ? 'Fullmektig' : 'Fullmaktsgiver';
    const harFeilendeSystem = props.harFeilendeSystem ? (
        <Alert variant="warning">Feilet ved uthenting av navn</Alert>
    ) : null;

    return (
        <InfoElement title={beskrivelse}>
            {harFeilendeSystem}
            <Detail>
                {motpartsPersonNavn} {`(${props.fullmakt.motpartsPersonident})`}
            </Detail>
            <KontaktinformasjonFullmakt
                kontaktinformasjon={props.fullmakt.digitalKontaktinformasjonTredjepartsperson}
            />
            <ValidPeriod
                from={props.fullmakt.gyldighetsPeriode?.gyldigFraOgMed}
                to={props.fullmakt.gyldighetsPeriode?.gyldigTilOgMed}
            />
            <ReadMore header="Detaljer">
                <FullmaktTilgangerTabell omraader={props.fullmakt.omrade} />
            </ReadMore>
        </InfoElement>
    );
}

function Fullmakter() {
    const {
        data: { person, feilendeSystemer }
    } = usePersonData();
    const fullmakter = person.fullmakt;

    if (fullmakter.isEmpty()) {
        return null;
    }

    return (
        <Group title="Fullmakter">
            <InfoElement>
                {fullmakter.map((fullmakt) => (
                    <Fullmakt
                        key={fullmakt.motpartsPersonident}
                        fullmakt={fullmakt}
                        harFeilendeSystem={
                            harFeilendeSystemer(feilendeSystemer, PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER) ||
                            harFeilendeSystemer(feilendeSystemer, PersonDataFeilendeSystemer.FULLMAKT)
                        }
                    />
                ))}
            </InfoElement>
        </Group>
    );
}

export default Fullmakter;
