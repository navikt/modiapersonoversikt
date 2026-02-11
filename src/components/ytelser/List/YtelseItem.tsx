import { BodyShort, Detail, HStack, Label, Link, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import Card from 'src/components/Card';
import { getUnikYtelseKey, getYtelseIdDato, type YtelseVedtak } from 'src/components/ytelser/utils';
import {
    type ForeldrepengerFpSak,
    ForeldrepengerFpSakYtelse,
    type Pleiepenger
} from 'src/generated/modiapersonoversikt-api';
import { YtelseVedtakYtelseType } from 'src/models/ytelse/ytelse-utils';
import { trackingEvents } from 'src/utils/analytics';
import { twMerge } from 'tailwind-merge';

const routeApi = getRouteApi('/new/person/ytelser');

export const YtelseItem = ({ ytelse }: { ytelse: YtelseVedtak }) => {
    const aktivYtelse = routeApi.useSearch().id;
    const navigate = routeApi.useNavigate();
    const id = getUnikYtelseKey(ytelse);
    const linkRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        if (aktivYtelse === id) {
            linkRef.current?.focus();
        }
    }, [aktivYtelse, id]);

    const getYtelseTtile = () => {
        switch (ytelse.ytelseType) {
            case YtelseVedtakYtelseType.Foreldrepenger:
                return ytelse.ytelseType;
            case YtelseVedtakYtelseType.Sykepenger:
                return ytelse.ytelseType;
            case YtelseVedtakYtelseType.SykepengerSpokelse:
                return YtelseVedtakYtelseType.Sykepenger;
            case YtelseVedtakYtelseType.Pleiepenger:
                return 'Pleiepenger sykt barn';
            case YtelseVedtakYtelseType.Tiltakspenge:
                return ytelse.ytelseType;
            case YtelseVedtakYtelseType.Pensjon:
                return ytelse.ytelseType;
            case YtelseVedtakYtelseType.Arbeidsavklaringspenger:
                return ytelse.ytelseType;
            case YtelseVedtakYtelseType.ForeldrepengerFpSak:
                switch ((ytelse.ytelseData.data as ForeldrepengerFpSak).ytelse) {
                    case ForeldrepengerFpSakYtelse.ENGANGSST_NAD:
                        return 'Engangsstønad';
                    case ForeldrepengerFpSakYtelse.SVANGERSKAPSPENGER:
                        return 'Svangerskapspenger';
                    default:
                        return 'Foreldrepenger';
                }
            default:
                return `Ukjent ytelse type ${ytelse.ytelseType}`;
        }
    };

    const getBarnetFnr = (pleiepenger: Pleiepenger) => pleiepenger.barnet;

    const onClick = () => {
        navigate({
            search: { id },
            state: {
                umamiEvent: {
                    name: trackingEvents.detaljvisningKlikket,
                    data: { fane: 'ytelser', tekst: ytelse.ytelseType.toLowerCase() }
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
                as="li"
                className={twMerge(
                    'cursor-pointer hover:bg-[var(--ax-bg-accent-moderate-hover)] group',
                    aktivYtelse === id && 'bg-ax-bg-accent-moderate-pressed border-ax-bg-accent-moderate-pressed'
                )}
            >
                <VStack justify="center">
                    <Label size="small" as="h3">
                        {getYtelseTtile()}
                    </Label>
                    <HStack gap="2">
                        <Detail>{dayjs(getYtelseIdDato(ytelse)).format('DD.MM.YYYY')}</Detail>
                    </HStack>
                    {ytelse.ytelseType === YtelseVedtakYtelseType.Pleiepenger && (
                        <HStack gap="2">
                            <BodyShort size="small" weight="semibold">
                                Barnets f.nr:
                            </BodyShort>
                            <BodyShort size="small">{getBarnetFnr(ytelse.ytelseData.data as Pleiepenger)}</BodyShort>
                        </HStack>
                    )}
                </VStack>
            </Card>
        </Link>
    );
};
