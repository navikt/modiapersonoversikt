import { SparklesIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { NyModiaSwitch } from 'src/components/NyModiaSwitch';

export const DropdownMeny = () => (
    <>
        <ActionMenu>
            <ActionMenu.Trigger>
                <Button className="py-[0.5rem]" data-color="neutral" variant="secondary" icon={<SparklesIcon />} />
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                <ActionMenu.Group label="Visningsalternativer">
                    <NyModiaSwitch />
                </ActionMenu.Group>
            </ActionMenu.Content>
        </ActionMenu>
    </>
);
