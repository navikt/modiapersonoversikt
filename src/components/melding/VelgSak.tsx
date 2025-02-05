import { PlusIcon } from '@navikt/aksel-icons';
import { Alert, Button, HGrid, HStack, Label, Modal, Radio, RadioGroup, Table, Tag, VStack } from '@navikt/ds-react';
import Spinner from 'nav-frontend-spinner';
import { type ReactNode, useState } from 'react';
import {
    SakKategori
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { formatterDatoMedMaanedsnavnOrNull } from 'src/utils/date-utils';
import { useJournalforingSaker } from 'src/lib/clients/modiapersonoversikt-api';
import { type Group, groupBy } from 'src/utils/groupArray';

interface VelgSakProps {
    setSak: (sak: JournalforingSak) => void;
    valgtSak?: JournalforingSak;
    error?: ReactNode;
}

export default function VelgSak({ setSak, valgtSak, error }: VelgSakProps) {
    const [sakKategori, setSakKategori] = useState<SakKategori>(SakKategori.FAG);
    const [tema, setTema] = useState<Tema | undefined>();
    const [velgSakModalOpen, setVelgSakModalOpen] = useState(false);
    const { data, isPending, isError } = useJournalforingSaker();

    if (isPending) {
        return <Spinner type="XL" />;
    }
    if (isError) {
        return <Alert variant="error">Feil ved henting av journalsaker</Alert>;
    }
    const { saker, feiledeSystemer } = data;

    const feiledeSystemerAlerts = feiledeSystemer.map((feiledeSystem) => (
        <Alert variant="warning" key={feiledeSystem}>
            {feiledeSystem}
        </Alert>
    ));
    const fordelteSaker = fordelSaker(saker);

    return (
        <VStack gap="1">
            <Label htmlFor="knytt-dialog-til-sak">Knytt dialogen til en sak</Label>
            <VStack gap="2">
                <div className="max-w-30">
                    <Button
                        type="button"
                        id="knytt-dialog-til-sak"
                        variant="secondary"
                        size="small"
                        onClick={() => setVelgSakModalOpen(true)}
                        icon={<PlusIcon aria-hidden />}
                        iconPosition="left"
                    >
                        Velg sak
                    </Button>
                </div>
                {valgtSak && (
                    <div className="flex-auto">
                        <Tag variant="neutral" size="small">
                            {valgtSak.saksId} | {valgtSak.temaNavn} |{' '}
                            {formatterDatoMedMaanedsnavnOrNull(valgtSak.opprettetDato)}
                        </Tag>
                    </div>
                )}
                {error}
            </VStack>
            <Modal
                header={{ heading: 'Velg sak' }}
                open={velgSakModalOpen}
                onClose={() => setVelgSakModalOpen(false)}
                closeOnBackdropClick
                width={1200}
            >
                <Modal.Body>
                    <RadioGroup legend="Saktype" value={sakKategori} onChange={setSakKategori}>
                        <HStack gap="2">
                            {Object.values(SakKategori).map((sakKategori) => (
                                <Radio value={sakKategori} key={sakKategori}>
                                    {sakKategori}
                                </Radio>
                            ))}
                        </HStack>
                    </RadioGroup>
                    <HGrid align="start" columns={2} gap="2">
                        <Table zebraStripes size="small">
                            <Table.Header>
                                <Table.HeaderCell scope="col">Tema</Table.HeaderCell>
                            </Table.Header>
                            <Table.Body>
                                {fordelteSaker[sakKategori].map((tema) => (
                                    <Table.Row
                                        key={tema.tema}
                                        onClick={() => {
                                            setTema(tema);
                                        }}
                                    >
                                        <Table.DataCell>{tema.tema}</Table.DataCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        <Table zebraStripes size="small">
                            <Table.Header>
                                <Table.HeaderCell scope="col">SaksId</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Tema</Table.HeaderCell>
                                <Table.HeaderCell scope="col">Opprettet</Table.HeaderCell>
                            </Table.Header>
                            <Table.Body>
                                {fordelteSaker[sakKategori]
                                    .filter((it) => it.tema === tema?.tema)
                                    .flatMap((it) =>
                                        it.saker.map((sak) => (
                                            <Table.Row
                                                key={sak.saksId}
                                                onClick={() => {
                                                    setSak(sak);
                                                    setVelgSakModalOpen(false);
                                                }}
                                            >
                                                <Table.HeaderCell scope="row">{sak.saksId}</Table.HeaderCell>
                                                <Table.DataCell>{sak.temaNavn}</Table.DataCell>
                                                <Table.DataCell>
                                                    {formatterDatoMedMaanedsnavnOrNull(sak.opprettetDato)}
                                                </Table.DataCell>
                                            </Table.Row>
                                        ))
                                    )}
                            </Table.Body>
                        </Table>
                    </HGrid>
                </Modal.Body>
            </Modal>
            {feiledeSystemerAlerts}
        </VStack>
    );
}
export function fordelSaker(saker: JournalforingSak[]): Kategorier {
    const kategoriGruppert = saker.reduce(groupBy(sakKategori), {
        [SakKategori.FAG]: [],
        [SakKategori.GEN]: []
    });

    const temaGruppertefagSaker: Group<JournalforingSak> = kategoriGruppert[SakKategori.FAG]
        .filter((sak): sak is JournalforingSak & { temaNavn: string } => typeof sak.temaNavn === 'string')
        .reduce(
            groupBy((sak) => sak.temaNavn),
            {}
        );
    const temaGrupperteGenerelleSaker: Group<JournalforingSak> = kategoriGruppert[SakKategori.GEN]
        .filter((sak): sak is JournalforingSak & { temaNavn: string } => typeof sak.temaNavn === 'string')
        .reduce(
            groupBy((sak) => sak.temaNavn),
            {}
        );

    const fagSaker = Object.entries(temaGruppertefagSaker)
        .reduce((acc, [tema, saker]) => {
            acc.push({ tema, saker });
            return acc;
        }, [] as Tema[])
        .toSorted((a, b) => a.tema.localeCompare(b.tema));
    const generelleSaker = Object.entries(temaGrupperteGenerelleSaker)
        .reduce((acc, [tema, saker]) => {
            acc.push({ tema, saker });
            return acc;
        }, [] as Tema[])
        .toSorted((a, b) => a.tema.localeCompare(b.tema));

    return {
        [SakKategori.FAG]: fagSaker,
        [SakKategori.GEN]: generelleSaker
    };
}

function sakKategori(sak: JournalforingSak): SakKategori {
    return sak.sakstype === 'GEN' ? SakKategori.GEN : SakKategori.FAG;
}

export type Tema = { tema: string; saker: Array<JournalforingSak> };
export type Kategorier = { [key in SakKategori]: Tema[] };
