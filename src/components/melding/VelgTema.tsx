import { Select, VStack } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { Temagruppe, temagruppeTekst } from 'src/models/temagrupper';

interface VelgTemaProps {
    valgtTema?: Temagruppe;
    setValgtTema: (temagruppe: Temagruppe) => void;
    error?: ReactNode;
}

export default function VelgTema({ valgtTema, setValgtTema, error }: VelgTemaProps) {
    return (
        <VStack gap="1">
            <Select
                label="Temagruppe"
                hideLabel
                onChange={(e) => {
                    setValgtTema(e.target.value as Temagruppe);
                }}
                value={valgtTema ?? ''}
                size="small"
            >
                <TemagruppeActionMenuItems />
            </Select>
            {error}
        </VStack>
    );
}

function TemagruppeActionMenuItems() {
    const temagruppeActionMenuItems = Object.values(Temagruppe).map((temagruppe) => (
        <option key={temagruppe} value={temagruppe}>
            {temagruppeTekst(temagruppe)}
        </option>
    ));

    temagruppeActionMenuItems.unshift(
        <option key="default" value="" disabled>
            Velg temagruppe
        </option>
    );

    return temagruppeActionMenuItems;
}
