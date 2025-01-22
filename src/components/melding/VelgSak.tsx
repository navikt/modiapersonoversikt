import { useState } from 'react';
import {
    JournalforingsSak,
    SakKategori
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import journalsakResource from 'src/rest/resources/journalsakResource';
import { Alert, Button, Heading, HStack, Modal, Radio, RadioGroup, Table, Tag, VStack } from '@navikt/ds-react';
import Spinner from 'nav-frontend-spinner';
import {
    fjernSakerSomAlleredeErTilknyttet,
    fordelSaker
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import TemaTable from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/TemaTabell';
import { PlusIcon } from '@navikt/aksel-icons';
import { formatterDato } from 'src/utils/date-utils';

interface VelgSakProps {
    setSak: (sak: JournalforingsSak) => void,
    valgtSak?: JournalforingsSak;
}

export default function VelgSak({ setSak, valgtSak }: VelgSakProps) {
    const [sakKategori, setSakKategori] = useState<SakKategori>(SakKategori.FAG);
    const [velgSakModalOpen, setVelgSakModalOpen] = useState(false);
    const journalsakerResult = journalsakResource.useFetch();
    const opprettetDatoForSak = valgtSak?.opprettetDato
        ? formatterDato(valgtSak.opprettetDato)
        : '-';

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
        <Heading size="xsmall">Knytt dialogen til en sak</Heading>
        <HStack gap="2">
            <div className="max-w-30">
                <Button
                    variant="secondary"
                    size="small"
                    onClick={() => setVelgSakModalOpen(true)}
                    icon={<PlusIcon aria-hidden />}
                    iconPosition="left"
                >
                    Velg sak
                </Button>
            </div>
            {valgtSak && <Tag
                variant="info">{valgtSak.saksId} | {valgtSak.temaNavn} | {opprettetDatoForSak}</Tag>}
        </HStack>
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
