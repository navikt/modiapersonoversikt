import { Traad } from '../../../../../../models/meldinger/meldinger';
import { default as React, useState } from 'react';
import useTildelteOppgaver from '../../../../../../utils/hooks/useTildelteOppgaver';
import { harDelsvar, sisteSendteMelding } from '../../utils/meldingerUtils';
import { datoSynkende } from '../../../../../../utils/dateUtils';
import KnappBase from 'nav-frontend-knapper';
import BesvarFlere from './BesvarFlere';
import styled from 'styled-components';
import ModalWrapper from 'nav-frontend-modal';
import theme from '../../../../../../styles/personOversiktTheme';

const StyledModalWrapper = styled(ModalWrapper)`
    &.modal {
        padding: 0;
    }
`;

const KnappWrapperStyle = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: ${theme.margin.layout} ${theme.margin.layout} 0;
`;

function SlaaSammenOppgaverKnapp({ traader }: { traader: Traad[] }) {
    const [apen, settApen] = useState(false);
    const tildelteOppgaver = useTildelteOppgaver();

    const tildelteOppgaverIdListe = tildelteOppgaver.paaBruker.map(oppgave => oppgave.henvendelseid);

    const traaderSomKanSlaesSammen = traader
        .filter(traad => tildelteOppgaverIdListe.includes(traad.traadId))
        .filter(traad => !harDelsvar(traad))
        .sort(datoSynkende(traad => sisteSendteMelding(traad).opprettetDato));

    if (traaderSomKanSlaesSammen.length > 1) {
        return (
            <KnappWrapperStyle>
                <KnappBase type={'hoved'} onClick={() => settApen(true)}>
                    Besvar flere
                </KnappBase>
                <StyledModalWrapper contentLabel={'Besvar flere'} onRequestClose={() => settApen(false)} isOpen={apen}>
                    <BesvarFlere traader={traaderSomKanSlaesSammen} lukkModal={() => settApen(false)} />
                </StyledModalWrapper>
            </KnappWrapperStyle>
        );
    }
    return null;
}

export default SlaaSammenOppgaverKnapp;
