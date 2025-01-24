import { ReactNode, useState } from 'react';
import {
    JournalforingsSak,
    SakKategori
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import journalsakResource from 'src/rest/resources/journalsakResource';
import { Alert, Button, HStack, Label, Modal, Radio, RadioGroup, Table, Tag, VStack } from '@navikt/ds-react';
import Spinner from 'nav-frontend-spinner';
import {
    fjernSakerSomAlleredeErTilknyttet,
    fordelSaker
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import TemaTable from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/TemaTabell';
import { PlusIcon } from '@navikt/aksel-icons';
import { formatterDatoMedMaanedsnavnOrNull } from 'src/utils/date-utils';

interface VelgSakProps {
    setSak: (sak: JournalforingsSak) => void,
    valgtSak?: JournalforingsSak,
    error?: ReactNode,
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
        <TemaTable velgSak={(sak) => {
            setSak(sak);
            setVelgSakModalOpen(false);
        }} key={tema.tema} tema={tema.tema} saker={tema.saker} />
    ));

    return <VStack gap="1">
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
            {valgtSak &&
                <div className="flex-auto">
                    <Tag variant="neutral" size="small">
                        {valgtSak.saksId} | {valgtSak.temaNavn} | {formatterDatoMedMaanedsnavnOrNull(valgtSak.opprettetDato)}
                    </Tag>
                </div>
            }
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
                            <Radio value={sakKategori} key={sakKategori}>{sakKategori}</Radio>
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
    </VStack>;
}
