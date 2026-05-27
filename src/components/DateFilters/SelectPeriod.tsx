import { Select } from '@navikt/ds-react';
import { PeriodType } from 'src/components/DateFilters/types';

export const SelectPeriod = ({
    onPeriodChange,
    selectedPeriod,
    allowUnset
}: {
    onPeriodChange: (period: string) => void;
    selectedPeriod: PeriodType;
    allowUnset?: boolean;
}) => {
    return (
        <Select label="Periode" size="small" value={selectedPeriod} onChange={(e) => onPeriodChange(e.target.value)}>
            {allowUnset && (
                <option disabled key={PeriodType.UNSET} value={PeriodType.UNSET}>
                    - Velg periode -
                </option>
            )}
            <option key={PeriodType.LAST_30_DAYS} value={PeriodType.LAST_30_DAYS}>
                Siste 30 dager
            </option>
            <option key={PeriodType.THIS_YEAR} value={PeriodType.THIS_YEAR}>
                Inneværende år
            </option>
            <option key={PeriodType.LAST_YEAR} value={PeriodType.LAST_YEAR}>
                I fjor
            </option>
            <option key={PeriodType.CUSTOM} value={PeriodType.CUSTOM}>
                Egendefinert
            </option>
        </Select>
    );
};
