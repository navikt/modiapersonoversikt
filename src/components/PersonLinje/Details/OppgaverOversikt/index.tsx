import {
    BellIcon,
    ChevronRightIcon,
    EnterIcon,
    PencilIcon,
    TabsRemoveIcon,
    TasklistIcon,
    TrashIcon,
    XMarkOctagonIcon
} from '@navikt/aksel-icons';
import { BodyShort, Detail, HStack, Skeleton, Tag, VStack } from '@navikt/ds-react';
import { useNavigate } from '@tanstack/react-router';
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
import type { TraadDto } from 'src/generated/modiapersonoversikt-api';
import { useMeldinger, usePersonOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import { svarUnderArbeidAtom } from 'src/lib/state/dialog';
import type { Melding } from 'src/lib/types/modiapersonoversikt-api';
import { Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import KlikkbartKort from '../KlikkbartKort';

function OppgaveKort({ traad, erTildelt }: { traad: TraadDto; erTildelt: boolean }) {
    const navigate = useNavigate();
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

    return (
        <KlikkbartKort
            padding="space-12"
            borderWidth="1"
            borderColor="neutral-subtle"
            borderRadius="8"
            ariaLabel={`${tema} (${tittel}) – gå til meldinger`}
            onAktiver={() => navigate({ to: '/new/person/meldinger', search: { traadId: traad.traadId } })}
        >
            <HStack justify="space-between" align="center" wrap={false} gap="space-8">
                <VStack gap="space-24" style={{ minWidth: 0 }}>
                    <VStack gap="space-4" style={{ minWidth: 0 }}>
                        <BodyShort size="small" weight="semibold" truncate>
                            {tema} ({tittel})
                        </BodyShort>
                        <Detail textColor="subtle">{dato}</Detail>
                        {sisteMelding.fritekst && (
                            <Detail textColor="subtle" truncate>
                                {sisteMelding.fritekst}
                            </Detail>
                        )}
                    </VStack>
                    <HStack gap="space-4" wrap>
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
                            <Tag
                                data-color="meta-lime"
                                size="small"
                                variant="moderate"
                                icon={<TasklistIcon aria-hidden />}
                            >
                                Tildelt meg
                            </Tag>
                        )}
                        {avsluttetDato && !kanBesvares && (
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
                    </HStack>
                </VStack>
                <ChevronRightIcon fontSize="1.5rem" aria-hidden style={{ flexShrink: 0 }} />
            </HStack>
        </KlikkbartKort>
    );
}

function OppgaverOversikt() {
    const { data: traader, isLoading: meldingerLoading } = useMeldinger();
    const { data: oppgaver = [], isLoading: oppgaverLoading } = usePersonOppgaver();

    if (meldingerLoading || oppgaverLoading) {
        return (
            <VStack gap="space-8">
                <Skeleton variant="rectangle" height={100} />
                <Skeleton variant="rectangle" height={100} />
            </VStack>
        );
    }

    const tildelteMeg = new Set(oppgaver.map((o) => o.traadId));
    const synligeTraader = (traader ?? []).filter((traad) => tildelteMeg.has(traad.traadId)).slice(0, 3);

    if (synligeTraader.length === 0) {
        return (
            <BodyShort size="small" textColor="subtle">
                Ingen tildelte oppgaver
            </BodyShort>
        );
    }

    return (
        <VStack gap="space-8" as="ul" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {synligeTraader.map((traad) => (
                <li key={traad.traadId}>
                    <OppgaveKort traad={traad} erTildelt={tildelteMeg.has(traad.traadId)} />
                </li>
            ))}
        </VStack>
    );
}

export default OppgaverOversikt;
