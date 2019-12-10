import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PrinterMedHeader } from './PrinterMedHeader';

interface Returns {
    printerWrapper: (props: { children: ReactNode }) => JSX.Element;
    triggerPrint: () => void;
}

export function usePrinter(): Returns {
    const [print, setPrint] = useState(false);

    const triggerPrint = () => {
        setPrint(true);
    };

    useEffect(() => {
        if (print) {
            setTimeout(() => {
                window.print();
                setPrint(false);
            }, 0);
        }
    }, [print, setPrint]);
    const printerWrapper = (props: { children: ReactNode }) => {
        return (
            <>
                {props.children}
                {print && createPortal(<PrinterMedHeader children={props.children} />, document.body)}
            </>
        );
    };

    return {
        printerWrapper: printerWrapper,
        triggerPrint: triggerPrint
    };
}

export default usePrinter;
