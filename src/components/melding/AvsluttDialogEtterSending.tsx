import { CheckboxGroup, VStack } from '@navikt/ds-react';
import { Checkbox } from 'nav-frontend-skjema';
import { MeldingsType } from 'src/components/melding/VelgMeldingsType';

interface AvsluttDialogEtterSendingProps {
    meldingsType: MeldingsType;
    setMeldingsType: (meldingsType: MeldingsType) => void;
}

export default function AvsluttDialogEtterSending({ meldingsType, setMeldingsType }: AvsluttDialogEtterSendingProps) {
    return <VStack gap="1">
        <CheckboxGroup legend="Avslutt dialog etter sending">
            <Checkbox
                label="Gjør om til infomelding"
                value={MeldingsType.Infomelding}
                checked={meldingsType === MeldingsType.Infomelding}
                onChange={() => setMeldingsType(MeldingsType.Infomelding)}
            />
        </CheckboxGroup>
    </VStack>;
}