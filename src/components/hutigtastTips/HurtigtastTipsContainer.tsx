import * as React from 'react';
import { useEffect, useState } from 'react';
import { loggEvent } from '../../utils/frontendLogger';
import HurtigTasterHjelpModal from './HurtigTasterHjelpModal';

function HurtigtastTipsContainer() {
    const [apen, settApen] = useState(false);

    useEffect(() => {
        const clickHandler = () => settApen(a => !a);
        const toggle = document.getElementById('hurtigtaster-button');
        if (toggle) {
            toggle.addEventListener('click', clickHandler);
            return () => toggle.removeEventListener('click', clickHandler);
        }
        return () => null;
    }, [settApen]);

    useEffect(() => {
        if (apen) {
            loggEvent('Visning', 'hurtigtaster Hjelp');
        }
    }, [apen]);

    return <HurtigTasterHjelpModal apen={apen} lukkModal={() => settApen(false)} />;
}

export default HurtigtastTipsContainer;
