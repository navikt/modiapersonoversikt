import { SparklesIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { NyModiaSwitch } from 'src/components/NyModia';

export const DropdownMeny = () => (
    <>
        <ActionMenu>
            <ActionMenu.Trigger>
                <Button className="py-[0.5rem]" data-color="neutral" variant="secondary" icon={<SparklesIcon />} />
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                <ActionMenu.Group label="Bytt versjon">
                    <NyModiaSwitch />
                </ActionMenu.Group>
                <ActionMenu.Divider />
                <ActionMenu.Group label="Veiledning og tilbakemelding">
                    <ActionMenu.Item>Introduksjon</ActionMenu.Item>
                    <ActionMenu.Item>Brukerveiledning</ActionMenu.Item>
                    <ActionMenu.Item>Gi tilbakemelding</ActionMenu.Item>
                </ActionMenu.Group>
            </ActionMenu.Content>
        </ActionMenu>
    </>
);
