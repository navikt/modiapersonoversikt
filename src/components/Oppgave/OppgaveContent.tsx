import { ChevronDownIcon, ExternalLinkIcon } from '@navikt/aksel-icons';
import { ActionMenu, BodyShort, Button, HGrid, HStack, Textarea, VStack } from '@navikt/ds-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';
import Card from 'src/components/Card';
import { AvsluttOppgaveModal } from 'src/components/Meldinger/AvsluttOppgave';
import { traadstittel, useTraader } from 'src/components/Meldinger/List/utils';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import { type Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { datoEllerNull } from 'src/utils/string-utils';

export const AvsluttOppgave = ({ oppgave }: { oppgave: OppgaveDto }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const setDialogUnderArbeid = useSetAtom(dialogUnderArbeidAtom);

    const svarSamtale = useCallback(() => {
        setDialogUnderArbeid(oppgave.traadId);
    }, [oppgave.traadId, setDialogUnderArbeid]);

    const svarPaTraad = () => {
        navigate({
            to: '/new/person/meldinger',
            search: { traadId: oppgave.traadId }
        });
        svarSamtale();
    };

    return (
        <>
            {!oppgave.traadId ? (
                <Button size="small" variant="secondary" onClick={() => setOpen(true)}>
                    Avslutt oppgave
                </Button>
            ) : (
                <ActionMenu>
                    <ActionMenu.Trigger>
                        <Button
                            size="small"
                            variant="secondary"
                            icon={<ChevronDownIcon aria-hidden />}
                            iconPosition="right"
                        >
                            Avslutt oppgave
                        </Button>
                    </ActionMenu.Trigger>
                    <ActionMenu.Content>
                        <ActionMenu.Item onClick={() => setOpen(true)}>Avslutt uten svar</ActionMenu.Item>
                        <ActionMenu.Item onClick={svarPaTraad}>Svar på tråd</ActionMenu.Item>
                    </ActionMenu.Content>
                </ActionMenu>
            )}
            <AvsluttOppgaveModal oppgave={oppgave} open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export const OppgaveContent = ({ oppgave }: { oppgave: OppgaveDto }) => {
    const { data: gsakTema } = useGsakTema();
    const tema = gsakTema.find((item) => item.kode === oppgave.tema);
    const oppgaveTyper = tema?.oppgavetyper ?? [];
    const oppgavetype = oppgaveTyper.find((o) => o.kode === oppgave.oppgavetype);
    const prioritering = tema?.prioriteter.find((o) => o.kode === oppgave.prioritet);

    const { data: traader } = useTraader();
    const tilhorendeTraad = traader?.find((m) => m.traadId === oppgave.traadId);

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
                {tilhorendeTraad && (
                    <VStack justify="space-between">
                        <BodyShort size="small" weight="semibold">
                            Tilhørende tråd:
                        </BodyShort>
                        <Link
                            to="/new/person/meldinger"
                            className="aksel-link"
                            search={{ traadId: tilhorendeTraad.traadId }}
                        >
                            <HStack gap="1" align="center">
                                <ExternalLinkIcon aria-hidden fontSize="1rem" />
                                <span>
                                    {traadstittel(tilhorendeTraad)} -
                                    {temagruppeTekst(tilhorendeTraad.temagruppe as Temagruppe)}
                                </span>
                            </HStack>
                        </Link>
                    </VStack>
                )}
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
