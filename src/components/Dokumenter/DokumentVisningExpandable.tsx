import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Heading, HStack, Tabs } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { capitalize } from 'lodash';
import { dokumentTekst } from 'src/components/Dokumenter/useSortedAndPaginatedDokumenter';
import Dokument from 'src/components/saker/Detail/Dokument';
import { dokumentKanVises } from 'src/components/saker/utils';
import type { Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';
import { trackingEvents } from 'src/utils/analytics';

const DokumentTabInnhold = ({
    value,
    journalpost,
    dokument
}: {
    value: string;
    journalpost: Dokumentmetadata;
    dokument: Dokument;
}) => {
    const kanVises = dokumentKanVises(journalpost, dokument);
    return (
        <Tabs.Panel lazy={true} value={value} className="pt-0">
            <Heading size="xsmall" level="3" className="pt-4 pb-2 font-light">
                {dokumentTekst(dokument, !kanVises)}
            </Heading>
            <Dokument journalPost={journalpost} dokument={dokument} kanVises={kanVises} />
        </Tabs.Panel>
    );
};
const DokumentTab = ({
    index = 0,
    value,
    journalpost,
    dokument
}: {
    value?: string;
    index?: number;
    journalpost: Dokumentmetadata;
    dokument: Dokument;
}) => {
    return (
        <Tabs.Tab
            value={value ?? `${index}-${dokument.dokumentreferanse}`}
            label={
                <HStack wrap={false}>
                    <BodyShort className="whitespace-nowrap">
                        {value ? capitalize(value) : `Vedlegg ${index + 1}`}
                    </BodyShort>
                    <Link
                        to="/new/dokument"
                        target="_blank"
                        data-umami-event={trackingEvents.detaljvisningKlikket}
                        data-umami-event-fane="dokumenter"
                        data-umami-event-tekst="åpnet dokument i ny fane"
                        search={{
                            dokument: dokument.dokumentreferanse,
                            journalpost: journalpost.id
                        }}
                        className="typo-element align-middle pl-2"
                    >
                        <ExternalLinkIcon
                            fontSize="1.2rem"
                            color="var(--ax-text-subtle)"
                            title="Åpne dokument i ny fane"
                        ></ExternalLinkIcon>
                    </Link>
                </HStack>
            }
        />
    );
};

export const DokumentVisningExpandable = ({
    journalpost,
    isOpen
}: {
    journalpost: Dokumentmetadata;
    isOpen: boolean;
}) => {
    if (!isOpen) {
        return null;
    }

    const hovedDokument = journalpost.hoveddokument;

    return (
        <Tabs defaultValue="hoveddokument" className="relative">
            <Tabs.List className="absolute">
                <DokumentTab value="hoveddokument" dokument={hovedDokument} journalpost={journalpost} />
                {journalpost.vedlegg.map((vedlegg, i) => {
                    return (
                        <DokumentTab
                            dokument={vedlegg}
                            index={i}
                            key={`${i} + ${vedlegg.dokumentreferanse}`}
                            journalpost={journalpost}
                        />
                    );
                })}
            </Tabs.List>
            <Box.New className="relative top-14">
                <DokumentTabInnhold value="hoveddokument" journalpost={journalpost} dokument={hovedDokument} />
                {journalpost.vedlegg.map((vedlegg, i) => {
                    return (
                        <DokumentTabInnhold
                            key={`${i}-${vedlegg.dokumentreferanse}`}
                            value={`${i}-${vedlegg.dokumentreferanse}`}
                            journalpost={journalpost}
                            dokument={vedlegg}
                        />
                    );
                })}
            </Box.New>
        </Tabs>
    );
};
