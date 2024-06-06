import * as React from 'react';
import { useErKontaktsenter } from '../../../utils/enheter-utils';
import Nisselue from './nisselue/Nisselue';
import Partyhatt from './partyhatt/Partyhatt';
import { easterEggs, useListenForEasterEgg } from './useListenForEasterEgg';
import ErrorBoundary from '../../../components/ErrorBoundary';
import dayjs from 'dayjs';
import PaaskeEgg from './paskeegg/PaaskeEgg';
import { erPaaske } from './paskeegg/erPaaske';
import DelayRender from '../../../components/DelayRender';

function useDefaultEasterEgg() {
    const erKontaktsenter = useErKontaktsenter();
    if (!erKontaktsenter) {
        return;
    }

    const today = dayjs();
    const erJul = today.month() === 11 && 20 <= today.date() && today.date() <= 28;
    const erNyttårsaften = today.month() === 11 && today.date() === 31;

    if (erJul) {
        return easterEggs.nisse;
    }

    if (erNyttårsaften) {
        return easterEggs.party;
    }

    if (erPaaske()) {
        return easterEggs.klukk;
    }

    return;
}

function DecoratorEasterEgg() {
    const defaultEasterEegg = useDefaultEasterEgg();
    const easterEgg = useListenForEasterEgg(defaultEasterEegg);

    if (easterEggs.nisse === easterEgg) {
        return <Nisselue />;
    }
    if (easterEggs.party === easterEgg) {
        return <Partyhatt />;
    }
    if (easterEggs.klukk === easterEgg) {
        return <PaaskeEgg />;
    }

    return null;
}

function DecoratorEasterEggContainer() {
    return (
        <ErrorBoundary boundaryName="EasterEggs">
            <DelayRender delay={1500}>
                <DecoratorEasterEgg />
            </DelayRender>
        </ErrorBoundary>
    );
}

export default DecoratorEasterEggContainer;
