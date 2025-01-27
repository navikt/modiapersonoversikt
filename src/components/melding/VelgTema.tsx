import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button, Label, VStack } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { Temagruppe, temagruppeTekst } from 'src/models/temagrupper';

interface VelgTemaProps {
    valgtTema?: Temagruppe;
    setValgtTema: (temagruppe: Temagruppe) => void;
    error?: ReactNode;
}

export default function VelgTema({ valgtTema, setValgtTema, error }: VelgTemaProps) {
    const dropdownTitle = valgtTema ? temagruppeTekst(valgtTema) : 'Velg temagruppe';

    const temagruppeActionMenuItems = Object.values(Temagruppe).map((temagruppe) => (
        <ActionMenu.Item key={temagruppe} onClick={() => setValgtTema(temagruppe)}>
            {temagruppeTekst(temagruppe)}
        </ActionMenu.Item>
    ));

    return (
        <VStack gap="1">
            <Label>Temagruppe</Label>
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button
                        icon={<ChevronDownIcon aria-hidden />}
                        iconPosition="right"
                        variant="secondary"
                        size="small"
                    >
                        {dropdownTitle}
                    </Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Group label="Temaer">{temagruppeActionMenuItems}</ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
            {error}
        </VStack>
    );
}
