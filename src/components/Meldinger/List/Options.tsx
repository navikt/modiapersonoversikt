import { FilterIcon, PrinterSmallIcon, SignLanguageTwoHandsIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';

export const TraadListOptions = () => {
    return (
        <HStack gap="2">
            <Button size="xsmall" variant="secondary-neutral" icon={<SignLanguageTwoHandsIcon />} />
            <Button size="xsmall" variant="secondary-neutral" icon={<PrinterSmallIcon />} />
            <Button size="xsmall" variant="secondary-neutral" icon={<FilterIcon />} />
        </HStack>
    );
};
