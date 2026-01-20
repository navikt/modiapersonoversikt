import ModalWrapper from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import type * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useListener from '../../utils/hooks/use-listener';
import useWaitForElement from '../../utils/hooks/use-wait-for-element';
import { lagOppdateringsloggConfig } from './config/config';
import Oppdateringslogg from './Oppdateringslogg';
import useSisteLestOppdateringLogg from './useSisteLestOppdateringLogg';
import './oppdateringsloggKnapp.less';

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

const StyledModalWrapper = styled(ModalWrapper)`
    &.modal {
        padding: 0.5rem;
    }
`;

const StyledSystemtittel = styled(Systemtittel)`
    text-align: center;
    margin: 0.75rem 0rem 1rem 1rem;
`;

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
            element?.classList.remove('oppdateringslogg--uleste');
            if (ulest) {
                element?.classList.add('oppdateringslogg--uleste');
            }
        }
    }, [element, sistLesteId, oppdateringslogg]);
}

function useApneOppdateringsLoggModal(
    settApen: (apen: boolean) => void,
    oppdateringslogg: OppdateringsloggInnslag[],
    settSistLesteId: (id: number) => void
) {
    const listener = useCallback(() => {
        const nyesteId: number | undefined = oppdateringslogg.map((innslag) => innslag.id).sort((a, b) => b - a)[0];

        settSistLesteId(nyesteId ?? -1);
        settApen(true);
    }, [settApen, oppdateringslogg, settSistLesteId]);

    useListener(`#${DecoratorButtonId}`, 'click', listener, document.querySelector('dekorator'));
}

function OppdateringsloggContainer() {
    const oppdateringslogg: OppdateringsloggInnslag[] = lagOppdateringsloggConfig().filter((innslag) => innslag.aktiv);

    const [apen, settApen] = useState(false);
    const [sistLesteId, settSistLesteId] = useSisteLestOppdateringLogg();
    const element = useWaitForElement(`#${DecoratorButtonId}`);

    useApneOppdateringsLoggModal(settApen, oppdateringslogg, settSistLesteId);
    useHoldUlestIndikatorOppdatert(element, sistLesteId, oppdateringslogg);

    return (
        <StyledModalWrapper contentLabel="Oppdateringslogg" isOpen={apen} onRequestClose={() => settApen(false)}>
            <StyledSystemtittel>Oppdateringslogg</StyledSystemtittel>
            <Oppdateringslogg oppdateringslogg={oppdateringslogg} />
        </StyledModalWrapper>
    );
}

export default OppdateringsloggContainer;
