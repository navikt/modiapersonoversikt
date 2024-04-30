import * as React from 'react';
import { useState } from 'react';
import { useOnMount } from '../utils/customHooks';
import { detect } from 'detect-browser';
import { erIE11 } from '../utils/erIE11';
import { createGlobalStyle } from 'styled-components';
import { pxToRem } from '../styles/personOversiktTheme';

const MacStyling = createGlobalStyle`
        *::-webkit-scrollbar {
            -webkit-appearance: none;
            width: ${pxToRem(7)};
            height: ${pxToRem(7)};
            background-color: #0004;
        }
        *::-webkit-scrollbar-thumb {
            border-radius: ${pxToRem(4)};
            background-color: #0005;
        }
`;

const IE11Styling = createGlobalStyle`
        .alertstripe__tekst {
            flex: auto !important;
        }
`;

function IeMacStyling() {
    const [isMac, setIsMac] = useState<undefined | boolean>(undefined);
    const [isIE, setIsIE] = useState<undefined | boolean>(undefined);

    useOnMount(() => {
        const browser = detect();
        const os = browser && browser.os;
        setIsMac(os ? os.toLowerCase().includes('mac') : undefined);
        setIsIE(erIE11());
    });

    return (
        <>
            {isMac && <MacStyling />}
            {isIE && <IE11Styling />}
        </>
    );
}

export default IeMacStyling;
