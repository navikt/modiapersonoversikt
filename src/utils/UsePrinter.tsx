import * as React from 'react';
import PrintKnapp from '../components/PrintKnapp';
import { ReactNode, useState } from 'react';
import ReactModal from 'react-modal';

interface Returns {
    printerWrapper: (props: { children: ReactNode }) => JSX.Element;
    print: () => void;
    printKnapp: ReactNode;
}

export function usePrinter(): Returns {
    const [apen, setApen] = useState(false);

    const print = () => {
        setApen(true);
        setTimeout(() => {
            window.print();
        }, 100);
        setTimeout(() => setApen(false), 1000);
    };
    const printKnapp = <PrintKnapp onClick={print} />;
    const printWrapper = (props: { children: ReactNode }) => {
        return apen ? <ReactModal isOpen={apen}>{props.children} </ReactModal> : <>{props.children}</>;
    };
    return {
        printerWrapper: printWrapper,
        print: print,
        printKnapp: printKnapp
    };
}
export default usePrinter;
