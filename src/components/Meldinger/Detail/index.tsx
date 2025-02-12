import { PersonIcon, PrinterSmallIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Chat, HStack, Heading, Skeleton, Tooltip, VStack } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
import Card from 'src/components/Card';
import RichText, { defaultRules, HighlightRule, SladdRule } from 'src/components/RichText';
import { $api } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { type Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { formaterDato } from 'src/utils/string-utils';
import { erMeldingFraNav, traadstittel } from '../List/utils';

const TraadMeta = ({ traad }: { traad: Traad }) => (
    <HStack justify="space-between">
        <VStack>
            <Heading size="small" as="h3" level="3">
                {traadstittel(traad)}
            </Heading>
            <VStack>
                <HStack gap="2">
                    <BodyShort size="small" weight="semibold">
                        Tema:
                    </BodyShort>
                    <BodyShort size="small">{temagruppeTekst(traad.temagruppe as Temagruppe)}</BodyShort>
                </HStack>
                {traad.opprettetDato && (
                    <HStack gap="2">
                        <BodyShort size="small" weight="semibold">
                            Opprettet:
                        </BodyShort>
                        <BodyShort size="small">{formaterDato(traad.opprettetDato)}</BodyShort>
                    </HStack>
                )}
            </VStack>
        </VStack>
        <Box>
            <Tooltip content="Skriv ut denne dialogen">
                <Button icon={<PrinterSmallIcon />} size="small" variant="secondary" />
            </Tooltip>
        </Box>
    </HStack>
);

export const TraadDetail = ({ traadId }: { traadId: string }) => (
    <Suspense fallback={<Skeleton variant="rounded" height="200" />}>
        <TraadDetailContent traadId={traadId} />
    </Suspense>
);

const TraadDetailContent = ({ traadId }: { traadId: string }) => {
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) ?? '';
    const { data: traader } = $api.useSuspenseQuery('post', '/rest/v2/dialog/meldinger', {
        body: { fnr },
        params: { query: { enhet } }
    });

    const traad = traader.find((t) => t.traadId === traadId);

    if (!traad) {
        return <span> fant ikke traaden</span>;
    }

    return (
        <Card as={VStack} padding="2" minHeight="0">
            <VStack minHeight="0" gap="2">
                <TraadMeta traad={traad} />
                <HStack gap="4">
                    <Button variant="secondary-neutral" size="small">
                        Journalfør
                    </Button>
                    <Button variant="secondary-neutral" size="small">
                        Oppgave
                    </Button>
                    <Button variant="secondary-neutral" size="small">
                        Merk
                    </Button>
                </HStack>

                <Box.New
                    minHeight="0"
                    overflowY="scroll"
                    background="sunken"
                    borderColor="neutral-subtle"
                    borderRadius="medium"
                    borderWidth="1"
                    padding="2"
                >
                    <Meldinger meldinger={traad.meldinger} />
                </Box.New>
                <Box.New marginBlock="space-8">
                    <Button>Svar</Button>
                </Box.New>
            </VStack>
        </Card>
    );
};

const Meldinger = ({ meldinger }: { meldinger: Traad['meldinger'] }) => {
    return (
        <VStack gap="10" align="baseline">
            {meldinger.map((m) => {
                const erFraNav = erMeldingFraNav(m.meldingstype);
                return (
                    <Chat
                        key={m.id}
                        size="small"
                        avatar={erFraNav ? 'nav' : <PersonIcon />}
                        name={m.skrevetAvTekst}
                        timestamp={m.opprettetDato}
                        position={erFraNav ? 'right' : 'left'}
                        className={erFraNav ? 'self-end' : undefined}
                        variant={erFraNav ? 'info' : 'neutral'}
                    >
                        <Chat.Bubble className="text-wrap">
                            <RichText rules={[SladdRule, HighlightRule, ...defaultRules]}>{m.fritekst}</RichText>
                        </Chat.Bubble>
                    </Chat>
                );
            })}
        </VStack>
    );
};
