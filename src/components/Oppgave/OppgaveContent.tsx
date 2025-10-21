import { BodyShort, HGrid, HStack, Textarea, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { AvsluttOppgave } from 'src/components/Meldinger/Detail/TraadOppgaver';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';
import { datoEllerNull } from 'src/utils/string-utils';

export const OppgaveContent = ({ oppgave }: { oppgave: OppgaveDto }) => {
    const { data: gsakTema } = useGsakTema();
    const tema = gsakTema.find((item) => item.kode === oppgave.tema);
    const oppgaveTyper = tema?.oppgavetyper ?? [];
    const oppgavetype = oppgaveTyper.find((o) => o.kode === oppgave.oppgavetype);
    const prioritering = tema?.prioriteter.find((o) => o.kode === oppgave.prioritet);

    return (
        <Card padding="4">
            <HGrid gap="4" columns={{ sm: 2, md: 3 }} className="mt-4">
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Oppgave Id:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.oppgaveId}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Tema:
                    </BodyShort>
                    <BodyShort size="small">{tema?.tekst ?? 'Ukjent tema'}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        TildeltEnhetsnr:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.tildeltEnhetsnr}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Oppgavetype:
                    </BodyShort>
                    <BodyShort size="small">{oppgavetype?.tekst ?? 'Ukjent oppgavetype'}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Status:
                    </BodyShort>
                    <BodyShort size="small">{oppgave?.status}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Prioritering:
                    </BodyShort>
                    <BodyShort size="small">{prioritering?.tekst ?? ''}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Aktivdato:
                    </BodyShort>
                    <BodyShort size="small">{datoEllerNull(oppgave?.aktivDato)}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Forfallsdato:
                    </BodyShort>
                    <BodyShort size="small">{datoEllerNull(oppgave?.fristFerdigstillelse)}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Saksreferanse:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.saksreferanse}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Er STO oppgave:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.erSTOOppgave ? 'Ja' : 'Nei'}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Opprettet av enhet:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.opprettetAvEnhetsnr}</BodyShort>
                </VStack>
                <VStack justify="space-between">
                    <BodyShort size="small" weight="semibold">
                        Opprettet:
                    </BodyShort>
                    <BodyShort size="small">{datoEllerNull(oppgave?.opprettetTidspunkt)}</BodyShort>
                </VStack>
            </HGrid>
            <VStack justify="space-between" className="mt-6">
                <Textarea value={oppgave?.beskrivelse} label="Beskrivelse" minRows={10} resize readOnly />
            </VStack>
            <HStack className="mt-6">
                <AvsluttOppgave oppgave={oppgave} />
            </HStack>
        </Card>
    );
};
