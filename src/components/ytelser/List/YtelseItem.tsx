import { Detail, HStack, Label, Link, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import Card from 'src/components/Card';
import { getUnikYtelseKey, getYtelseIdDato, type YtelseVedtak } from 'src/components/ytelser/utils';
import { type ForeldrepengerFpSak, ForeldrepengerFpSakYtelse } from 'src/generated/modiapersonoversikt-api';
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
            case YtelseVedtakYtelseType.Sykepenger:
            case YtelseVedtakYtelseType.Tiltakspenge:
            case YtelseVedtakYtelseType.Pensjon:
            case YtelseVedtakYtelseType.Arbeidsavklaringspenger:
            case YtelseVedtakYtelseType.Dagpenger:
            case YtelseVedtakYtelseType.SykepengerSpokelse:
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
                return `Ukjent ytelsetype ${ytelse.ytelseType}`;
        }
    };

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
            data-color="neutral"
            ref={linkRef}
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
                padding="space-8"
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
                    <HStack gap="space-8">
                        <Detail>{dayjs(getYtelseIdDato(ytelse)).format('DD.MM.YYYY')}</Detail>
                    </HStack>
                </VStack>
            </Card>
        </Link>
    );
};
