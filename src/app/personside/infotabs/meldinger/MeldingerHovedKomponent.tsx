import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import TraadListeContainer from './traadliste/TraadListeContainer';

interface VisningProps {
    traader: Traad[];
}

function MeldingerVisning(props: VisningProps) {
    return <TraadListeContainer />;
}

export default MeldingerVisning;
