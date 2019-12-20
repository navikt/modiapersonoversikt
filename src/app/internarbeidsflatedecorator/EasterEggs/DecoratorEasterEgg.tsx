import * as React from 'react';
import { useErKontaktsenter } from '../../../utils/enheterUtils';
import Nisselue from './nisselue/Nisselue';
import { mockEnabled } from '../../../api/config';
import Partyhatt from './partyhatt/Partyhatt';

function DecoratorEasterEgg() {
    const erKontaktsenter = useErKontaktsenter();
    if (!mockEnabled && !erKontaktsenter) {
        return null;
    }

    return (
        <>
            <Nisselue />
            <Partyhatt />
        </>
    );
}

export default DecoratorEasterEgg;
