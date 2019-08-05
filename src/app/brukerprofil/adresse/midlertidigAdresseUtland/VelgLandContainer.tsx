import * as React from 'react';
import { Kodeverk, KodeverkResponse } from '../../../../models/kodeverk';
import { VelgLand } from './VelgLand';
import { MidlertidigAdresseUtlandInputs } from './MidlertidigAdresseUtland';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';

interface Props {
    midlertidigAdresseUtlandInput: MidlertidigAdresseUtlandInputs;
    landChanged: (input: Kodeverk) => void;
}

function VelgLandContainer(props: Props) {
    return (
        <RestResourceConsumer<KodeverkResponse> getResource={restResources => restResources.land}>
            {land => (
                <VelgLand
                    visFeilmeldinger={false}
                    landKodeverk={land}
                    midlertidigAdresseUtlandInputs={props.midlertidigAdresseUtlandInput}
                    onChange={props.landChanged}
                />
            )}
        </RestResourceConsumer>
    );
}

export default VelgLandContainer;
