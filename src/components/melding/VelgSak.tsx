import { useState } from 'react';
import {
    Result,
    SakKategori
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import journalsakResource from 'src/rest/resources/journalsakResource';
import { Alert, Button, Heading, HStack, Modal, Radio, RadioGroup, Table, VStack } from '@navikt/ds-react';
import { UseQueryResult } from '@tanstack/react-query';
import { FetchError } from 'src/api/api';
import Spinner from 'nav-frontend-spinner';
import {
    fjernSakerSomAlleredeErTilknyttet,
    fordelSaker
} from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import TemaTable from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/TemaTabell';
import { PlusIcon } from '@navikt/aksel-icons';

export default function VelgSak() {
    const [sakKategori, setSakKategori] = useState<SakKategori>(SakKategori.FAG);
    const [velgSakModalOpen, setVelgSakModalOpen] = useState(false);
    const journalsakerResult = journalsakResource.useFetch();

    return <VStack gap="1">
        <Heading size="xsmall">Knytt dialogen til en sak</Heading>
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
                        <Saker result={journalsakerResult} sakKategori={sakKategori} />
                    </Table.Body>
                </Table>
            </Modal.Body>
        </Modal>
    </VStack>;
}

interface SakerProps {
    result: UseQueryResult<Result, FetchError>;
    sakKategori: SakKategori;
}
function Saker({ result, sakKategori }: SakerProps) {
    if (result.isPending) {
        return <Spinner type="XL" />;
    }
    if (result.isError) {
        return <Alert variant="error">Feil ved henting av journalsaker</Alert>;
    }
    const { saker, feiledeSystemer } = result.data;

    const feiledeSystemerAlerts = feiledeSystemer.map((feiledeSystem) => (
        <Alert variant="warning" key={feiledeSystem}>
            {feiledeSystem}
        </Alert>
    ));
    const filtrerteSaker = fjernSakerSomAlleredeErTilknyttet(saker, []);
    const fordelteSaker = fordelSaker(filtrerteSaker);
    const temaTable = fordelteSaker[sakKategori].map((tema) => (
        <TemaTable velgSak={(sak) => console.log(sak)} key={tema.tema} tema={tema.tema} saker={tema.saker} />
    ));
    return (
        <>
            {feiledeSystemerAlerts}
            {temaTable}
        </>
    );

}
