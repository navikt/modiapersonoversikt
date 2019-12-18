import * as React from 'react';
import { useErKontaktsenter } from '../../../utils/enheterUtils';
import Nisselue from './Nisselue';

function DecoratorEasterEgg() {
    const erKontaktsenter = useErKontaktsenter();
    if (!erKontaktsenter) {
        return null;
    }

    return (
        <>
            <Nisselue />
        </>
    );
}

export default DecoratorEasterEgg;
