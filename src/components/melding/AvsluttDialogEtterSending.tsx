import { Checkbox, CheckboxGroup, Label, VStack } from '@navikt/ds-react';
import { MeldingsType } from 'src/components/melding/VelgMeldingsType';

interface AvsluttDialogEtterSendingProps {
    meldingsType: MeldingsType;
    setMeldingsType: (meldingsType: MeldingsType) => void;
}

export default function AvsluttDialogEtterSending({ meldingsType, setMeldingsType }: AvsluttDialogEtterSendingProps) {
    return (
        <VStack gap="1">
            <CheckboxGroup size="small" legend="Avslutt dialog etter sending">
                <Checkbox
                    value={MeldingsType.Infomelding}
                    checked={meldingsType === MeldingsType.Infomelding}
                    onChange={() => setMeldingsType(MeldingsType.Infomelding)}
                    size="small"
                >
                    <Label size="small" className="font-light">
                        Gjør om til infomelding
                    </Label>
                </Checkbox>
            </CheckboxGroup>
        </VStack>
    );
}
