import * as React from 'react';
import { ReactNode, useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

interface Returns {
    printerWrapper: (props: { children: ReactNode }) => JSX.Element;
    print: () => void;
}

const PrintModal = styled(ReactModal)`
    @media print {
        height: 100%;
    }
    overflow-y: auto;
    max-height: 100vh;
`;

export function usePrinter(): Returns {
    const [apen, setApen] = useState(false);

    const print = () => {
        setApen(true);
        setTimeout(() => {
            window.print();
        }, 100);
        setTimeout(() => setApen(false), 1000);
    };

    const printerWrapper = (props: { children: ReactNode }) => {
        return apen ? <PrintModal isOpen={apen}>{props.children} </PrintModal> : <>{props.children}</>;
    };

    return {
        printerWrapper: printerWrapper,
        print: print
    };
}
export default usePrinter;
