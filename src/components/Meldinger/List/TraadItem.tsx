import {
    BellIcon,
    ChatElipsisIcon,
    EnterIcon,
    PencilIcon,
    TabsRemoveIcon,
    TasklistIcon,
    TrashIcon,
    XMarkOctagonIcon
} from '@navikt/aksel-icons';
import { Detail, HStack, Label, Link, Tag, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { atom, useAtomValue } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';
import Card from 'src/components/Card';
import { useFilterOppgave } from 'src/components/Oppgave/List/utils';
import type { TraadDto } from 'src/generated/modiapersonoversikt-api';
import { usePersonAtomValue } from 'src/lib/state/context';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import type { Melding } from 'src/lib/types/modiapersonoversikt-api';
import { Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { trackingEvents } from 'src/utils/analytics';
import { twMerge } from 'tailwind-merge';
import {
    erFeilsendt,
    erUbesvartHenvendelseFraBruker,
    getFormattertMeldingsDato,
    nyesteMelding,
    traadstittel
} from './utils';

function TildeltSaksbehandler({ traadId }: { traadId: string }) {
    const { data: oppgaver } = useFilterOppgave();
    const fnr = usePersonAtomValue();
    const tildeltTilBruker = oppgaver.filter((oppg) => oppg.fnr === fnr);

    if (tildeltTilBruker.map((oppgave) => oppgave.traadId).includes(traadId)) {
        return (
            <Tag size="xsmall" variant="success-moderate" icon={<TasklistIcon aria-hidden />}>
                Tildelt meg
            </Tag>
        );
    }

    return null;
}
function UnderArbeid({ traadId }: { traadId: string }) {
    const isUnderArbeid = useAtomValue(useMemo(() => atom((get) => get(dialogUnderArbeidAtom) === traadId), [traadId]));

    if (!isUnderArbeid) return null;
    return (
        <Tag size="xsmall" variant="info-moderate" icon={<PencilIcon aria-hidden />}>
            Under arbeid
        </Tag>
    );
}

function Feilsendt({ traad }: { traad: TraadDto }) {
    if (!erFeilsendt(traad)) return null;
    return (
        <Tag size="xsmall" icon={<XMarkOctagonIcon aria-hidden />} variant="alt1-moderate">
            Feilsendt
        </Tag>
    );
}

function Slettet({ melding }: { melding: Melding }) {
    if (melding.temagruppe !== Temagruppe.InnholdSlettet) return null;
    return (
        <Tag size="xsmall" variant="error-moderate" icon={<TrashIcon aria-hidden />}>
            Slettet
        </Tag>
    );
}

function Antallmeldinger({ traad }: { traad: TraadDto }) {
    return (
        <Tag
            size="xsmall"
            variant="neutral-moderate"
            title="Antall meldinger"
            className="flex shrink-1"
            icon={<ChatElipsisIcon aria-hidden />}
        >
            {traad.meldinger.length}
        </Tag>
    );
}

function UbesvartMelding({ traad }: { traad: TraadDto }) {
    const ubesvart = erUbesvartHenvendelseFraBruker(traad);
    if (!ubesvart) return null;
    return (
        <Tag
            size="xsmall"
            variant="alt2-moderate"
            className="text-nowrap"
            data-color="meta-lime"
            title="Tråd er ubesvart"
            icon={<BellIcon aria-hidden />}
        >
            Ny melding
        </Tag>
    );
}

function AvsluttetMelding({ traad }: { traad: TraadDto }) {
    const avsluttet = !!traad.avsluttetDato;
    if (!avsluttet) return null;
    return (
        <Tag size="xsmall" variant="info-moderate" title="Tråd er avsluttet" icon={<EnterIcon aria-hidden />}>
            Avsluttet
        </Tag>
    );
}

function SendtTilSladding({ traad }: { traad: TraadDto }) {
    if (!traad.sladding) return null;
    return (
        <Tag size="xsmall" variant="neutral-moderate" data-color="brand-magenta" icon={<TabsRemoveIcon aria-hidden />}>
            Sladdet
        </Tag>
    );
}
const routeApi = getRouteApi('/new/person/meldinger');

export const TraadItem = ({ traad }: { traad: TraadDto }) => {
    const sisteMelding = nyesteMelding(traad);
    const datoTekst = getFormattertMeldingsDato(sisteMelding);
    const tittel = traadstittel(traad);
    const aktivTraad = routeApi.useSearch().traadId;
    const navigate = routeApi.useNavigate();
    const linkRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        if (aktivTraad === traad.traadId) {
            linkRef.current?.focus();
        }
    }, [aktivTraad, traad.traadId]);

    const onClick = () => {
        navigate({
            search: { traadId: traad.traadId },
            state: {
                umamiEvent: {
                    name: trackingEvents.detaljvisningKlikket,
                    data: { fane: 'meldinger', tekst: 'åpne melding' }
                }
            }
        });
    };

    return (
        <Link
            ref={linkRef}
            data-testid="traaditem"
            variant="neutral"
            className="hover:no-underline block"
            underline={false}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            tabIndex={0}
            role="link"
            onKeyDown={(e) => {
                if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
                e.preventDefault();
                onClick();
            }}
        >
            <Card
                padding="2"
                className={twMerge(
                    'cursor-pointer hover:bg-[var(--ax-bg-accent-moderate-hover)] group',
                    aktivTraad === traad.traadId &&
                        'bg-ax-bg-accent-moderate-pressed border-ax-bg-accent-moderate-pressed'
                )}
                as="li"
            >
                <VStack>
                    <HStack justify="space-between" gap="1" wrap={false}>
                        <VStack>
                            <Label size="small" as="h3">
                                <Detail className="text-nowrap" visuallyHidden>
                                    Tema:
                                </Detail>
                                {temagruppeTekst(traad.temagruppe as Temagruppe)} ({tittel})
                            </Label>
                            <Detail>{datoTekst}</Detail>
                        </VStack>
                        <HStack gap="1" align="start" justify="end" maxHeight="max-content">
                            <Antallmeldinger traad={traad} />
                            <UbesvartMelding traad={traad} />
                            <UnderArbeid traadId={traad.traadId} />
                            <Feilsendt traad={traad} />
                            <Slettet melding={sisteMelding} />
                            <TildeltSaksbehandler traadId={traad.traadId} />
                            <AvsluttetMelding traad={traad} />
                            <SendtTilSladding traad={traad} />
                        </HStack>
                    </HStack>
                    <Detail truncate>{sisteMelding.fritekst}</Detail>
                </VStack>
            </Card>
        </Link>
    );
};
