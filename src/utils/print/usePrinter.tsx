import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { loggEvent } from '../logger/frontendLogger';
import { PrinterMedHeader } from './PrinterMedHeader';

const SkulAppVedPrint = createGlobalStyle`
    @media print {
        #root {
            display: none;
        }
    }
`;

export interface Printer {
    printerWrapper: (props: { children: ReactNode }) => JSX.Element;
    triggerPrint: () => void;
}

function usePrinter(): Printer {
    const [print, setPrint] = useState(false);

    const triggerPrint = () => {
        setPrint(true);
        loggEvent('Print', 'Printer');
    };

    useEffect(() => {
        if (print) {
            const title = document.title;
            document.title = 'Utskrift';
            setTimeout(() => {
                window.print();
                document.title = title;
                setPrint(false);
            }, 0);
        }
    }, [print, setPrint]);

    const printerWrapper = useCallback(
        (props: { children: ReactNode }) => {
            return (
                <>
                    {props.children}
                    {print && <SkulAppVedPrint />}
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
