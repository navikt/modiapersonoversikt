import { BodyShort, Detail, HStack, LinkCard, Skeleton, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { oppgavePrioritet, oppgaveTyper } from 'src/components/Meldinger/oppgave-utils';
import { errorPlaceholder, responseErrorMessage } from 'src/components/ytelser/utils';
import type { OppgaveDto, TraadDto } from 'src/generated/modiapersonoversikt-api';
import { useGsakTema, useMeldinger, usePersonOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';
import { datoEllerNull } from 'src/utils/string-utils';
import { SeksjonFeil } from '../components';

/** Maks antall oppgavekort i oversikten. Resten må saksbehandler se i Kommunikasjon. */
const MAKS_ANTALL_OPPGAVER = 3;

function harTidligereFrist(kandidat?: string | null, gjeldende?: string | null): boolean {
    if (!kandidat) return false;
    if (!gjeldende) return true;
    return dayjs(kandidat).isBefore(dayjs(gjeldende));
}

function fristComparator(a?: OppgaveDto, b?: OppgaveDto): number {
    if (harTidligereFrist(a?.fristFerdigstillelse, b?.fristFerdigstillelse)) return -1;
    if (harTidligereFrist(b?.fristFerdigstillelse, a?.fristFerdigstillelse)) return 1;
    return 0;
}

function byggOppgavePerTraad(oppgaver: OppgaveDto[]): Map<string, OppgaveDto> {
    const perTraad = new Map<string, OppgaveDto>();
    for (const oppgave of oppgaver) {
        if (!oppgave.traadId) continue;
        const gjeldende = perTraad.get(oppgave.traadId);
        if (!gjeldende || harTidligereFrist(oppgave.fristFerdigstillelse, gjeldende.fristFerdigstillelse)) {
            perTraad.set(oppgave.traadId, oppgave);
        }
    }
    return perTraad;
}

function MetaFelt({ label, verdi }: { label: string; verdi?: string | null }) {
    if (!verdi) return null;
    return (
        <HStack gap="space-4" align="center" wrap={false}>
            <Detail weight="semibold">{label}:</Detail>
            <Detail textColor="subtle">{verdi}</Detail>
        </HStack>
    );
}

function OppgaveKort({ traad, oppgave, tema }: { traad: TraadDto; oppgave: OppgaveDto; tema: string }) {
    const oppgavetype = oppgaveTyper[oppgave.oppgavetype as keyof typeof oppgaveTyper] ?? oppgave.oppgavetype;
    const prioritet = oppgavePrioritet[oppgave.prioritet as keyof typeof oppgavePrioritet] ?? null;
    const frist = datoEllerNull(oppgave.fristFerdigstillelse);

    return (
        <LinkCard size="small" className="bg-ax-bg-meta-purple-soft">
            <LinkCard.Title as="span" className="min-w-0 truncate">
                <LinkCard.Anchor asChild>
                    <Link
                        to="/new/person/meldinger"
                        search={{ traadId: traad.traadId }}
                        onClick={() =>
                            trackGenereltUmamiEvent(trackingEvents.lenkeKlikketFraHjem, {
                                kort: 'oppgaver',
                                tekst: `lenke til meldinger (${tema})`
                            })
                        }
                    >
                        {tema} – {oppgavetype}
                    </Link>
                </LinkCard.Anchor>
            </LinkCard.Title>
            {(prioritet || frist) && (
                <LinkCard.Description>
                    <HStack gap="space-12" wrap>
                        <MetaFelt label="Prioritet" verdi={prioritet} />
                        <MetaFelt label="Frist" verdi={frist} />
                    </HStack>
                </LinkCard.Description>
            )}
        </LinkCard>
    );
}

function OppgaverOversikt() {
    const meldingerResponse = useMeldinger();
    const oppgaverResponse = usePersonOppgaver();
    const temaResponse = useGsakTema();
    const { data: traader, isLoading: meldingerLoading } = meldingerResponse;
    const { data: oppgaver = [], isLoading: oppgaverLoading } = oppgaverResponse;

    if (meldingerLoading || oppgaverLoading || temaResponse.isLoading) {
        return (
            <VStack gap="space-8">
                <Skeleton variant="rectangle" height={100} />
                <Skeleton variant="rectangle" height={100} />
            </VStack>
        );
    }

    const feilmeldinger = [
        errorPlaceholder(meldingerResponse, responseErrorMessage('meldinger')),
        errorPlaceholder(oppgaverResponse, responseErrorMessage('oppgaver')),
        ...temaResponse.errorMessages
    ].filter(Boolean);

    if (feilmeldinger.length > 0) {
        return <SeksjonFeil feilmeldinger={feilmeldinger} />;
    }

    const oppgavePerTraad = byggOppgavePerTraad(oppgaver);
    const synligeTraader = (traader ?? [])
        .filter((traad) => oppgavePerTraad.has(traad.traadId))
        .toSorted((a, b) => fristComparator(oppgavePerTraad.get(a.traadId), oppgavePerTraad.get(b.traadId)))
        .slice(0, MAKS_ANTALL_OPPGAVER);

    if (synligeTraader.length === 0) {
        return (
            <BodyShort size="small" textColor="subtle">
                Du har ingen tildelte oppgaver på bruker
            </BodyShort>
        );
    }

    return (
        <VStack gap="space-8" as="ul" className="list-none p-0 m-0">
            {synligeTraader.map((traad) => {
                const oppgave = oppgavePerTraad.get(traad.traadId);
                return oppgave ? (
                    <li key={traad.traadId}>
                        <OppgaveKort
                            traad={traad}
                            oppgave={oppgave}
                            tema={temaResponse.data.find((item) => item.kode === oppgave.tema)?.tekst ?? 'Ukjent tema'}
                        />
                    </li>
                ) : null;
            })}
        </VStack>
    );
}

export default OppgaverOversikt;
