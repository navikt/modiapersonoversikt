import { Traad } from '../../../../../../models/meldinger/meldinger';
import { default as React, useState } from 'react';
import useTildelteOppgaver from '../../../../../../utils/hooks/useTildelteOppgaver';
import { harDelsvar, nyesteMelding } from '../../utils/meldingerUtils';
import { datoSynkende } from '../../../../../../utils/dateUtils';
import KnappBase from 'nav-frontend-knapper';
import BesvarFlere from './BesvarFlere';
import styled from 'styled-components/macro';
import ModalWrapper from 'nav-frontend-modal';
import theme from '../../../../../../styles/personOversiktTheme';
import ErrorBoundary from '../../../../../../components/ErrorBoundary';

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

    const tildelteOppgaverIdListe = tildelteOppgaver.paaBruker.map(oppgave => oppgave.traadId);

    const traaderSomKanSlaesSammen = traader
        .filter(traad => tildelteOppgaverIdListe.includes(traad.traadId))
        .filter(traad => !harDelsvar(traad))
        .sort(datoSynkende(traad => nyesteMelding(traad).opprettetDato));

    if (traaderSomKanSlaesSammen.length < 2) {
        return null;
    }

    return (
        <ErrorBoundary boundaryName="Slå sammen oppgaver">
            <KnappWrapperStyle>
                <h3 className="sr-only">Besvar flere oppgaver</h3>
                <KnappBase type={'hoved'} onClick={() => settApen(true)}>
                    Besvar flere
                </KnappBase>
                <StyledModalWrapper contentLabel={'Besvar flere'} onRequestClose={() => settApen(false)} isOpen={apen}>
                    <BesvarFlere traader={traaderSomKanSlaesSammen} lukkModal={() => settApen(false)} />
                </StyledModalWrapper>
            </KnappWrapperStyle>
        </ErrorBoundary>
    );
}

export default SlaaSammenOppgaverKnapp;
