import * as React from 'react';
import { useClickOutside, useRestResource } from '../../../utils/customHooks';
import styled from 'styled-components';
import { Knapp } from 'nav-frontend-knapper';
import { useDispatch } from 'react-redux';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { loggError } from '../../../utils/frontendLogger';
import { setValgtTraadDialogpanel } from '../../../redux/oppgave/actions';
import theme from '../../../styles/personOversiktTheme';
import { setValgtTraadMeldingspanel } from '../../../redux/meldinger/actions';
import { sisteSendteMelding } from '../infotabs/meldinger/utils/meldingerUtils';
import { meldingstypeTekst, temagruppeTekst } from '../infotabs/meldinger/utils/meldingstekster';
import { hasData, isNotStarted } from '../../../rest/utils/restResource';
import LazySpinner from '../../../components/LazySpinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { LenkeKnapp } from '../../../components/common-styled-components';
import { createRef, useState } from 'react';
import useTildelteOppgaver from '../../../utils/hooks/useTildelteOppgaver';

const Wrapper = styled.div`
    position: relative;
`;

const OppgaveListe = styled.ul`
    text-align: left;
    position: absolute;
    right: 0;
    z-index: 1000;
    filter: drop-shadow(0 1rem 2rem rgba(0, 0, 0, 0.7));
    li {
        display: flex;
        padding: 0.5rem 1rem;
        align-items: center;
        > *:first-child {
            flex-grow: 1;
            margin-right: 1rem;
        }
        &:not(:last-child) {
            border-bottom: ${theme.border.skilleSvak};
        }
    }
    ${theme.hvittPanel}
`;

const JustifyRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

function TildelteOppgaver() {
    const ref = createRef<HTMLDivElement>();
    const [visOppgaver, setVisOppgaver] = useState(false);
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const dispatch = useDispatch();
    useClickOutside(ref, () => setVisOppgaver(false));
    const tildelteOppgaver = useTildelteOppgaver();

    if (isNotStarted(traaderResource)) {
        dispatch(traaderResource.actions.fetch);
    }

    const oppgaverPåBrukerDropDown = !hasData(traaderResource) ? (
        <LazySpinner />
    ) : (
        tildelteOppgaver.paaBruker.map(oppgave => {
            const traad = traaderResource.data.find(traad => traad.traadId === oppgave.henvendelseid);
            if (!traad) {
                const error = new Error(`Kunne ikke finne tråd tilknyttet oppgave: ${oppgave.oppgaveid}`);
                loggError(error);
                return <AlertStripeFeil>{error.message}</AlertStripeFeil>;
            }
            const handleClick = () => {
                dispatch(setValgtTraadMeldingspanel(traad));
                dispatch(setValgtTraadDialogpanel(traad));
                setVisOppgaver(false);
            };
            const nyesteMelding = sisteSendteMelding(traad);
            const tittel = `${meldingstypeTekst(nyesteMelding.meldingstype)} - ${temagruppeTekst(
                nyesteMelding.temagruppe
            )}`;
            return (
                <li key={oppgave.oppgaveid}>
                    <div>
                        <Normaltekst>{tittel}</Normaltekst>
                        <Normaltekst>OppgaveID: {oppgave.oppgaveid}</Normaltekst>
                    </div>
                    <Knapp onClick={handleClick}>Vis</Knapp>
                </li>
            );
        })
    );

    return (
        <Wrapper ref={ref}>
            <JustifyRight>
                {tildelteOppgaver.alle.length !== 0 && (
                    <Normaltekst>Du har {tildelteOppgaver.alle.length} tildelte oppgaver</Normaltekst>
                )}
                {tildelteOppgaver.paaBruker.length !== 0 && (
                    <LenkeKnapp onClick={() => setVisOppgaver(!visOppgaver)}>
                        <Normaltekst>
                            Du har {tildelteOppgaver.paaBruker.length} tildelte oppgaver på bruker
                        </Normaltekst>
                    </LenkeKnapp>
                )}
            </JustifyRight>
            {visOppgaver && <OppgaveListe>{oppgaverPåBrukerDropDown}</OppgaveListe>}
        </Wrapper>
    );
}

export default TildelteOppgaver;
