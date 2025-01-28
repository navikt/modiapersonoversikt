import { PlusIcon } from '@navikt/aksel-icons';
import { Alert, Button, HStack, Label, Modal, Radio, RadioGroup, Table, Tag, VStack } from '@navikt/ds-react';
import Spinner from 'nav-frontend-spinner';
import { type ReactNode, useState } from 'react';
import {
    SakKategori
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import TemaTable from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/TemaTabell';
import {
    fjernSakerSomAlleredeErTilknyttet,
    fordelSaker
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import journalsakResource from 'src/rest/resources/journalsakResource';
import { formatterDatoMedMaanedsnavnOrNull } from 'src/utils/date-utils';

interface VelgSakProps {
    setSak: (sak: JournalforingSak) => void;
    valgtSak?: JournalforingSak;
    error?: ReactNode;
}

export default function VelgSak({ setSak, valgtSak, error }: VelgSakProps) {
    const [sakKategori, setSakKategori] = useState<SakKategori>(SakKategori.FAG);
    const [velgSakModalOpen, setVelgSakModalOpen] = useState(false);
    const journalsakerResult = journalsakResource.useFetch();

    if (journalsakerResult.isPending) {
        return <Spinner type="XL" />;
    }
    if (journalsakerResult.isError) {
        return <Alert variant="error">Feil ved henting av journalsaker</Alert>;
    }
    const { saker, feiledeSystemer } = journalsakerResult.data;

    const feiledeSystemerAlerts = feiledeSystemer.map((feiledeSystem) => (
        <Alert variant="warning" key={feiledeSystem}>
            {feiledeSystem}
        </Alert>
    ));
    const filtrerteSaker = fjernSakerSomAlleredeErTilknyttet(saker, []);
    const fordelteSaker = fordelSaker(filtrerteSaker);
    const temaTable = fordelteSaker[sakKategori].map((tema) => (
        <TemaTable
            velgSak={(sak) => {
                const journalforingSak: JournalforingSak = {
                    fnr: undefined, // TODO: Finnes ikke i typen som brukes i TemaTable
                    saksId: sak.saksId,
                    fagsystemSaksId: sak.fagsystemSaksId ?? undefined,
                    temaKode: sak.temaKode,
                    temaNavn: sak.temaNavn,
                    fagsystemKode: sak.fagsystemKode,
                    fagsystemNavn: sak.fagsystemNavn,
                    sakstype: sak.sakstype ?? undefined,
                    opprettetDato: sak.opprettetDato ?? undefined,
                    finnesIGsak: sak.finnesIGsak,
                    finnesIPsak: sak.finnesIPsak,
                    sakstypeForVisningGenerell: sak.sakstypeForVisningGenerell,
                    saksIdVisning: sak.saksIdVisning
                };
                setSak(journalforingSak);
                setVelgSakModalOpen(false);
            }}
            key={tema.tema}
            tema={tema.tema}
            saker={tema.saker}
        />
    ));

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
                    <Table>
                        <Table.Header>
                            <Table.HeaderCell />
                        </Table.Header>
                        <Table.Body>
                            <>
                                {feiledeSystemerAlerts}
                                {temaTable}
                            </>
                        </Table.Body>
                    </Table>
                </Modal.Body>
            </Modal>
        </VStack>
    );
}
