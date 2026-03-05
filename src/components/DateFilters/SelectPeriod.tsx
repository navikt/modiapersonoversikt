import { Select } from '@navikt/ds-react';
import { PeriodType } from 'src/components/DateFilters/types';

export const SelectPeriod = ({
    onPeriodChange,
    selectedPeriod
}: {
    onPeriodChange: (period: string) => void;
    selectedPeriod: PeriodType | '';
}) => {
    return (
        <Select
            label="Periode"
            size="small"
            value={selectedPeriod ?? ''}
            onChange={(e) => onPeriodChange(e.target.value)}
        >
            <option value="">- Velg periode -</option>
            <option key={PeriodType.LAST_30_DAYS} value={PeriodType.LAST_30_DAYS}>
                Siste 30 dager
            </option>
            <option key={PeriodType.THIS_YEAR} value={PeriodType.THIS_YEAR}>
                Inneværende år
            </option>
            <option key={PeriodType.LAST_YEAR} value={PeriodType.LAST_YEAR}>
                I fjor
            </option>
        </Select>
    );
};
