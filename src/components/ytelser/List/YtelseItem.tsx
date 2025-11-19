import {ChevronRightIcon} from '@navikt/aksel-icons';
import {BodyShort, Button, Heading, HStack, VStack} from '@navikt/ds-react';
import {getRouteApi} from '@tanstack/react-router';
import dayjs from 'dayjs';
import Card from 'src/components/Card';
import {getUnikYtelseKey, getYtelseIdDato, type YtelseVedtak} from 'src/components/ytelser/utils';
import {ForeldrepengerFpSak, ForeldrepengerFpSakYtelse, Pleiepenger} from 'src/generated/modiapersonoversikt-api';
import {YtelseVedtakYtelseType} from 'src/models/ytelse/ytelse-utils';

const routeApi = getRouteApi('/new/person/ytelser');

export const YtelseItem = ({
    ytelse,
    handleClick
}: {
    ytelse: YtelseVedtak;
    handleClick: (id: string, ytelse: YtelseVedtak) => void;
}) => {
    const aktivYtelse = routeApi.useSearch().id;
    const id = getUnikYtelseKey(ytelse);

    const getYtelseTtile = () => {
        switch (ytelse.ytelseType) {
            case YtelseVedtakYtelseType.Foreldrepenger:
                return ytelse.ytelseType;
            case YtelseVedtakYtelseType.Sykepenger:
                return ytelse.ytelseType;
            case YtelseVedtakYtelseType.Pleiepenger:
                return 'Pleiepenger sykt barn';
            case YtelseVedtakYtelseType.Tiltakspenge:
                return ytelse.ytelseType;
            case YtelseVedtakYtelseType.Pensjon:
                return ytelse.ytelseType;
            case YtelseVedtakYtelseType.Arbeidsavklaringspenger:
                return ytelse.ytelseType;
            case YtelseVedtakYtelseType.ForeldrepengerFpSak:
                switch ((ytelse.ytelseData.data as ForeldrepengerFpSak).ytelse ){
                    case ForeldrepengerFpSakYtelse.ENGANGST_NAD:
                        return 'Engangstønad';
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

    return (
        <Card
            padding="2"
            as="li"
            className={`cursor-pointer hover:hover:bg-ax-bg-neutral-moderate-hover group
                ${aktivYtelse === id ? 'bg-ax-bg-neutral-moderate ' : ''}`}
            onClick={() => handleClick(id, ytelse)}
        >
            <HStack justify="space-between" gap="1" wrap={false}>
                <VStack justify="center" gap="1">
                    <Heading size="xsmall" as="h3" level="3">
                        {getYtelseTtile()}
                    </Heading>
                    <HStack gap="2">
                        <BodyShort size="small" weight="semibold">
                            Dato:
                        </BodyShort>
                        <BodyShort size="small">{dayjs(getYtelseIdDato(ytelse)).format('DD.MM.YYYY')}</BodyShort>
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
                <Button
                    variant="tertiary-neutral"
                    size="small"
                    name="Åpne"
                    aria-label="Åpne"
                    icon={<ChevronRightIcon className="translate-x-0 group-hover:translate-x-1 transition-transform" />}
                />
            </HStack>
        </Card>
    );
};
