import { Chat2Icon, GlassesIcon, PencilIcon } from '@navikt/aksel-icons';
import { HelpText, ReadMore, Table } from '@navikt/ds-react';
import { Feilmelding, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import Fullmaktlogo from '../../../../../svg/Utropstegn';
import { formaterMobiltelefonnummer } from '../../../../../utils/telefon-utils';
import { harFeilendeSystemer } from '../../harFeilendeSystemer';
import {
    type DigitalKontaktinformasjonTredjepartsperson,
    type Fullmakt as FullmaktInterface,
    Handling,
    InformasjonElement,
    type OmraadeMedHandling
} from '../../PersondataDomain';
import { hentNavn } from '../../visittkort-utils';
import GyldighetsPeriode from '../GyldighetsPeriode';
import VisittkortElement from '../VisittkortElement';
import { VisittkortGruppe } from '../VisittkortStyles';

interface Props {
    feilendeSystemer: Array<InformasjonElement>;
    fullmakter: FullmaktInterface[];
}

const GraTekst = styled.div`
    color: ${theme.color.graaSkrift};
    margin-top: -0.275rem;
    .typo-etikett-liten {
        line-height: 1rem;
    }
`;

function KontaktinformasjonFullmakt(props: { kontaktinformasjon: DigitalKontaktinformasjonTredjepartsperson | null }) {
    if (!props.kontaktinformasjon) {
        return null;
    }

    const erReservert = props.kontaktinformasjon.reservasjon === 'true';
    const mobilnummer = formaterMobiltelefonnummer(
        props.kontaktinformasjon.mobiltelefonnummer ?? 'Fant ikke telefonnummer'
    );

    return (
        <>
            <Normaltekst>Telefon: {erReservert ? 'Reservert' : mobilnummer}</Normaltekst>
            <GraTekst>
                <Undertekst>I Kontakt- og reservasjonsregisteret</Undertekst>
            </GraTekst>
        </>
    );
}
const FullmaktTilgangerTabell = ({ omraader }: { omraader: OmraadeMedHandling<string>[] }) => {
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
                    const les = o.handling.find((h) => h === Handling.LES);
                    const kommuniser = o.handling.find((h) => h === Handling.KOMMUNISER);
                    const skriv = o.handling.find((h) => h === Handling.SKRIV);
                    return (
                        //biome-ignore lint/correctness/useJsxKeyInIterable: biome migration
                        <Table.Row>
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

function Fullmakt(props: { fullmakt: FullmaktInterface; harFeilendeSystem: boolean }) {
    const motpartsPersonNavn = hentNavn(props.fullmakt.motpartsPersonNavn);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    const beskrivelse = props.fullmakt.motpartsRolle === 'FULLMEKTIG' ? 'Fullmektig' : 'Fullmaktsgiver';
    const harFeilendeSystem = props.harFeilendeSystem ? <Feilmelding>Feilet ved uthenting av navn</Feilmelding> : null;

    return (
        <VisittkortElement beskrivelse={beskrivelse}>
            {harFeilendeSystem}
            <Normaltekst>
                {motpartsPersonNavn} {`(${props.fullmakt.motpartsPersonident})`}
            </Normaltekst>
            <KontaktinformasjonFullmakt
                kontaktinformasjon={props.fullmakt.digitalKontaktinformasjonTredjepartsperson}
            />
            <GyldighetsPeriode gyldighetsPeriode={props.fullmakt.gyldighetsPeriode} />
            <ReadMore header="Detaljer">
                <FullmaktTilgangerTabell omraader={props.fullmakt.omrade} />
            </ReadMore>
        </VisittkortElement>
    );
}

function Fullmakter({ feilendeSystemer, fullmakter }: Props) {
    if (fullmakter.isEmpty()) {
        return null;
    }

    return (
        <VisittkortGruppe tittel={'Fullmakter'} ikon={<Fullmaktlogo />}>
            {fullmakter.map((fullmakt, index) => (
                <Fullmakt
                    key={index}
                    fullmakt={fullmakt}
                    harFeilendeSystem={
                        harFeilendeSystemer(feilendeSystemer, InformasjonElement.PDL_TREDJEPARTSPERSONER) ||
                        harFeilendeSystemer(feilendeSystemer, InformasjonElement.FULLMAKT)
                    }
                />
            ))}
        </VisittkortGruppe>
    );
}

export default Fullmakter;
