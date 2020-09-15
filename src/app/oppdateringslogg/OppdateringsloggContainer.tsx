import React, { useCallback, useEffect, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import useListener from '../../utils/hooks/use-listener';
import Oppdateringslogg from './Oppdateringslogg';
import { Sidetittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { OppdateringsloggType } from './EnkeltOppdateringslogg';
import usePersistentState from './usePersistentState';
import { formatterDatoTidMedMaanedsnavn } from '../../utils/date-utils';
import useOppdateringslogg from './useOppdateringslogg';

export interface EnOppdateringslogg {
    id: string;
    tittel: string;
    dato: string;
    ingress: string;
    beskrivelse: string;
    prioritet: boolean;
    type: OppdateringsloggType;
    src?: string;
}

const StyledModalWrapper = styled(ModalWrapper)`
    padding: 2rem;
    width: 80%;
    height: 50%;
`;

const StyledSidetittel = styled(Sidetittel)`
    margin-left: 1rem;
`;

function OppdateringsloggContainer({ setLest }: { setLest: (lest: boolean) => void }) {
    const [apen, settApen] = useState(false);
    const [lestOppdateringslogg, setLestOppdateringslogg] = usePersistentState('lest-oppdateringslogg', false);
    let [datoApnetOppdateringslogg, setDatoApnetOppdateringslogg] = usePersistentState(
        'dato-apnet-oppdateringslogg',
        ''
    );
    const oppdateringslogg = useOppdateringslogg();
    const oppdateringsloggDato = oppdateringslogg.map(enOppdateringslogg =>
        formatterDatoTidMedMaanedsnavn(enOppdateringslogg.dato)
    );

    const handleForApen = useCallback(() => {
        for (var i = 0; i < oppdateringslogg.length; i++) {
            if (oppdateringsloggDato[i] <= datoApnetOppdateringslogg) {
                setLestOppdateringslogg(true);
            } else {
                setLestOppdateringslogg(false);
            }
        }
    }, [setLestOppdateringslogg, oppdateringsloggDato, datoApnetOppdateringslogg, oppdateringslogg]);

    const handleOnClose = () => {
        settApen(false);
        setLestOppdateringslogg(true);
        setDatoApnetOppdateringslogg(formatterDatoTidMedMaanedsnavn(new Date()));
    };

    const listener = useCallback(() => settApen(a => !a), [settApen]);
    useListener('#oppdateringslogg-button', 'click', listener, document.querySelector('dekorator'));

    useEffect(() => {
        handleForApen();
        setLest(lestOppdateringslogg);
    }, [lestOppdateringslogg, setLest, handleForApen]);

    return (
        <StyledModalWrapper contentLabel="Oppdateringslogg" isOpen={apen} onRequestClose={handleOnClose}>
            <StyledSidetittel>Oppdateringslogg</StyledSidetittel>
            <Oppdateringslogg />
        </StyledModalWrapper>
    );
}

export default OppdateringsloggContainer;
