import * as React from 'react';
import { createRef, useState } from 'react';
import { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import VelgSak from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';
import { formatterDatoMedMaanedsnavn } from '../../../../utils/date-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import { useFodselsnummer, useOnMount } from '../../../../utils/customHooks';
import * as JournalforingUtils from '../../journalforings-use-fetch-utils';
import ModalWrapper from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';

interface Props {
    valgtSak?: JournalforingsSak;
    setValgtSak: (sak: JournalforingsSak) => void;
    visFeilmelding: boolean;
}

const Dropdown = styled.div`
    padding: ${theme.margin.layout};
    position: absolute;
    z-index: 1000;
    background-color: white;
    border: ${theme.border.skille};
    border-radius: ${theme.borderRadius.layout};
    width: 100%;
    max-height: 50vh;
    overflow: auto;
`;

function getTittel(sak: JournalforingsSak) {
    return [sak.opprettetDato && formatterDatoMedMaanedsnavn(sak.opprettetDato), sak.temaNavn, sak.saksIdVisning]
        .map(element => (element ? element : '-'))
        .join(' | ');
}

function usePreFetchJournalforingsSaker() {
    const fnr = useFodselsnummer();
    useOnMount(() => {
        JournalforingUtils.prefetchSaker(fnr);
    });
}

const StyledModalWrapper = styled(ModalWrapper)`
    &.modal {
        background-color: ${theme.color.navLysGra};
    }
`;

const StyledArticle = styled.article`
    padding: ${theme.margin.layout};
    min-width: 30rem;
    min-height: 40rem;
`;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    > *:not(:last-child) {
        margin-right: 1rem;
    }
`;
function DialogpanelVelgSak(props: Props) {
    const knappRef = createRef<HTMLButtonElement>();
    usePreFetchJournalforingsSaker();

    const handleVelgSak = (sak: JournalforingsSak) => {
        props.setValgtSak(sak);
        knappRef.current && knappRef.current.focus();
    };

    const tittelDialogpanel = props.valgtSak ? getTittel(props.valgtSak) : 'Ingen valgt sak';
    const [apen, settApen] = useState(false);
    const handleOnClose = () => {
        settApen(false);
    };
    return (
        <>
            <StyledDiv>
                <Hovedknapp onClick={() => settApen(true)}>Velg sak</Hovedknapp>
                <Normaltekst>{tittelDialogpanel}</Normaltekst>
            </StyledDiv>
            <StyledModalWrapper contentLabel="Velg sak" onRequestClose={handleOnClose} isOpen={apen}>
                <StyledArticle>
                    <Dropdown>
                        <VelgSak velgSak={handleVelgSak} valgtSak={props.valgtSak} />
                    </Dropdown>
                </StyledArticle>
            </StyledModalWrapper>
        </>
    );
}

export default DialogpanelVelgSak;
