import * as React from 'react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PrinterMedHeader } from './PrinterMedHeader';

export interface Printer {
    printerWrapper: (props: { children: ReactNode }) => JSX.Element;
    triggerPrint: () => void;
}

export function usePrinter(): Printer {
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

    const printerWrapper = useCallback(
        (props: { children: ReactNode }) => {
            return (
                <>
                    {props.children}
                    {print && createPortal(<PrinterMedHeader children={props.children} />, document.body)}
                </>
            );
        },
        [print]
    );

    return {
        printerWrapper: printerWrapper,
        triggerPrint: triggerPrint
    };
}

export default usePrinter;
