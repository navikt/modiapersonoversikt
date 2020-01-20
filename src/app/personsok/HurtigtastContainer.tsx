import * as React from 'react';
import { useEffect, useState } from 'react';
import { loggEvent } from '../../utils/frontendLogger';
import HurtigTasterHjelpModal from '../../components/standalone/HurtigTasterHjelpModal';

function HurtigtaskContainer() {
    const [apen, settApen] = useState(false);
    useEffect(() => {
        const clickHandler = () => {
            settApen(a => {
                return !a;
            });
        };
        const toggle = document.getElementById('hurtigtaster-button');
        if (toggle) {
            toggle.addEventListener('click', clickHandler);
        }
        return () => {
            if (toggle) {
                toggle.removeEventListener('click', clickHandler);
            }
        };
    }, [settApen]);

    useEffect(() => {
        if (apen) {
            loggEvent('Visning', 'hurtigtaster Hjelp');
        }
    }, [apen]);
    console.log(apen);
    return <HurtigTasterHjelpModal apen={apen} lukkModal={() => settApen(false)} />;
}

export default HurtigtaskContainer;
