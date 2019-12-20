import * as React from 'react';
import { useErKontaktsenter } from '../../../utils/enheterUtils';
import Nisselue from './nisselue/Nisselue';
import { mockEnabled } from '../../../api/config';
import Partyhatt from './partyhatt/Partyhatt';
import { easterEggs, useListenForEasterEgg } from './useListenForEasterEgg';
import ErrorBoundary from '../../../components/ErrorBoundary';

function DecoratorEasterEgg() {
    const easterEgg = useListenForEasterEgg();
    const erKontaktsenter = useErKontaktsenter();

    if (!mockEnabled && !erKontaktsenter && !easterEgg) {
        return null;
    }

    return (
        <>
            <Nisselue forceShow={easterEgg === easterEggs.nisse} />
            <Partyhatt forceShow={easterEgg === easterEggs.party} />
        </>
    );
}

function DecoratorEasterEggContainer() {
    return (
        <ErrorBoundary boundaryName="EasterEggs">
            <DecoratorEasterEgg />
        </ErrorBoundary>
    );
}

export default DecoratorEasterEggContainer;
