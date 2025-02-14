import { Hovedknapp } from 'nav-frontend-knapper';
import ModalWrapper from 'nav-frontend-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { createRef, useState } from 'react';
import { formatterDatoMedMaanedsnavn } from 'src/utils/date-utils';
import styled from 'styled-components';
import journalsakResource from '../../../../rest/resources/journalsakResource';
import theme from '../../../../styles/personOversiktTheme';
import type { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import VelgSak from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/VelgSak';

interface Props {
    valgtSak?: JournalforingsSak;
    setValgtSak: (sak: JournalforingsSak) => void;
    visFeilmelding?: boolean;
}

function getTittel(sak: JournalforingsSak) {
    return [sak.opprettetDato && formatterDatoMedMaanedsnavn(sak.opprettetDato), sak.temaNavn, sak.saksIdVisning]
        .map((element) => (element ? element : '-'))
        .join(' | ');
}

const StyledModalWrapper = styled(ModalWrapper)`
    &.modal {
        background-color: ${theme.color.navLysGra};
    }
`;

const Style = styled.section`
    display: flex;
    height: 100%;
    width: 40rem;
    min-height: 20rem;
    max-height: 40rem;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    overflow-y: scroll;
    margin: 1rem;
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
    journalsakResource.usePrefetch();
    const [apen, settApen] = useState(false);

    const handleVelgSak = (sak: JournalforingsSak) => {
        settApen(false);
        props.setValgtSak(sak);
        if (knappRef.current) knappRef.current.focus();
    };

    const tittelDialogpanel = props.valgtSak ? getTittel(props.valgtSak) : 'Ingen valgt sak';
    const handleOnClose = () => {
        settApen(false);
    };
    return (
        <>
            <StyledDiv>
                <Hovedknapp mini htmlType="button" onClick={() => settApen(true)}>
                    Velg sak
                </Hovedknapp>
                <Normaltekst>{tittelDialogpanel}</Normaltekst>
            </StyledDiv>
            <StyledModalWrapper contentLabel="Velg sak" onRequestClose={handleOnClose} isOpen={apen}>
                <Systemtittel>Velg sak</Systemtittel>
                <Style>
                    <VelgSak velgSak={handleVelgSak} valgtSak={props.valgtSak} />
                </Style>
                <Hovedknapp onClick={() => settApen(false)}>Lukk</Hovedknapp>
            </StyledModalWrapper>
        </>
    );
}

export default DialogpanelVelgSak;
