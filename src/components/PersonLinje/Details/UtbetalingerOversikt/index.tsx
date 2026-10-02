import { CheckmarkCircleIcon, ClockIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Skeleton, Table, Tag, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { formaterNOK, getGjeldendeDatoForUtbetaling, utbetalingDatoComparator } from 'src/components/Utbetaling/utils';
import { errorPlaceholder, responseErrorMessage } from 'src/components/ytelser/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';
import { SeksjonFeil } from '../components';

const MAKS_ANTALL_RADER = 5;

export function utbetalingerForHjem(utbetalinger: Utbetaling[], fra: string, til: string): Utbetaling[] {
    return utbetalinger
        .filter((utbetaling) => {
            const dato = dayjs(utbetaling.posteringsdato);
            return dato.isValid() && !dato.isBefore(fra, 'day') && !dato.isAfter(til, 'day');
        })
        .toSorted(utbetalingDatoComparator);
}

function hentUtbetalingStatus(dato: string | null | undefined): {
    label: string;
    dataColor: 'meta-lime' | 'info';
    icon: ReactNode;
} {
    if (dato && dayjs(dato).isAfter(dayjs())) {
        return { label: 'Kommende', dataColor: 'info', icon: <ClockIcon aria-hidden /> };
    }
    return { label: 'Utbetalt', dataColor: 'meta-lime', icon: <CheckmarkCircleIcon aria-hidden /> };
}

function UtbetalingerOversikt() {
    const iDag = dayjs();
    const startDato = iDag.subtract(30, 'day').format('YYYY-MM-DD');
    // Vi setter sluttDato 30 dager fremover i tid for å få med eventuelle kommende utbetalinger.
    const sluttDato = iDag.add(30, 'day').format('YYYY-MM-DD');
    const utbetalingerResponse = useUtbetalinger(startDato, sluttDato);
    const { data, isLoading } = utbetalingerResponse;

    if (isLoading) {
        return (
            <VStack gap="space-4">
                <Skeleton variant="rectangle" height={40} />
                <Skeleton variant="rectangle" height={40} />
                <Skeleton variant="rectangle" height={40} />
            </VStack>
        );
    }

    const feilmelding = errorPlaceholder(utbetalingerResponse, responseErrorMessage('utbetalinger'));
    if (feilmelding) {
        return <SeksjonFeil feilmeldinger={[feilmelding]} />;
    }

    const alleUtbetalinger = utbetalingerForHjem(data?.utbetalinger ?? [], startDato, sluttDato);
    const alleRader = alleUtbetalinger.flatMap((utbetaling, utbetalingIndex) => {
        const ytelser = utbetaling.ytelser.length
            ? utbetaling.ytelser
            : [{ type: null, nettobelop: utbetaling.nettobelop }];
        return ytelser.map((ytelse, ytelseIndex) => ({
            utbetaling,
            ytelse,
            key: `${utbetalingIndex}-${ytelseIndex}`
        }));
    });
    const rader = alleRader.slice(0, MAKS_ANTALL_RADER);
    const antallFlere = alleRader
        .slice(MAKS_ANTALL_RADER)
        .filter(({ utbetaling }) => !dayjs(utbetaling.posteringsdato).isAfter(iDag, 'day')).length;

    if (rader.length === 0) {
        return (
            <BodyShort size="small" textColor="subtle">
                Ingen kommende utbetalinger eller utførte utbetalinger siste 30 dager
            </BodyShort>
        );
    }

    return (
        <VStack gap="space-8">
            <Box className="overflow-x-auto">
                <Table size="medium" zebraStripes>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">Ytelse</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Beløp</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {rader.map(({ utbetaling, ytelse, key }) => {
                            const dato = getGjeldendeDatoForUtbetaling(utbetaling);
                            const statusInfo = hentUtbetalingStatus(dato);
                            return (
                                <Table.Row key={key}>
                                    <Table.HeaderCell scope="row">
                                        {ytelse.type || 'Mangler beskrivelse'}
                                    </Table.HeaderCell>
                                    <Table.DataCell className="whitespace-nowrap">
                                        {formaterNOK(ytelse.nettobelop)} NOK
                                    </Table.DataCell>
                                    <Table.DataCell className="whitespace-nowrap align-middle">
                                        <Tag
                                            data-color={statusInfo.dataColor}
                                            variant="moderate"
                                            size="small"
                                            icon={statusInfo.icon}
                                        >
                                            {statusInfo.label}
                                        </Tag>
                                    </Table.DataCell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Box>
            {antallFlere > 0 && (
                <BodyShort size="small">
                    <Link
                        className="aksel-link"
                        to="/new/person/utbetaling"
                        search={{ periode: 'siste30' }}
                        onClick={() =>
                            trackGenereltUmamiEvent(trackingEvents.lenkeKlikketFraHjem, {
                                kort: 'utbetalinger',
                                tekst: 'lenke til utbetalinger'
                            })
                        }
                    >
                        Det finnes {antallFlere} flere utbetalinger siste 30 dager
                    </Link>
                </BodyShort>
            )}
        </VStack>
    );
}

export default UtbetalingerOversikt;
