import React, { useCallback, useEffect, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import useListener from '../../utils/hooks/use-listener';
import Oppdateringslogg from './Oppdateringslogg';
import { Innholdstittel } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { OppdateringsloggType } from './EnkeltOppdateringslogg';
import usePersistentState from './usePersistentState';
import useOppdateringslogg from './useOppdateringslogg';
import './oppdateringsloggKnapp.less';
import useWaitForElement from '../../utils/hooks/use-wait-for-element';

export const DecoratorButtonId = 'oppdateringslogg';
export interface EnOppdateringslogg {
    id: number;
    tittel: string;
    dato: Date;
    aktiv: boolean;
    ingress: string;
    beskrivelse: string;
    prioritet: boolean;
    type: OppdateringsloggType;
    src?: string;
}

const StyledModalWrapper = styled(ModalWrapper)`
    display: flex;
    padding: 0rem;
    width: 100%;
    height: 100%;
    max-width: 57rem;
    min-height: 20rem;
    max-height: 40rem;
    justify-content: center;
`;

const StyledInnholdstittel = styled(Innholdstittel)`
    margin-left: 1rem;
    text-align: center;
    margin-bottom: 1rem;
    margin-top: 0.75rem;
`;

function harUleste(sistLesteId: number, oppdateringslogg: EnOppdateringslogg[]): boolean {
    return oppdateringslogg.some(innslag => innslag.id > sistLesteId);
}

function useHoldUlestIndikatorOppdatert(
    element: HTMLElement | null,
    sistLesteId: number,
    oppdateringslogg: EnOppdateringslogg[]
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
    oppdateringslogg: EnOppdateringslogg[],
    settSistLesteId: (id: number) => void
) {
    const listener = useCallback(() => {
        const nyesteId: number | undefined = oppdateringslogg.map(innslag => innslag.id).sort((a, b) => b - a)[0];

        settSistLesteId(nyesteId ?? -1);
        settApen(true);
    }, [settApen, oppdateringslogg, settSistLesteId]);

    useListener(`#${DecoratorButtonId}`, 'click', listener, document.querySelector('dekorator'));
}

function OppdateringsloggContainer() {
    const oppdateringslogg: EnOppdateringslogg[] = useOppdateringslogg().filter(innslag => innslag.aktiv);

    const [apen, settApen] = useState(false);
    const [sistLesteId, settSistLesteId] = usePersistentState('lest-oppdateringslogg', -1);
    const element = useWaitForElement(`#${DecoratorButtonId}`);

    useApneOppdateringsLoggModal(settApen, oppdateringslogg, settSistLesteId);
    useHoldUlestIndikatorOppdatert(element, sistLesteId, oppdateringslogg);

    return (
        <StyledModalWrapper contentLabel="Oppdateringslogg" isOpen={apen} onRequestClose={() => settApen(false)}>
            <StyledInnholdstittel>Oppdateringslogg</StyledInnholdstittel>
            <Oppdateringslogg oppdateringslogg={oppdateringslogg} />
        </StyledModalWrapper>
    );
}

export default OppdateringsloggContainer;
