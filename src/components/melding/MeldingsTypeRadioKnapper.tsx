import { Radio } from '@navikt/ds-react';
import { MeldingsType } from 'src/components/melding/VelgMeldingsType';

function MeldingsTypeRadioKnapper() {
    return Object.entries(MeldingsType).map(([key, value]) => (
        <Radio key={key} value={value}>
            {value}
        </Radio>
    ));
}

export default MeldingsTypeRadioKnapper;
