import * as React from 'react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PrinterMedHeader } from './PrinterMedHeader';
import { erModiabrukerdialog } from './erNyPersonoversikt';
import { createGlobalStyle } from 'styled-components';

const SkulAppVedPrint = createGlobalStyle`
    @media print {
        #root {
            display: none;
        }
    }
`;

interface Printer {
    printerWrapper: (props: { children: ReactNode }) => JSX.Element;
    triggerPrint: () => void;
}

export function usePrinter(): Printer {
    const [print, setPrint] = useState(false);

    const triggerPrint = () => {
        if (erModiabrukerdialog()) {
            alert(
                'Print støttes ikke lenger i Modia brukerdialog, bruk Modia personoversikt - nais https://app.adeo.no/modiapersonoversikt/'
            );
            return;
        }
        setPrint(true);
    };

    useEffect(() => {
        if (print) {
            const title = document.title;
            document.title = `Utskrift`;
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
