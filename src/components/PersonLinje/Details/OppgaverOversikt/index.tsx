import {
    BellIcon,
    EnterIcon,
    PencilIcon,
    TabsRemoveIcon,
    TasklistIcon,
    TrashIcon,
    XMarkOctagonIcon
} from '@navikt/aksel-icons';
import { BodyShort, Detail, HStack, LinkCard, Skeleton, Tag, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { atom, useAtomValue } from 'jotai';
import { useMemo } from 'react';
import {
    erFeilsendt,
    erUbesvartHenvendelseFraBruker,
    getFormattertMeldingsDato,
    nyesteMelding,
    traadKanBesvares,
    traadstittel
} from 'src/components/Meldinger/List/utils';
import { oppgavePrioritet, oppgaveTyper } from 'src/components/Meldinger/oppgave-utils';
import { errorPlaceholder, responseErrorMessage } from 'src/components/ytelser/utils';
import type { OppgaveDto, TraadDto } from 'src/generated/modiapersonoversikt-api';
import { useMeldinger, usePersonOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import { svarUnderArbeidAtom } from 'src/lib/state/dialog';
import type { Melding } from 'src/lib/types/modiapersonoversikt-api';
import { Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { datoEllerNull } from 'src/utils/string-utils';
import { SeksjonFeil } from '../components';

/** Maks antall oppgavekort i oversikten. Resten må saksbehandler se i Kommunikasjon. */
const MAKS_ANTALL_OPPGAVER = 3;

function harTidligereFrist(kandidat?: string, gjeldende?: string): boolean {
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

function OppgaveKort({ traad, oppgave, erTildelt }: { traad: TraadDto; oppgave?: OppgaveDto; erTildelt: boolean }) {
    const sisteMelding = nyesteMelding(traad) as Melding;
    const dato = getFormattertMeldingsDato(sisteMelding);
    const tittel = traadstittel(traad);
    const tema = temagruppeTekst(traad.temagruppe as Temagruppe);
    const ubesvart = erUbesvartHenvendelseFraBruker(traad);
    const feilsendt = erFeilsendt(traad);
    const avsluttetDato = traad.avsluttetDato || sisteMelding.avsluttetDato;
    const kanBesvares = traadKanBesvares(traad);
    const sladdet = traad.sattTilSladdingAv || sisteMelding.sendtTilSladding;
    const slettet = sisteMelding.temagruppe === Temagruppe.InnholdSlettet;
    const erUnderArbeid = useAtomValue(
        useMemo(() => atom((get) => get(svarUnderArbeidAtom) === traad.traadId), [traad.traadId])
    );

    const oppgavetype = oppgave ? (oppgaveTyper[oppgave.oppgavetype as keyof typeof oppgaveTyper] ?? null) : null;
    const prioritet = oppgave ? (oppgavePrioritet[oppgave.prioritet as keyof typeof oppgavePrioritet] ?? null) : null;
    const frist = datoEllerNull(oppgave?.fristFerdigstillelse);

    const metaBeskrivelse = [
        oppgavetype && `type ${oppgavetype}`,
        prioritet && `prioritet ${prioritet}`,
        frist && `frist ${frist}`
    ]
        .filter(Boolean)
        .join(', ');
    const ariaLabel = `${tema} (${tittel})${metaBeskrivelse ? `, ${metaBeskrivelse}` : ''} – gå til meldinger`;

    const avsluttet = Boolean(avsluttetDato) && !kanBesvares;
    const harTags = Boolean(ubesvart || erUnderArbeid || feilsendt || slettet || erTildelt || avsluttet || sladdet);

    return (
        <LinkCard size="small" className="rounded-(--ax-radius-8)!">
            <LinkCard.Title as="span" className="min-w-0 truncate">
                <LinkCard.Anchor asChild>
                    <Link to="/new/person/meldinger" search={{ traadId: traad.traadId }} aria-label={ariaLabel}>
                        {tema} ({tittel})
                    </Link>
                </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>
                <VStack gap="space-12" className="min-w-0">
                    <VStack gap="space-4" className="min-w-0">
                        <Detail textColor="subtle">{dato}</Detail>
                        {sisteMelding.fritekst && (
                            <Detail textColor="subtle" truncate>
                                {sisteMelding.fritekst}
                            </Detail>
                        )}
                    </VStack>
                    {(oppgavetype || prioritet || frist) && (
                        <HStack gap="space-12" wrap>
                            <MetaFelt label="Type" verdi={oppgavetype} />
                            <MetaFelt label="Prioritet" verdi={prioritet} />
                            <MetaFelt label="Frist" verdi={frist} />
                        </HStack>
                    )}
                </VStack>
            </LinkCard.Description>
            {harTags && (
                <LinkCard.Footer>
                    {ubesvart && (
                        <Tag data-color="success" size="small" variant="moderate" icon={<BellIcon aria-hidden />}>
                            Ny melding
                        </Tag>
                    )}
                    {erUnderArbeid && (
                        <Tag data-color="info" size="small" variant="moderate" icon={<PencilIcon aria-hidden />}>
                            Under arbeid
                        </Tag>
                    )}
                    {feilsendt && (
                        <Tag
                            data-color="meta-purple"
                            size="small"
                            variant="moderate"
                            icon={<XMarkOctagonIcon aria-hidden />}
                        >
                            Feilsendt
                        </Tag>
                    )}
                    {slettet && (
                        <Tag data-color="danger" size="small" variant="moderate" icon={<TrashIcon aria-hidden />}>
                            Slettet
                        </Tag>
                    )}
                    {erTildelt && (
                        <Tag data-color="meta-lime" size="small" variant="moderate" icon={<TasklistIcon aria-hidden />}>
                            Tildelt meg
                        </Tag>
                    )}
                    {avsluttet && (
                        <Tag data-color="info" size="small" variant="moderate" icon={<EnterIcon aria-hidden />}>
                            Avsluttet
                        </Tag>
                    )}
                    {sladdet && (
                        <Tag
                            data-color="brand-magenta"
                            size="small"
                            variant="moderate"
                            icon={<TabsRemoveIcon aria-hidden />}
                        >
                            Sladding
                        </Tag>
                    )}
                </LinkCard.Footer>
            )}
        </LinkCard>
    );
}

function OppgaverOversikt() {
    const meldingerResponse = useMeldinger();
    const oppgaverResponse = usePersonOppgaver();
    const { data: traader, isLoading: meldingerLoading } = meldingerResponse;
    const { data: oppgaver = [], isLoading: oppgaverLoading } = oppgaverResponse;

    if (meldingerLoading || oppgaverLoading) {
        return (
            <VStack gap="space-8">
                <Skeleton variant="rectangle" height={100} />
                <Skeleton variant="rectangle" height={100} />
            </VStack>
        );
    }

    const feilmeldinger = [
        errorPlaceholder(meldingerResponse, responseErrorMessage('meldinger')),
        errorPlaceholder(oppgaverResponse, responseErrorMessage('oppgaver'))
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
            {synligeTraader.map((traad) => (
                <li key={traad.traadId}>
                    <OppgaveKort
                        traad={traad}
                        oppgave={oppgavePerTraad.get(traad.traadId)}
                        erTildelt={oppgavePerTraad.has(traad.traadId)}
                    />
                </li>
            ))}
        </VStack>
    );
}

export default OppgaverOversikt;
