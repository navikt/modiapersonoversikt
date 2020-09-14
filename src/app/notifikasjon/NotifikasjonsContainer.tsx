import React, { useCallback, useEffect, useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import useListener from '../../utils/hooks/use-listener';
import Notifikasjoner from './Notifikasjoner';
import { Sidetittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { NotifikasjonsType } from './EnkeltNotifikasjon';
import usePersistentState from './usePersistentState';
import { formatterDatoTidMedMaanedsnavn } from '../../utils/date-utils';
import useNotifikasjoner from './useNotifikasjoner';

export interface Notifikasjon {
    id: string;
    tittel: string;
    dato: string;
    ingress: string;
    beskrivelse: string;
    prioritet: boolean;
    type: NotifikasjonsType;
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

function NotifikasjonsContainer({ setLest }: { setLest: (lest: boolean) => void }) {
    const [apen, settApen] = useState(false);
    const [lestNotifikasjoner, setLestNotifikasjoner] = usePersistentState('lest-notifikasjoner', false);
    let [datoApnetNotifikasjoner, setDatoApnetNotifikasjoner] = usePersistentState('dato-apnet-notifikasjoenr', '');
    const notifikasjoner = useNotifikasjoner();
    const notifikasjonDato = notifikasjoner.map(notifikasjon => formatterDatoTidMedMaanedsnavn(notifikasjon.dato));

    const handleForApen = useCallback(() => {
        for (var i = 0; i < notifikasjoner.length; i++) {
            if (notifikasjonDato[i] <= datoApnetNotifikasjoner) {
                setLestNotifikasjoner(true);
            } else {
                setLestNotifikasjoner(false);
            }
        }
    }, [setLestNotifikasjoner, notifikasjonDato, datoApnetNotifikasjoner, notifikasjoner]);

    const handleOnClose = () => {
        settApen(false);
        setLestNotifikasjoner(true);
        setDatoApnetNotifikasjoner(formatterDatoTidMedMaanedsnavn(new Date()));
    };

    const listener = useCallback(() => settApen(a => !a), [settApen]);
    useListener('#notifikasjon-button', 'click', listener, document.querySelector('dekorator'));

    useEffect(() => {
        handleForApen();
        setLest(lestNotifikasjoner);
    }, [lestNotifikasjoner, setLest, handleForApen]);

    return (
        <StyledModalWrapper contentLabel="Notifikasjon" isOpen={apen} onRequestClose={handleOnClose}>
            <StyledSidetittel>Notifikasjon</StyledSidetittel>
            <Notifikasjoner />
        </StyledModalWrapper>
    );
}

export default NotifikasjonsContainer;
