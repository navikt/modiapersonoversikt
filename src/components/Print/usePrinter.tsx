import { type JSX, type ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import { PrintContainer } from './PrintContainer';

interface Printer {
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
            const root = document.getElementById('root');
            setTimeout(() => {
                window.print();
                document.title = title;
                setPrint(false);
                root?.classList.remove('print-hide');
            }, 0);
        }
    }, [print]);

    const printerWrapper = useCallback(
        (props: { children: ReactNode }) => {
            const root = document.getElementById('root');
            if (print) {
                root?.classList.add('print-hide');
            }

            return (
                <>
                    {props.children}
                    {print && createPortal(<PrintContainer>{props.children}</PrintContainer>, document.body)}
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
