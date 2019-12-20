import * as React from 'react';
import { useErKontaktsenter } from '../../../utils/enheterUtils';
import Nisselue from './Nisselue';
import { mockEnabled } from '../../../api/config';

function DecoratorEasterEgg() {
    const erKontaktsenter = useErKontaktsenter();
    if (!mockEnabled && !erKontaktsenter) {
        return null;
    }

    return (
        <>
            <Nisselue />
        </>
    );
}

export default DecoratorEasterEgg;
