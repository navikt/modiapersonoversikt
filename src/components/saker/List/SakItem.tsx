import { CircleSlashIcon, FilesIcon } from '@navikt/aksel-icons';
import { Detail, HStack, Label, Link, Tag, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import Card from 'src/components/Card';
import { getSakId } from 'src/components/saker/utils';
import type { SaksDokumenter } from 'src/generated/modiapersonoversikt-api';
import { trackingEvents } from 'src/utils/analytics';
import { formatterDato } from 'src/utils/date-utils';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/saker');

const AntallDokumenterBadge = ({ sak }: { sak: SaksDokumenter }) => {
    if (!sak.tilhorendeDokumenter.length) return null;
    return (
        <Tag
            title="Antall tilhørene dokumenter"
            variant="neutral-moderate"
            size="xsmall"
            icon={<FilesIcon aria-hidden />}
        >
            {sak.tilhorendeDokumenter.length}
        </Tag>
    );
};

const HarIkkeTilgangBadge = ({ sak }: { sak: SaksDokumenter }) => {
    if (sak.harTilgang) return null;
    return (
        <Tag title="Ikke tilgang til tema" variant="error-moderate" size="xsmall">
            <CircleSlashIcon aria-hidden />
        </Tag>
    );
};

export const SakItem = ({ sak }: { sak: SaksDokumenter }) => {
    const aktivSakId = routeApi.useSearch().id;
    const navigate = routeApi.useNavigate();
    const id = getSakId(sak);
    const linkRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        if (aktivSakId === id) {
            linkRef.current?.focus();
        }
    }, [aktivSakId, id]);

    const onClick = () => {
        navigate({
            search: { id },
            state: {
                umamiEvent: {
                    name: trackingEvents.detaljvisningKlikket,
                    data: { fane: 'saker', tekst: 'åpne sak' }
                }
            }
        });
    };

    return (
        <Link
            ref={linkRef}
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
                    aktivSakId === id && 'bg-ax-bg-accent-moderate-pressed border-ax-bg-accent-moderate-pressed'
                )}
            >
                <HStack justify="space-between" wrap={false} gap="2">
                    <VStack justify="center">
                        <Label as="h3" size="small">
                            {sak.temanavn}
                        </Label>

                        <HStack gap="2">
                            <Detail>SakID:</Detail>
                            <Detail>{sak.fagsaksnummer}</Detail>
                        </HStack>
                        <HStack gap="2">
                            <Detail>Opprettet:</Detail>
                            <Detail>{sak.opprettet ? formatterDato(sak.opprettet) : ''}</Detail>
                        </HStack>
                        <HStack gap="2">
                            <Detail>Status:</Detail>
                            <Detail>{sak.avsluttet ? `Avsluttet(${formatterDato(sak.avsluttet)})` : 'Åpen'}</Detail>
                        </HStack>
                    </VStack>
                    <HStack gap="1" align="start" wrap={false}>
                        <AntallDokumenterBadge sak={sak} />
                        <HarIkkeTilgangBadge sak={sak} />
                    </HStack>
                </HStack>
            </Card>
        </Link>
    );
};
