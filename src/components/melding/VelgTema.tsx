import { Select, VStack } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { TemagruppeActionMenuItems } from 'src/components/melding/TemagruppeActionMenuItems';
import type { Temagruppe } from 'src/models/temagrupper';

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
                onChange={(e) => {
                    setValgtTema(e.target.value as Temagruppe);
                }}
                value={valgtTema}
            >
                <TemagruppeActionMenuItems />
            </Select>
            {error}
        </VStack>
    );
}
