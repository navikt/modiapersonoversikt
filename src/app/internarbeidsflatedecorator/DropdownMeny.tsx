import { SparklesIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { useState } from 'react';
import { NyModiaSwitch } from 'src/components/NyModia';
import { LumiFeedback } from './LumiFeedback';

export const DropdownMeny = () => {
    const [showLumi, setShowLumi] = useState(false);

    return (
        <>
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button className="py-[0.5rem]" data-color="neutral" variant="secondary" icon={<SparklesIcon />} />
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Group label="Visningsalternativer">
                        <NyModiaSwitch />
                    </ActionMenu.Group>
                    <ActionMenu.Divider />
                    <ActionMenu.Group label="Veiledning og tilbakemelding">
                        <ActionMenu.Item onSelect={() => setShowLumi(true)}>Gi tilbakemelding</ActionMenu.Item>
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
            {showLumi && <LumiFeedback />}
        </>
    );
};

