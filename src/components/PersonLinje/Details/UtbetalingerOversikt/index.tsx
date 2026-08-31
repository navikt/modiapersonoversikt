import { CheckmarkCircleIcon, ClockIcon } from '@navikt/aksel-icons';
import { BodyShort, Skeleton, Table, Tag, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import {
    formaterNOK,
    getGjeldendeDatoForUtbetaling,
    getUtbetalingId,
    utbetalingDatoComparator
} from 'src/components/Utbetaling/utils';
import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
import { formatterDato } from 'src/utils/date-utils';

const START_DATO = dayjs().subtract(1, 'year').format('YYYY-MM-DD');
const SLUTT_DATO = dayjs().add(3, 'month').format('YYYY-MM-DD');

function hentUtbetalingStatus(dato: string | null | undefined): {
    label: string;
    dataColor: 'meta-lime' | 'info';
    icon: React.ReactNode;
} {
    if (dato && dayjs(dato).isAfter(dayjs())) {
        return { label: 'Kommende', dataColor: 'info', icon: <ClockIcon aria-hidden /> };
    }
    return { label: 'Utbetalt', dataColor: 'meta-lime', icon: <CheckmarkCircleIcon aria-hidden /> };
}

function UtbetalingerOversikt() {
    const { data, isLoading } = useUtbetalinger(START_DATO, SLUTT_DATO);

    if (isLoading) {
        return (
            <VStack gap="space-4">
                <Skeleton variant="rectangle" height={40} />
                <Skeleton variant="rectangle" height={40} />
                <Skeleton variant="rectangle" height={40} />
            </VStack>
        );
    }

    const utbetalinger = (data?.utbetalinger ?? []).toSorted(utbetalingDatoComparator).slice(0, 5);

    if (utbetalinger.length === 0) {
        return (
            <BodyShort size="small" textColor="subtle">
                Ingen utbetalinger i perioden
            </BodyShort>
        );
    }

    return (
        <Table size="medium" zebraStripes>
            <Table.Body>
                {utbetalinger.map((utbetaling: Utbetaling) => {
                    const dato = getGjeldendeDatoForUtbetaling(utbetaling);
                    const statusInfo = hentUtbetalingStatus(dato);
                    return (
                        <Table.Row key={getUtbetalingId(utbetaling)}>
                            <Table.DataCell style={{ width: '1%', whiteSpace: 'nowrap' }}>
                                {formatterDato(dato)}
                            </Table.DataCell>
                            <Table.DataCell style={{ width: '1%', whiteSpace: 'nowrap' }}>
                                {formaterNOK(utbetaling.nettobelop)} NOK
                            </Table.DataCell>
                            <Table.DataCell style={{ width: '1%', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
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
    );
}

export default UtbetalingerOversikt;
