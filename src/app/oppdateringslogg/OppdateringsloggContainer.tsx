import { Button, HStack, Modal } from '@navikt/ds-react';
import type * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import useListener from '../../utils/hooks/use-listener';
import useWaitForElement from '../../utils/hooks/use-wait-for-element';
import { lagOppdateringsloggConfig } from './config/config';
import Oppdateringslogg from './Oppdateringslogg';
import useSisteLestOppdateringLogg from './useSisteLestOppdateringLogg';

export const DecoratorButtonId = 'oppdateringslogg';
export interface OppdateringsloggInnslag {
    id: number;
    tittel: string;
    dato: Date;
    aktiv: boolean;
    ingress: React.ReactNode;
    beskrivelse: React.ReactNode;
    src?: string;
}

function harUleste(sistLesteId: number, oppdateringslogg: OppdateringsloggInnslag[]): boolean {
    return oppdateringslogg.some((innslag) => innslag.id > sistLesteId);
}

function useHoldUlestIndikatorOppdatert(
    element: HTMLElement | null,
    sistLesteId: number,
    oppdateringslogg: OppdateringsloggInnslag[]
) {
    useEffect(() => {
        if (element != null) {
            const ulest = harUleste(sistLesteId, oppdateringslogg);
            element.classList.remove('oppdateringslogg--uleste');
            if (ulest) {
                element.classList.add('oppdateringslogg--uleste');
                element.setAttribute('title', 'Oppdateringslogg (du har en eller flere uleste logginnslag)');
            } else {
                element.setAttribute('title', 'Oppdateringslogg');
            }
        }
    }, [element, sistLesteId, oppdateringslogg]);
}

function OppdateringsloggContainer() {
    const oppdateringslogg: OppdateringsloggInnslag[] = lagOppdateringsloggConfig().filter((innslag) => innslag.aktiv);

    const [apen, settApen] = useState(false);
    const [openKey, settOpenKey] = useState(0);
    const [sistLesteId, settSistLesteId] = useSisteLestOppdateringLogg();
    const element = useWaitForElement(`#${DecoratorButtonId}`);

    const aapne = useCallback(() => {
        const nyesteId = Math.max(-1, ...oppdateringslogg.map((innslag) => innslag.id));
        settSistLesteId(nyesteId);
        settOpenKey((k) => k + 1);
        settApen(true);
    }, [oppdateringslogg, settSistLesteId]);

    useListener(`#${DecoratorButtonId}`, 'click', aapne, document.querySelector('internarbeidsflate-decorator'));
    useHoldUlestIndikatorOppdatert(element, sistLesteId, oppdateringslogg);

    return (
        <Modal
            open={apen}
            onClose={() => settApen(false)}
            className={apen ? 'w-[1400px] max-w-[95vw]' : undefined}
            aria-label="Oppdateringslogg"
        >
            <Modal.Body className="h-[700px] p-0">
                <Oppdateringslogg key={openKey} oppdateringslogg={oppdateringslogg} />
            </Modal.Body>
            <Modal.Footer style={{ padding: 'var(--ax-space-8) var(--ax-space-16)' }}>
                <HStack justify="end" className="w-full">
                    <Button variant="tertiary" onClick={() => settApen(false)}>
                        Lukk
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}

export default OppdateringsloggContainer;
